import {
  createCategory,
  deleteCategory,
  getAllCategories,
  getCategory,
} from "Category/category.controller";
import { Router } from "express";

const categoriesRoutes = Router();

categoriesRoutes.post("/", getAllCategories);
categoriesRoutes.get("/:categoryId", getCategory);
categoriesRoutes.post("/create", createCategory);
categoriesRoutes.delete("/delete", deleteCategory);

export { categoriesRoutes };
