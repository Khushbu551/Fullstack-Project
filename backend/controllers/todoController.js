import users from '../data/users.json' with { type: 'json' };
import todos from '../data/todos.json' with { type: 'json' };
import fs from "fs"; 


export const getTodos = (req, res) => {
  const { username } = req.body;
  try {
    const user = users.find(user => user.username === username);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    const userTodos = todos.filter(todo => todo.uID === user.userID);
    res.json(userTodos);
  } catch (error) {
    res.status(500).json({ error: "Todos not found!" });
  }
};

// save todos
const saveTodos = (updatedTodos) => {
  fs.writeFileSync("./data/todos.json", JSON.stringify(updatedTodos, null, 2));
};

//  Add Todo
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

// Edit Todo
export const editTodo = (req, res) => {
  const id = parseInt(req.params.id);
  const { completed } = req.body;

  const todo = todos.find((t) => t.id === id);
  if (!todo) return res.status(404).json({ message: "Todo not found" });

  todo.completed = completed;
  saveTodos(todos);
  res.json(todo);
};

// Delete Todo
export const deleteTodo = (req, res) => {
  const id = parseInt(req.params.id);
  const index = todos.findIndex((t) => t.id === id);
  if (index === -1) return res.status(404).json({ message: "Todo not found" });

  const removed = todos.splice(index, 1);
  saveTodos(todos);
  res.json({ message: "Todo deleted", removed });
};
