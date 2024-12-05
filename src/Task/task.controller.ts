import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

export const createTask = async (req: Request, res: Response) => {
  try {
    const { name, date, priority, description, userId } = req.body;

    if (!name || !date || !userId) {
      return res.status(400).json({
        message: "Name, date, and userId are required.",
        success: false,
      });
    }

    await prisma.task.create({
      data: {
        name,
        date: date,
        priority: priority || 1,
        description: description || "",
        userId,
        status: "PENDING",
        recurringTask: false,
      },
    });

    return res.status(201).json({
      message: "Task created successfully!",
      success: true,
    });
  } catch (err) {
    return res.status(500).json({
      message: `An error occurred during reseting password process! ${err}`,
      success: false,
    });
  }
};
