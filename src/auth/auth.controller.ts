import bcrypt from "bcrypt";
import jwt, { JwtPayload } from "jsonwebtoken";
import { Request, Response } from "express";
import { successResetPasswordMail } from "email/Auth/resetPassword/email/resetPasswordSuccess.email.js";
import { forgotPasswordToken } from "email/Auth/resetPassword/email/forgotPassword.email.js";
import { User } from "models";

const forgotPassword = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(401).json({ success: false, message: "No email provided" });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res
        .status(401)
        .json({ success: false, message: "We cannot find the user in the database" });
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
    return res.status(500).json({ message: "An error occurred!", success: false });
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
      return res
        .status(401)
        .json({ message: "You new password cannot be the same as old one", success: true });
    }

    if (!user) {
      return res.status(401).json({ message: "Invalid token", success: false });
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
      return res
        .status(401)
        .json({ success: false, message: "We cannot find user with such username" });
    }

    const checkPasswordMatch = await bcrypt.compare(password, user.password);

    if (!checkPasswordMatch) {
      return res.status(401).json({ message: "Invalid username or password!", success: false });
    }
    const loginToken = jwt.sign({ userId: user._id }, process.env.ACCESS_TOKEN, {
      expiresIn: "2h",
    });

    return res.status(200).json({ token: loginToken, user: user });
  } catch (error) {
    return res.status(500).json({ message: "An error occurred!", success: false });
  }
};

const register = async (req: Request, res: Response) => {
  const { username, lastname, password, email } = req.body;

  const checkIfUserExist = await User.findOne({ email });

  if (checkIfUserExist?.email === email) {
    return res
      .status(401)
      .json({ message: "User with this email already exists!", success: false });
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
    token: registerJwt,
  });
};
export { register, login, resetPassword, forgotPassword };
