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
  repeatPassword: {
    type: String,
  },
  email: {
    type: String,
    unique: true,
  },
});

const User = mongoose.model("User", userSchema);

export { User };
