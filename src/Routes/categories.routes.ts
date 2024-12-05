import {
  createCategory,
  deleteCategory,
  editCategory,
  getAllCategories,
  getCategory,
} from "Category/category.controller";
import { Router } from "express";
import { verifyToken } from "Middleware/verifyToken";

const categoriesRoutes = Router();

categoriesRoutes.post("/create", verifyToken, createCategory);
categoriesRoutes.post("/", verifyToken, getAllCategories);
categoriesRoutes.get("/:categoryId", verifyToken, getCategory);
categoriesRoutes.delete("/delete", verifyToken, deleteCategory);
categoriesRoutes.patch("/edit", verifyToken, editCategory);

export { categoriesRoutes };
