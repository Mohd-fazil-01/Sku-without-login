import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },

    name: { type: String, required: true },

    email: { type: String, required: true, unique: true },

    number: { type: String, required: true },

    password: { type: String, required: true },

    userType: {
      type: String,
      enum: ["admin", "superuser", "user"],
      default: "user"
    }
  },
  { timestamps: true }
);

export default mongoose.model("User", UserSchema);
