import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

const connectToDatabase: any = async () => {
  const PORT = process.env.APP_PORT;

  try {
    await mongoose.connect(process.env.APP_MONGODB_URL as string);
    return "Connected to Db";
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

export default connectToDatabase;
