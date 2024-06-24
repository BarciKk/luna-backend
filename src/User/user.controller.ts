import { Request, Response } from "express";
import { User } from "models";

export const getCurrentUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    if (!userId) {
      return res.status(400).json({ message: "User id not provided", success: false });
    }

    const user = await User.findById(userId);

    if (!user) {
      return res.status(400).json({ message: "We cannot find user with such id", success: false });
    }
    return res.status(200).json({ user });
  } catch (error) {
    return res.status(500).json({ message: "An error occurred!", success: false });
  }
};
