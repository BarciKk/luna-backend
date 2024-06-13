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
    default:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ_ywnvKwB32lJoD9rnf9M-YqSI0FvEYiJx8g&s",
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
