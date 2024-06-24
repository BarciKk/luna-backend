import { DEFAULT_USER_IMAGE } from "User/user.constants";
import mongoose, { Schema } from "mongoose";
import { User } from "types/user";
const userSchema = new Schema<User>({
  username: {
    type: String,
  },
  lastname: {
    type: String,
    default: "",
  },
  password: {
    type: String,
  },
  avatar: {
    type: String,
    default: DEFAULT_USER_IMAGE,
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
  termsAndConditions: {
    type: Boolean,
    default: true,
  },
});

const User = mongoose.model("User", userSchema);

export { User };
