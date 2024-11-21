// @deno-types="npm:@types/express@4"
import { Request, Response } from "express";
import TaskModel from "../db/Task.ts";

const updateStatus = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (!id) {
        res.status(400).send({ error: "ID requerido"});
        return;
    }

    const taskToUpdate = await TaskModel.findById(id).exec();

    if(!taskToUpdate) {
        res.status(400).send({ error: "Tarea no encontrada"});
        return;
    };

    if(taskToUpdate.completed) { taskToUpdate.completed = false; } else { taskToUpdate.completed = true; };
    taskToUpdate.save();

    res.status(200).send({
        id: taskToUpdate.id.toString(),
        title: taskToUpdate.title,
        completed: taskToUpdate.completed,
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

export default updateStatus;