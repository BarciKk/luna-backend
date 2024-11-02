import { createCategory } from "Category/category.controller";
import { Router } from "express";

const categoriesRoutes = Router();

categoriesRoutes.post("/", createCategory);

export { categoriesRoutes };
