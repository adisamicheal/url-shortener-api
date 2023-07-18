import dotenv from "dotenv";
import mongoose from "mongoose";
import { Connect_To_Db_Type } from "../Types";

dotenv.config();

const connect_To_Db: Connect_To_Db_Type = async () => {
  try {
    await mongoose.connect(process.env.APP_MONGODB_URL as string);
    return "Connected to Db";
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

export default connect_To_Db;
