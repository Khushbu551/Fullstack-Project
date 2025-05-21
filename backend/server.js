import express from "express";
import cors from "cors";
import { loginRouter } from "./routes/loginRouter.js";
import { todoRouter } from "./routes/todoRouter.js";

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/login", loginRouter);
app.use("/todos", todoRouter);
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
