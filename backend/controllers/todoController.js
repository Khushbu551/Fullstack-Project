import users from "../data/users.json" with { type: "json" };
import todos from "../data/todos.json" with { type: "json" };
import fs from "fs";

// Save todos to file
const saveTodos = (updatedTodos) => {
  fs.writeFileSync("./data/todos.json", JSON.stringify(updatedTodos, null, 2));
};

// GET todos by username
export const getTodos = (req, res) => {
  const { username } = req.body;
  const user = users.find((u) => u.username === username);
  if (!user) return res.status(404).json({ error: "User not found" });

  const userTodos = todos.filter((t) => t.uID === user.userID);
  res.json(userTodos);
};

// ADD new todo
export const addTodo = (req, res) => {
  const { title, uID } = req.body;

  const newTodo = {
    id: Date.now(),
    title,
    completed: false,
    uID,
  };

  todos.push(newTodo);
  saveTodos(todos);
  res.status(201).json(newTodo);
};

// UPDATE todo (toggle complete)
export const editTodo = (req, res) => {
  const id = parseInt(req.params.id);
  const { completed } = req.body;

  const todo = todos.find((t) => t.id === id);
  if (!todo) return res.status(404).json({ message: "Todo not found" });

  todo.completed = completed;
  saveTodos(todos);
  res.json(todo);
};

// DELETE todo
export const deleteTodo = (req, res) => {
  const id = parseInt(req.params.id);
  const index = todos.findIndex((t) => t.id === id);
  if (index === -1) return res.status(404).json({ message: "Todo not found" });

  const removed = todos.splice(index, 1);
  saveTodos(todos);
  res.json({ message: "Todo deleted", removed });
};
