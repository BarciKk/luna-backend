import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

export const getAllTasks = async (req: Request, res: Response) => {
  const { userId } = req.body;
  try {
    if (!userId) {
      res
        .status(400)
        .json({ message: "WE could not find any userId", success: false });
      return;
    }

    const tasks = await prisma.task.findMany({
      where: {
        userId: userId,
      },
    });
    if (!tasks) {
      res.status(400).json({ message: "Tasks not found!", success: false });
    }

    res.status(200).json(tasks);
  } catch (err) {
    return res.status(500).json({
      message: `An error occurred during process! ${err}`,
      success: false,
    });
  }
};

export const getTasksViaDate = async (req: Request, res: Response) => {
  const { userId, date } = req.body;
  try {
    if (!userId) {
      res.status(400).json({ message: "Provide correct user id" });
      return;
    }

    const taskDate = new Date(date);

    const tasks = await prisma.task.findMany({
      where: {
        userId: userId,
        date: {
          gte: new Date(taskDate.setHours(0, 0, 0, 0)),
          lte: new Date(taskDate.setHours(23, 59, 59, 999)),
        },
      },
    });

    res.status(200).json(tasks);
  } catch (err) {
    return res.status(500).json({
      message: `An error occurred during process! ${err}`,
      success: false,
    });
  }
};

export const createTask = async (req: Request, res: Response) => {
  try {
    const {
      name,
      date,
      priority,
      description,
      userId,
      iconName,
      recurringTask,
    } = req.body;

    if (!name || !date || !userId) {
      return res.status(400).json({
        message: "Name, date, and userId are required.",
        success: false,
      });
    }

    await prisma.task.create({
      data: {
        name,
        iconName: iconName,
        date: date,
        priority: priority || 1,
        description: description || "",
        userId,
        status: "PENDING",
        recurringTask: recurringTask,
      },
    });

    return res.status(201).json({
      message: "Task created successfully!",
      success: true,
    });
  } catch (err) {
    return res.status(500).json({
      message: `An error occurred creating task! ${err}`,
      success: false,
    });
  }
};
