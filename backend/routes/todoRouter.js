import express from "express";
import {
  getTodos,
  addTodo,
  editTodo,
  deleteTodo,
} from "../controllers/todoController.js";

export const todoRouter = express.Router();

todoRouter.post("/", getTodos);
todoRouter.post("/add", addTodo);
todoRouter.put("/:id", editTodo);
todoRouter.delete("/:id", deleteTodo);
