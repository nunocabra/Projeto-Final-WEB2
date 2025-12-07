import mongoose, { Schema, Model, models } from "mongoose";

export interface ITask {
  _id?: string;
  title: string;
  description?: string;
  status: "pendente" | "em-andamento" | "concluida";
  priority: "baixa" | "media" | "alta";
  userId: mongoose.Types.ObjectId;
  createdAt?: Date;
  updatedAt?: Date;
}

const TaskSchema = new Schema<ITask>(
  {
    title: {
      type: String,
      required: [true, "Título é obrigatório"],
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    status: {
      type: String,
      enum: ["pendente", "em-andamento", "concluida"],
      default: "pendente",
    },
    priority: {
      type: String,
      enum: ["baixa", "media", "alta"],
      default: "media",
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Task: Model<ITask> = models.Task || mongoose.model<ITask>("Task", TaskSchema);

export default Task;


