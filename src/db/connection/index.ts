import { config } from "dotenv";
import mongoose from "mongoose";

config();

const connectToDB = async () => {
  try {
    await mongoose.connect(process.env.DB_STRING!, {
      autoIndex: true,
    });
    console.log("\nDB connected to Atlas\n");
  } catch (error) {
    console.error("Failed to connect to Atlas", error);
  }
};

export { connectToDB };
