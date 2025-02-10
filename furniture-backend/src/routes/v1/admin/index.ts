import express from "express";

import { getAllUsers } from "../../../controllers/admin/userController";
import { setMaintenance } from "../../../controllers/admin/systemController";
import upload from "../../../middlewares/uploadFile";
import {
  createPost,
  updatePost,
  deletePost,
} from "../../../controllers/admin/postController";
import { createProduct } from "../../../controllers/admin/productController";

const router = express.Router();

router.get("/users", getAllUsers);
router.post("/maintenance", setMaintenance);

// CRUD for Posts
router.post("/posts", upload.single("image"), createPost);
router.patch("/posts", upload.single("image"), updatePost);
router.delete("/posts", deletePost);

// CRUD for Products
router.post("/products", upload.array("images", 4), createProduct);
// router.patch("/products", upload.array("images", 4), updateProduct);
// router.delete("/products", deleteProduct);

export default router;
