import { Request, Response } from "express";
import TaskModel from "../db/Task.ts";

const getTask = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const task = await TaskModel.findById(id).exec();
    if (!task) {
      res.status(400).send({ error: "Tarea no encontrada"});
      return;
    }
    res.status(200).send({
      id: task.id.toString(),
      title: task.title,
      completed: task.completed,
    });
  } catch (err) {
    if (typeof err === "string") {
      res.status(500).send({ error: err.toUpperCase()})
    } else if (err instanceof Error) {
      res.status(500).send({ error: err.message})
    }
    return;
  }
};

export default getTask;