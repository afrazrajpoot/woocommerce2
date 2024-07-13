import mongoose from "mongoose";

const URI = "mongodb+srv://muzi:muzi123@cluster0.quilybs.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

const connection = async () => {
  try {
    await mongoose.connect(URI);
    console.log("Database connected");
  } catch (error) {
    console.error("Database connection error:", error);
  }
};

export { connection };
