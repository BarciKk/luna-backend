import { createCategory, deleteCategory } from "Category/category.controller";
import { Router } from "express";

const categoriesRoutes = Router();

categoriesRoutes.post("/create", createCategory);
categoriesRoutes.delete("/delete", deleteCategory);

export { categoriesRoutes };
