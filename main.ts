// @deno-types="npm:@types/express@4"
import express, { Request, Response } from "express";
import mongoose from "mongoose";

import getTasks from "./resolvers/getTasks.ts";
import getTask from "./resolvers/getTask.ts";
import postTask from "./resolvers/postTask.ts";
import updateStatus from "./resolvers/updateStatus.ts";
import deleteTask from "./resolvers/deleteTask.ts";

import { load } from "https://deno.land/std@0.204.0/dotenv/mod.ts";
const env = await load();

const MONGO_URL = env.MONGO_URL || Deno.env.get("MONGO_URL");

if (!MONGO_URL) {
  console.log("No mongo URL found");
  Deno.exit(1);
}

await mongoose.connect(MONGO_URL);
const app = express();
app.use(express.json());
app.get("/tasks", getTasks);
app.get("/tasks/:id", getTask);
app.post("/tasks", postTask);
app.put("/tasks/:id", updateStatus);
app.delete("/tasks/:id", deleteTask);
app.listen(3000, () => {
  console.log("Server listening on port 3000");
});