import mongoose from "mongoose";
import { Task } from "../types.ts";

const Schema = mongoose.Schema;

const taskSchema = new Schema(
  {
    title: { type: String, required: true, unique: true },
    completed: { type: Boolean, required: true, default: false },
  },
  { timestamps: true }
);

export type TaskModelType = mongoose.Document & Omit<Task, "id">;

export default mongoose.model<TaskModelType>("Task", taskSchema);