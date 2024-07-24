import mongoose from "mongoose";

// const URI = "mongodb+srv://muzekhan:muzi123@cluster0.pdddnap.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
const connection = async () => {
  try {
    // await mongoose.connect(process.env.MONGO_URI);
    await mongoose.connect("mongodb://127.0.0.1:27017/ecommerce");
    console.log("Database connected");
  } catch (error) {
    console.error("Database connection error:", error);
  }
};

export { connection };
