// @deno-types="npm:@types/express@4"
import { Request, Response } from "express";
import TaskModel from "../db/Task.ts";

export const getTasks = async (req: Request, res: Response) => {
    try {
      const tasks = await TaskModel.find();

      res.status(200).send(
        tasks.map((task) => ({
            id: task.id.toString(),
            title: task.title,
            completed: task.completed,
        }))
      );
    } catch (err) {
      if (typeof err === "string") {
        res.status(500).send({ error: err.toUpperCase()})
      } else if (err instanceof Error) {
        res.status(500).send({ error: err.message})
      }
      return;
    }
  };

  export default getTasks;