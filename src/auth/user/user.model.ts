import mongoose, { Schema } from "mongoose";
import { User } from "../../types/user/index";


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
