import express from "express";
import bodyParser from "body-parser";
import { config } from "dotenv";
import { Data } from "./data.js";

config({ path: ".env" });
const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  next();
});

app.get("/todos", (req, res) => {
  const data = Data.readFile();
  res.send(data);
});

app.post("/todos", (req, res) => {
  const data = req.body;
  if (!data || !data.title) {
    return res.status(400).json({
      error: true,
      message: "Title is required",
    });
  }

  const todos = Data.readFile();
  const newTodo = {
    title: data.title,
    completed: false,
    date: new Date(),
    id: todos.length + 1,
  };
  Data.writeFile(newTodo);
  res.send(newTodo);
});

app.patch("/todos/:id", (req, res) => {
  const id = req.params.id;
  const data = req.body;
  if (!id) {
    return res.status(400).json({
      error: true,
      message: "Id is required",
    });
  }

  if (!data || data.completed === undefined || !data.title) {
    return res.status(400).json({
      error: true,
      message: "Title and Completed properties are required",
    });
  }

  const todos = Data.readFile();
  const todo = todos.find((todo) => todo.id === parseInt(id));
  if (!todo) {
    return res.status(404).json({
      error: true,
      message: "Todo not found",
    });
  }

  todo.completed = data.completed;
  todo.title = data.title;

  todos[id - 1] = todo;
  Data.replaceFile(todos);
  res.send(todo);
});

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});