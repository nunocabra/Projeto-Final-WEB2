import mongoose, { Schema, Model, models } from "mongoose";

export interface IUser {
  _id?: string;
  name: string;
  email: string;
  password: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const UserSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: [true, "Nome é obrigatório"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email é obrigatório"],
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Senha é obrigatória"],
      minlength: [6, "Senha deve ter no mínimo 6 caracteres"],
    },
  },
  {
    timestamps: true,
  }
);

const User: Model<IUser> = models.User || mongoose.model<IUser>("User", UserSchema);

export default User;


