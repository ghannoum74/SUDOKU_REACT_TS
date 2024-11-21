import mongoose, { Document, Schema } from "mongoose";
import Joi from "joi";

interface User extends Document {
  username: string;
  score?: number;
  profileImg?: string;
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
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model<User>("User", UserSchema);

const validationNewUser = Joi.object({
  username: Joi.string().trim(),
  number: Joi.number(),
});

export { User, validationNewUser };
