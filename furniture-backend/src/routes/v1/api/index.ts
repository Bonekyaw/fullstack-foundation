import express from "express";
import {
  changeLanguage,
  testPermission,
  uploadProfile,
  getMyPhoto,
  uploadProfileMultiple,
  uploadProfileOptimize,
} from "../../../controllers/api/profileController";
import { auth } from "../../../middlewares/auth";
import upload, { uploadMemory } from "../../../middlewares/uploadFile";
import {
  getPostsByPagination,
  getInfinitePostsByPagination,
  getPost,
} from "../../../controllers/api/postController";
import {
  getProduct,
  getProductsByPagination,
  getCategoryType,
} from "../../../controllers/api/productController";

const router = express.Router();

router.post("/change-language", changeLanguage);
router.get("/test-permission", auth, testPermission);

router.patch("/profile/upload", auth, upload.single("avatar"), uploadProfile);
router.patch(
  "/profile/upload/optimize",
  auth,
  upload.single("avatar"),
  uploadProfileOptimize
);
router.patch(
  "/profile/upload/multiple",
  auth,
  upload.array("avatar"),
  uploadProfileMultiple
);

router.get("/profile/my-photo", getMyPhoto); // Just for testing

router.get("/posts", auth, getPostsByPagination); // Offset Pagination
router.get("/posts/infinite", auth, getInfinitePostsByPagination); // Cursor-based Pagination
router.get("/posts/:id", auth, getPost);

router.get("/products/:id", auth, getProduct);
router.get("/products", auth, getProductsByPagination); // Cursor-based Pagination

router.get("/filter-type", auth, getCategoryType);

export default router;
