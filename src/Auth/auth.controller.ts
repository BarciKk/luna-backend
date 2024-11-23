import { PrismaClient, User } from "@prisma/client";
import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { getUserByEmail } from "User/user.controller";
import jwt, { JwtPayload } from "jsonwebtoken";
import { forgotPasswordToken } from "Email/ForgotPassword/forgotPassword.mail";

const prisma = new PrismaClient();

const login = async (req: Request, res: Response) => {
  try {
    const { email, password }: Pick<User, "email" | "password"> = req.body;

    const user = await getUserByEmail(email);
    if (!user) {
      return res.status(401).json({
        message: "We cannot find the user in the database",
        success: false,
      });
    }
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({
        message: "Password is incorrect!",
        success: false,
      });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET as string,
      {
        expiresIn: "15m",
      }
    );
    return res.status(200).json({ jwt: token, user });
  } catch (error) {
    return res.status(500).json({
      message: `An error occurred during the login process! ${error}`,
      success: false,
    });
  }
};

const register = async (req: Request, res: Response) => {
  try {
    const {
      username,
      lastname,
      password,
      email,
    }: Pick<User, "username" | "email" | "password" | "lastname"> = req.body;

    const user = await getUserByEmail(email);

    if (user) {
      return res.status(400).json({
        message: "User already exists!",
        success: false,
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const createdUser = await prisma.user.create({
      data: {
        username,
        lastname,
        email,
        password: hashedPassword,
      },
    });

    const token = jwt.sign(
      { id: createdUser.id, email },
      process.env.JWT_SECRET as string,
      {
        expiresIn: "15m",
      }
    );

    return res.status(201).json({
      message: "User registered successfully!",
      success: true,
      token,
    });
  } catch (error) {
    return res.status(500).json({
      message: `An error occurred during registration! ${error}`,
      success: false,
    });
  }
};

const forgotPassword = async (req: Request, res: Response) => {
  try {
    const { email }: Pick<User, "email"> = req.body;

    if (!email) {
      res
        .status(401)
        .json({ message: "U didnt provide any email!", success: false });
    }
    const user = await getUserByEmail(email);

    if (!user) {
      return res.status(400).json({
        message: "We couldnt find the user",
        success: false,
      });
    }

    const resetPasswordToken = jwt.sign(
      { id: user?.id },
      process.env.JWT_SECRET as string,
      { expiresIn: "10m" }
    );
    await prisma.user.update({
      where: { id: user.id },
      data: {
        tokens: { push: resetPasswordToken },
      },
    });

    forgotPasswordToken(user.username, user.email, resetPasswordToken);
    return res.status(200).json({
      message: "Reset password request send successfully",
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: `An error occurred during reseting password process! ${error}`,
      success: false,
    });
  }
};

const resetPassword = async (req: Request, res: Response) => {
  try {
    const { token, password }: { token: string; password: string } = req.body;

    const decodedJwt = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    ) as JwtPayload;

    const user = await prisma.user.findUnique({ where: { id: decodedJwt.id } });

    if (!user) {
      return res
        .status(401)
        .json({ message: "We cannot find the user", success: false });
    }

    const isSamePassword = await bcrypt.compare(password, user.password);
    const tokenExists = user.tokens.includes(token);

    if (!tokenExists) {
      return res.status(401).json({
        message: "Session is expired please try again!",
        success: false,
      });
    }

    if (isSamePassword) {
      return res.status(400).json({
        message: "New password cannot be the same as the old one",
        success: false,
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await prisma.user.update({
      where: { id: user.id },
      data: { password: hashedPassword, tokens: [] },
    });

    return res
      .status(200)
      .json({ message: "Password reset successfully", success: true });
  } catch (error) {
    return res.status(500).json({
      message: `An error occurred during reseting password process! ${error}`,
      success: false,
    });
  }
};

export { register, login, forgotPassword, resetPassword };
