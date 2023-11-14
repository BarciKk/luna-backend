import { User } from "./user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userLogin = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });
    if (!user) {
      res.status(401).json({ error: "Invalid username or password!" });
    }

    const checkPasswordMatch = bcrypt.compare(password, user.password);
    if (!checkPasswordMatch) {
      res.status(401).json({ error: "Invalid username or password!" });
    }
    const accessToken = jwt.sign(
      { username: user.username },
      process.env.ACCESS_TOKEN,
      {
        expiresIn: "2h",
      }
    );

    return res.json({ accessToken: accessToken });
  } catch {
    return res.status(500).json({ error: "user not found!!" });
  }
};

const userRegister = async (req, res) => {
  const { username, password, email } = req.body;

  if (!(username && password && email)) {
    res.status(400).json({ error: "Invalid username email or password!" });
  }

  const checkIfUserExist = await User.findOne({ email });

  if (checkIfUserExist) {
    res.status(401).json({ error: "User with this email already exists!" });
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

  res.status(201).json({ registerToken: registerToken });
};

export { userLogin, userRegister };
