import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

export const createCategory = async (req: Request, res: Response) => {
  const { name, icon, userId, color } = req.body;

  if (!name || !icon || !userId || !color) {
    return res.status(400).json({
      success: false,
      message: "All fields are required to create a category",
    });
  }

  try {
    const user = await prisma.user.findUnique({
      where: { id: Number(userId) },
      include: { categories: true },
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found in the database",
      });
    }

    if (user.categories.length >= 5) {
      return res.status(403).json({
        success: false,
        message: "Cannot add category; limit of 5 categories reached",
      });
    }

    await prisma.user.update({
      where: { id: Number(userId) },
      data: {
        categories: {
          create: {
            name,
            icon,
            color,
          },
        },
      },
      include: { categories: true },
    });

    res.status(201).json({
      success: true,
      message: "Category successfully created!",
    });
  } catch (error) {
    console.error("Error creating category:", error);
    res.status(500).json({
      success: false,
      message: "Failed to create category due to a server error",
    });
  }
};

export const deleteCategory = async (req: Request, res: Response) => {
  const { categoryId } = req.body;

  if (!categoryId) {
    return res.status(400).json({
      success: false,
      message: "Category ID required",
    });
  }
  try {
    const category = await prisma.category.findUnique({
      where: { id: categoryId },
    });

    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }
    await prisma.category.delete({
      where: { id: categoryId },
    });
    return res.status(200).json({
      success: true,
      message: "Category deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "An error occurred while deleting the category",
    });
  }
};