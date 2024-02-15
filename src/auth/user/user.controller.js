import { User } from "./user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { loginValidation, registerValidation } from "./user.validation.js";

const userLogin = async (req, res) => {
  try {
    const { error } = loginValidation(req.body);

    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const { username, password } = req.body;

    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ error: "Invalid username or password!" });
    }
    const checkPasswordMatch = await bcrypt.compare(password, user.password);

    if (!checkPasswordMatch) {
      return res.status(401).json({ error: "Invalid username or password!" });
    }
    const accessToken = jwt.sign(
      { username: user.username },
      process.env.ACCESS_TOKEN,
      {
        expiresIn: "2h",
      }
    );
    //supertest

    return res.json({ accessToken: accessToken, user: user });
  } catch {
    return res.status(500).json({ error: "user not found!!" });
  }
};

const userRegister = async (req, res) => {
  const { error } = registerValidation(req.body);

  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  const { username, password, email, repeatPassword } = req.body;

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
    password: hashedPassword,
    email,
  });
  const registerToken = jwt.sign(
    {
      _id: user._id,
      email,
    },
    process.env.ACCESS_TOKEN,
    {
      expiresIn: "2h",
    }
  );

  return res.status(201).json({ registerToken: registerToken });
};

export { userLogin, userRegister };
