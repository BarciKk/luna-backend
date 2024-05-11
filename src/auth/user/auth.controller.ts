import { User } from "./user.model.js";
import bcrypt from "bcrypt";
import jwt, { JwtPayload } from "jsonwebtoken";
import { Request, Response } from "express";
import { forgotPasswordToken } from "../../email/Auth/resetPassword/email/forgotPassword.email.js";
import { successResetPasswordMail } from "../../email/Auth/resetPassword/email/resetPasswordSuccess.email.js";


const forgotPassword = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ error: "We cannot find the user in the database" });
    }
    const resetPasswordToken = jwt.sign({ userId: user._id }, process.env.ACCESS_TOKEN, {
      expiresIn: "1h",
    });

    forgotPasswordToken(user.username, user.email, resetPasswordToken);
    return res.status(200).json({
      message: "Reset password request send successfully",
      success: true,
    });
  } catch (error) {
    return res.status(500).json({ error: "An error occurred!", success: false });
  }
};

const resetPassword = async (req: Request, res: Response) => {
  try {
    const { token, password } = req.body;

    const decodedJwt = jwt.verify(token, process.env.ACCESS_TOKEN) as JwtPayload;

    const user = await User.findOne({ _id: decodedJwt.userId });
    if (!user) {
      return res.status(401).json({ message: "We cannot find the user" });
    }

    if (await bcrypt.compare(password, user.password)) {
      return res.status(401).json({ message: "You new password cannot be the same as old one" });
    }

    if (!user) {
      return res.status(401).json({ error: "Invalid token" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    user.password = hashedPassword;
    await user.save();

    await successResetPasswordMail(user.username, user.email);

    res.status(200).json({ message: "Password reset successfully", success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred", success: false });
  }
};

const login = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });

    if (!user) {
      return res.status(401).json({ error: "Invalid username or password!" });
    }

    const checkPasswordMatch = await bcrypt.compare(password, user.password);

    if (!checkPasswordMatch) {
      return res.status(401).json({ error: "Invalid username or password!" });
    }
    const loginJwt = jwt.sign({ userId: user._id }, process.env.ACCESS_TOKEN, {
      expiresIn: "2h",
    });

    return res.status(200).json({ jwt: loginJwt, user: user });
  } catch (error) {
    return res.status(500).json({ error: "An error occurred!" });
  }
};

const register = async (req: Request, res: Response) => {
  const { username, lastname, password, email, repeatPassword } = req.body;

  const checkIfUserExist = await User.findOne({
    $or: [{ email }, { username }],
  });

 
  if (checkIfUserExist) {
    if (checkIfUserExist.email === email) {
      return res.status(401).json({ error: "User with this email already exists!" });
    } else {
      return res.status(401).json({ error: "User with this username already exists!" });
    }
  }
  if (password !== repeatPassword) {
    return res.status(401).json({ error: "Passwords do not match" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    username,
    lastname,
    password: hashedPassword,
    email,
    createdAt: new Date().toDateString(),
  });
  const registerJwt = jwt.sign(
    {
      _id: user._id,
      email,
    },
    process.env.ACCESS_TOKEN,
    {
      expiresIn: "2h",
    }
  );

  return res.status(200).json({
    registerToken: registerJwt,
  });
};

export { register, login, resetPassword, forgotPassword };
