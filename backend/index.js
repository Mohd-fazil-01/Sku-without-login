import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import productRoutes from "./routes/productRoutes.js";
import dotenv from "dotenv";
import userRoutes from "./routes/userRoute.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 7000;

const MONGO_URL =
  process.env.MONGO_URI || "mongodb://127.0.0.1:27017/lostfound";

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);

app.get("/", (req, res) => res.send("Server running successfully"));

// DB connect
const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URL);
    console.log("MongoDB Connected Successfully");
  } catch (error) {
    console.error("❌ Database Connection Error:", error.message);
  }
};

app.listen(PORT, () => {
  connectDB();
  console.log(`🚀 Server started on port ${PORT}`);
});
