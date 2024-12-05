import {
  createCategory,
  deleteCategory,
  editCategory,
  getAllCategories,
  getCategory,
} from "Category/category.controller";
import { Router } from "express";
import { validateData } from "Middleware/validateData";
import { verifyToken } from "Middleware/verifyToken";
import {
  categoryIdSchema,
  createCategorySchema,
} from "validation/categories.validation";

const categoriesRoutes = Router();

categoriesRoutes.post(
  "/create",
  verifyToken,
  validateData(createCategorySchema),
  createCategory
);

categoriesRoutes.post("/", verifyToken, getAllCategories);
categoriesRoutes.get(
  "/:categoryId",
  verifyToken,
  validateData(categoryIdSchema),
  getCategory
);
categoriesRoutes.delete(
  "/delete",
  verifyToken,
  validateData(categoryIdSchema),
  deleteCategory
);
categoriesRoutes.patch(
  "/edit",
  verifyToken,
  validateData(createCategorySchema),
  editCategory
);

export { categoriesRoutes };
