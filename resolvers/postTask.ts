import { Request, Response } from "express";
import TaskModel from "../db/Task.ts";

const addTask = async (req: Request, res: Response) => {
  try {
    const { title } = req.query;

    if (!title) {
      res.status(400).send({ error: "Título requerido"});
      return;
    }

    const alreadyExists = await TaskModel.findOne({ title }).exec();
    if (alreadyExists) {
      res.status(400).send({ error: "Tarea ya existe"});
      return;
    }

    const newTask = new TaskModel({ title });
    await newTask.save();

    res.status(200).send({
      id: newTask.id.toString(),
      title: newTask.title,
      completed: newTask.completed,
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

export default addTask;