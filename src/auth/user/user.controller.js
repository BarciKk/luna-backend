import { User } from "./user.model.js";
import bcrypt from "bcrypt";
import { OTP } from "../OTP/otp.model.js";
import jwt from "jsonwebtoken";
import { expiresAt } from "../OTP/otp.constants.js";
import { generateSecurePIN } from "./user.helpers.js";
import { loginValidation, registerValidation } from "./user.validation.js";
import { resetPasswordToken } from "../../email/ResetPassword/resetPassword.mail.js";

const resetPasswordPin = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    const generatedPIN = generateSecurePIN();
    if (!user) {
      return res
        .status(401)
        .json({ error: "We cannot find the user in the database" });
    }
    req.session.email = user.email;
    req.session.generatedPIN = generatedPIN.toString();

    await OTP.create({
      email: user.email,
      otp: generatedPIN.toString(),
      expiresAt,
    });
    await resetPasswordToken(generatedPIN, user.email, user.username);

    return res
      .status(200)
      .json({ message: "Password reset PIN sent successfully." });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error!" });
  }
};
const updateUserPassword = async (req, res) => {
  try {
    const { newPassword, repeatNewPassword } = req.body;
    const storedEmail = req.session.email;

    if (!storedEmail) {
      return res.status(401).json({ message: "User not found in the session" });
    }

    const user = await User.findOne({ email: storedEmail });

    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    const comparePasswords = newPassword === repeatNewPassword;

    if (!comparePasswords) {
      return res.status(401).json({ message: "Passwords do not match" });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();

    delete req.session.email;
    return res.status(200).json({ message: "Password updated successfully!" });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ error: "Internal server error during password update" });
  }
};

const verifyOTPCode = async (req, res) => {
  try {
    const { otp } = req.body;
    const storedOTP = req.session.generatedPIN;

    if (!storedOTP) {
      return res.status(401).json({ message: "You shouldn't be here" });
    }

    if (storedOTP && storedOTP === otp) {
      delete req.session.generatedPIN;
      return res.status(200).json({ message: "Valid otp" });
    } else {
      return res
        .status(401)
        .json({ message: "Invalid OTP. Please enter a valid code." });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "internal server error" });
  }
};

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

export {
  userLogin,
  userRegister,
  resetPasswordPin,
  verifyOTPCode,
  updateUserPassword,
};
