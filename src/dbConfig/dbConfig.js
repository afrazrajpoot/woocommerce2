import mongoose from "mongoose";

// const URI = "mongodb+srv://muzi:muzi123@cluster0.quilybs.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
const URI = "mongodb://127.0.0.1:27017/woocommerce";
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 30000, // Increase timeout to 30 seconds
};
const connection = async () => {
  try {
    await mongoose.connect(URI, options);
    console.log("Database connected");
  } catch (error) {
    console.error("Database connection error:", error);
  }
};

export { connection };
