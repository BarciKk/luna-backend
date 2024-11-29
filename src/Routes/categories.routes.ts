import {
  createCategory,
  deleteCategory,
  editCategory,
  getAllCategories,
  getCategory,
} from "Category/category.controller";
import { Router } from "express";

const categoriesRoutes = Router();

categoriesRoutes.post("/create", createCategory);
categoriesRoutes.post("/", getAllCategories);
categoriesRoutes.get("/:categoryId", getCategory);
categoriesRoutes.delete("/delete", deleteCategory);
categoriesRoutes.patch("/edit", editCategory);

export { categoriesRoutes };
