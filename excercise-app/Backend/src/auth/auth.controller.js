import { User } from "./user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const authLogin = async (req, res) => {
  try {
    const { username, password } = req.body;
    console.log("Request received with username:", username);

    const user = await User.findOne({ username });

    console.log("User found in the database:", user);
    if (!user) {
      console.log("User not found in the database");
      res.status(401).json({ error: "Invalid username or password!" });
    }

    const checkPasswordMatch = await bcrypt.compare(password, user.password);
    if (!checkPasswordMatch) {
      console.log("Passwords didn't match");
      res.status(401).json({ error: "Invalid username or password!" });
    }
    console.log("Successful login for username:", username);
    const accessToken = jwt.sign(
      { username: user.username },
      process.env.ACCESS_TOKEN
    );

    return res.json({ accessToken: accessToken });
  } catch {
    return res.status(500).json({ error: "user not found!!" });
  }
};

export { authLogin };
