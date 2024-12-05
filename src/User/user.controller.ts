import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

const getUserByEmail = async (email: string) => {
  try {
    const user = await prisma.user.findUnique({ where: { email: email } });
    return user;
  } catch (error) {
    console.error("Error fetching user:", error);
    throw new Error("Unable to find the  user in the db");
  }
};
const getUser = async (userId: string) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: Number(userId) },
      include: { categories: true },
    });
    return user;
  } catch (error) {
    console.error("Error fetching user:", error);
    throw new Error("Unable to find the  user in the db");
  }
};

const getCurrentUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const user = await prisma.user.findUnique({
      where: { id: Number(userId) },
      include: { categories: true },
    });

    if (!user) {
      return res.status(401).json({
        message: "We cannot find the user in the database",
        success: false,
      });
    }
    return res.status(200).json({ user });
  } catch {
    return res.status(500).json({
      message: `Something went wrong`,
      success: false,
    });
  }
};
export { getUserByEmail, getCurrentUser, getUser };
