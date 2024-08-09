import dotenv from "dotenv";
import mongoose from "mongoose";
dotenv.config();
const ConnectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URL).then((conn) => {
      console.log("MongoDB Connected---------------->", conn.connection.host);
    });
  } catch (error) {
    console.log("The DataBase Failed to Connect ", error);
  }
};

export default ConnectDB;
