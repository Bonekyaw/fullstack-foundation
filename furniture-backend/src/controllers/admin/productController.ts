import { Request, Response, NextFunction } from "express";
import { body, query, validationResult } from "express-validator";
import { unlink } from "node:fs/promises";
import path from "path";

import { errorCode } from "../../../config/errorCode";
import { checkModelIfExist, checkUploadFile } from "../../utils/check";
import { createError } from "../../utils/error";
import ImageQueue from "../../jobs/queues/imageQueue";
import {
  createOneProduct,
  getProductById,
  updateOneProduct,
  deleteOneProduct,
} from "../../services/productService";
import { cacheQueue } from "../../jobs/queues/cacheQueue";

interface CustomRequest extends Request {
  userId?: number;
  user?: any;
  files?: any;
}

const removeFiles = async (
  originalFiles: string[],
  optimizedFiles: string[] | null
) => {
  try {
    for (const originalFile of originalFiles) {
      const originalFilePath = path.join(
        __dirname,
        "../../..",
        "/uploads/images",
        originalFile
      );

      await unlink(originalFilePath);
    }

    if (optimizedFiles) {
      for (const optimizedFile of optimizedFiles) {
        const optimizedFilePath = path.join(
          __dirname,
          "../../..",
          "/uploads/optimize",
          optimizedFile
        );
        await unlink(optimizedFilePath);
      }
    }
  } catch (error) {
    console.log(error);
  }
};

export const createProduct = [
  body("name", "Name is required.").trim().notEmpty().escape(),
  body("description", "Description is required.").trim().notEmpty().escape(),
  body("price", "Price is required.")
    .isFloat({ min: 0.1 })
    .isDecimal({ decimal_digits: "1,2" }),
  body("discount", "Price is required.")
    .isFloat({ min: 0 })
    .isDecimal({ decimal_digits: "1,2" }),
  body("inventory", "Price is required.").isInt({ min: 1 }),
  body("category", "Category is required.").trim().notEmpty().escape(),
  body("type", "Type is required.").trim().notEmpty().escape(),
  body("tags", "Tag is invalid.")
    .optional({ nullable: true })
    .customSanitizer((value) => {
      if (value) {
        return value.split(",").filter((tag: string) => tag.trim() !== "");
      }
      return value;
    }),

  async (req: CustomRequest, res: Response, next: NextFunction) => {
    const errors = validationResult(req).array({ onlyFirstError: true });
    // If validation error occurs
    if (errors.length > 0) {
      if (req.files && req.files.length > 0) {
        const originalFiles = req.files.map((file: any) => file.filename);
        await removeFiles(originalFiles, null);
      }
      return next(createError(errors[0].msg, 400, errorCode.invalid));
    }

    const {
      name,
      description,
      price,
      discount,
      inventory,
      category,
      type,
      tags,
    } = req.body;

    checkUploadFile(req.files && req.files.length > 0);

    await Promise.all(
      req.files.map(async (file: any) => {
        const splitFileName = file.filename.split(".")[0];
        return ImageQueue.add(
          "optimize-image",
          {
            filePath: file.path,
            fileName: `${splitFileName}.webp`,
            width: 835,
            height: 577,
            quality: 100,
          },
          {
            attempts: 3,
            backoff: {
              type: "exponential",
              delay: 1000,
            },
          }
        );
      })
    );

    const originalFileNames = req.files.map((file: any) => ({
      path: file.filename,
    }));

    const data: any = {
      name,
      description,
      price,
      discount,
      inventory: +inventory,
      category,
      type,
      tags,
      images: originalFileNames,
    };

    const product = await createOneProduct(data);

    await cacheQueue.add(
      "invalidate-product-cache",
      {
        pattern: "products:*",
      },
      {
        jobId: `invalidate-${Date.now()}`,
        priority: 1,
      }
    );

    res.status(201).json({
      message: "Successfully created a new post.",
      postId: product.id,
    });
  },
];

