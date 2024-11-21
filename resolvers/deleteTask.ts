// @deno-types="npm:@types/express@4"
import { Request, Response } from "express";
import TaskModel from "../db/Task.ts";

const deleteTask = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const task = await TaskModel.findByIdAndDelete(id).exec();
    if (!task) {
      res.status(400).send({ error: "Tarea no encontrada"});
      return;
    }
    res.status(200).send({ message: "Tarea eliminada correctamente"});
  } catch (err) {
    if (typeof err === "string") {
        res.status(500).send({ error: err.toUpperCase()})
      } else if (err instanceof Error) {
        res.status(500).send({ error: err.message})
      }
      return;
  }
};

export default deleteTask;