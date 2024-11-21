import express, { Request, Response } from "express";
import { User } from "./models/user";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import multer from "multer";

dotenv.config();

const app = express();
const upload = multer({ dest: "uploads/" });
app.use(express.json());
app.use(cors());

app.set(
  "/",
  upload.single("profileImage"),
  async (req: Request, res: Response) => {
    const imageUrl = req.file.path;
    const { username, score } = req.body;

    try {
      const existingName = await User.findOne(username);
      if (existingName) {
        return res.status(400).json({ message: "username already taken" });
      }

      const user = await User.create({
        username,
        score,
        profileImage: imageUrl,
      });
      res.status(200).json({ user });
    } catch (error) {
      console.log(error);
    }
  }
);

mongoose
  .connect(process.env.DATABASE_URL as string)
  .then(() => {
    app.listen(process.env.PORT as string, () => {
      console.log(
        `Server is running on port ${process.env.PORT}\nConnected to dataBase...`
      );
    });
  })
  .catch((error) => {
    console.error("Connection to MongoDB failed:", error.message);
  });