export const updateProduct = [
  body("productId", "Product Id is required.").isInt({ min: 1 }),
  body("name", "Name is required.").trim().notEmpty().escape(),
  body("description", "Description is required.").trim().notEmpty().escape(),
  body("price", "Price is required.")
    .isFloat({ min: 0.1 })
    .isDecimal({ decimal_digits: "1,2" }),
  body("discount", "Price is required.")
    .isFloat({ min: 0 })
    .isDecimal({ decimal_digits: "1,2" }),
  body("inventory", "Price is required.").isInt({ min: 1 }),
  body("category", "Category is required.").trim().notEmpty().escape(),
  body("type", "Type is required.").trim().notEmpty().escape(),
  body("tags", "Tag is invalid.")
    .optional({ nullable: true })
    .customSanitizer((value) => {
      if (value) {
        return value.split(",").filter((tag: string) => tag.trim() !== "");
      }
      return value;
    }),

  async (req: CustomRequest, res: Response, next: NextFunction) => {
    const errors = validationResult(req).array({ onlyFirstError: true });
    // If validation error occurs
    if (errors.length > 0) {
      if (req.files && req.files.length > 0) {
        const originalFiles = req.files.map((file: any) => file.filename);
        await removeFiles(originalFiles, null);
      }
      return next(createError(errors[0].msg, 400, errorCode.invalid));
    }

    const {
      productId,
      name,
      description,
      price,
      discount,
      inventory,
      category,
      type,
      tags,
    } = req.body;

    const product = await getProductById(+productId);
    if (!product) {
      if (req.files && req.files.length > 0) {
        const originalFiles = req.files.map((file: any) => file.filename);
        await removeFiles(originalFiles, null);
      }

      return next(
        createError("This data model does not exist.", 409, errorCode.invalid)
      );
    }

    let originalFileNames = [];
    if (req.files && req.files.length > 0) {
      originalFileNames = req.files.map((file: any) => ({
        path: file.filename,
      }));
    }

    const data: any = {
      name,
      description,
      price,
      discount,
      inventory: +inventory,
      category,
      type,
      tags,
      images: originalFileNames,
    };

    if (req.files && req.files.length > 0) {
      await Promise.all(
        req.files.map(async (file: any) => {
          const splitFileName = file.filename.split(".")[0];
          return ImageQueue.add(
            "optimize-image",
            {
              filePath: file.path,
              fileName: `${splitFileName}.webp`,
              width: 835,
              height: 577,
              quality: 100,
            },
            {
              attempts: 3,
              backoff: {
                type: "exponential",
                delay: 1000,
              },
            }
          );
        })
      );
      // Deleting Old images
      const orgFiles = product.images.map((img) => img.path);
      const optFiles = product.images.map(
        (img) => img.path.split(".")[0] + ".webp"
      );
      await removeFiles(orgFiles, optFiles);
    }

    const productUpdated = await updateOneProduct(product.id, data);

    await cacheQueue.add(
      "invalidate-product-cache",
      {
        pattern: "products:*",
      },
      {
        jobId: `invalidate-${Date.now()}`,
        priority: 1,
      }
    );

    res.status(200).json({
      message: "Successfully updated the product",
      productId: productUpdated.id,
    });
  },
];

export const deleteProduct = [
  body("productId", "Product Id is required.").isInt({ min: 1 }),
  async (req: CustomRequest, res: Response, next: NextFunction) => {
    const errors = validationResult(req).array({ onlyFirstError: true });
    // If validation error occurs
    if (errors.length > 0) {
      return next(createError(errors[0].msg, 400, errorCode.invalid));
    }

    const { productId } = req.body;
    const product = await getProductById(+productId);
    checkModelIfExist(product);

    const productDeleted = await deleteOneProduct(product!.id);

    const orgFiles = product!.images.map((img) => img.path);
    const optFiles = product!.images.map(
      (img) => img.path.split(".")[0] + ".webp"
    );
    await removeFiles(orgFiles, optFiles);

    await cacheQueue.add(
      "invalidate-product-cache",
      {
        pattern: "products:*",
      },
      {
        jobId: `invalidate-${Date.now()}`,
        priority: 1,
      }
    );

    res.status(200).json({
      message: "Successfully deleted the product",
      productId: productDeleted.id,
    });
  },
];
