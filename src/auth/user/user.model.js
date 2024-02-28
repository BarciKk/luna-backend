import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
  username: {
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
  repeatPassword: {
    type: String,
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
