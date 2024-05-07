import { User } from "./user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Request, Response } from "express";

const userLogin = async (req: Request, res: Response) => {
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

const userRegister = async (req: Request, res: Response) => {
  const { username, lastname, password, email, repeatPassword } = req.body;

  const checkIfUserExist = await User.findOne({
    $or: [{ email }, { username }],
  });

  if (checkIfUserExist) {
    if (checkIfUserExist.email === email) {
      return res
        .status(401)
        .json({ error: "User with this email already exists!" });
    } else {
      return res
        .status(401)
        .json({ error: "User with this username already exists!" });
    }
  }
  if (password !== repeatPassword) {
    return res.status(400).json({ error: "Passwords do not match" });
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

export { userLogin, userRegister };
