import mongoose from "mongoose";

const connection = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Database connected");
  } catch (error) {
    console.error("Database connection error:", error);
  }
};

export { connection };
