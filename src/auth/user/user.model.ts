import mongoose, { Schema } from "mongoose";
import { User } from "./user.types";

const userSchema = new Schema<User>({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  lastname: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
  },
  avatar: {
    type: String,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  bio: {
    type: String,
    default: "",
  },

  createdAt: {
    type: Date,
    default: new Date(),
  },
  email: {
    type: String,
    unique: true,
  },
});

const User = mongoose.model("User", userSchema);

export { User };
