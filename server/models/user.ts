import mongoose, { Document, Schema } from "mongoose";
import * as Joi from "joi";

interface User extends Document {
  username: string;
  score?: number;
  profileImg?: string;
  level: string;
  time: string;
}

const UserSchema = new Schema<User>(
  {
    username: {
      type: String,
      trim: true,
      required: true,
      unique: true,
    },
    score: {
      type: Number,
    },
    profileImg: {
      type: String,
    },
    level: {
      type: String,
      required: true,
    },
    time: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model<User>("User", UserSchema);

const validationNewUser = Joi.object({
  username: Joi.string().trim().required(),
  score: Joi.number(),
  profileImg: Joi.string(),
  level: Joi.string().required(),
  time: Joi.string().required(),
});

export { User, validationNewUser };
