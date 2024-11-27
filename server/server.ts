import express, { Request, Response } from "express";
import { User } from "./models/user";
import mongoose from "mongoose";
import * as dotenv from "dotenv";
import cors from "cors";
import multer from "multer";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

app.use(
  cors({
    origin: ["https://sudoku-mern.netlify.app/"],
  })
);
app.use(express.json());

const defaultImagePath =
  "https://wallpapers.com/images/hd/netflix-profile-pictures-1000-x-1000-88wkdmjrorckekha.jpg";

const upload = multer({
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB
}).single("image");

app.post("/addScore", upload, async (req: Request, res: Response) => {
  const { username, score, level, time } = req.body;

  try {
    const imageUrl = req.file?.path || defaultImagePath;
    const existingName = await User.findOne({ username });
    if (existingName) {
      res.status(400).json({ message: "username already taken" });
    } else {
      const user = await User.create({
        username,
        score,
        profileImg: imageUrl,
        level: level,
        time: time,
      });
      console.log(user);

      res.status(200).json({ user });
    }
  } catch (error) {
    res.status(400).json(error);
  }
});

app.get("/getUsers", async (req: Request, res: Response) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(400).json(error);
  }
});

mongoose
  .connect(process.env.DATABASE_URL as string)
  .then(() => {
    app.listen(3000, () => {
      console.log(
        `Server is running on port ${3000}\nConnected to dataBase...`
      );
    });
  })
  .catch((error) => {
    console.error("Connection to MongoDB failed:", error.message);
  });
