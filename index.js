const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
app.use(express.json());
app.use(cors());
const todoModel = require("./model/todoModel");

app.post("/todo", async (req, res) => {
  const newTodo = await todoModel({
    name: req.body.name,
    completed: req.body.completed,
  });
  newTodo.save();
  res.json(newTodo);
});

app.put("/todo/:id", async (req, res) => {
  const updateTodo = await todoModel.updateOne(
    { _id: req.params.id },
    { completed: req.body.completed }
  );
  if (updateTodo.modifiedCount == 1) {
    res.json("updated");
  } else {
    res.json("error");
  }
});

app.get("/todo", async (req, res) => {
  const allTodo = await todoModel.find({});
  res.json(allTodo);
});

app.get("/todo/:id", async (req, res) => {
  const singleTodo = await todoModel.findOne({ _id: req.params.id });
  res.json(singleTodo);
});

app.delete("/todo/:id", async (req, res) => {
  const deleteTodo = await todoModel.deleteOne({ _id: req.params.id });
  if (deleteTodo.deletedCount == 1) {
    res.json("deleted successfully");
  } else {
    res.json("error");
  }
});

mongoose.connect(
  "mongodb+srv://hemant:hemant@cluster0.zm42fgw.mongodb.net/db-tutorial?retryWrites=true&w=majority",
  (err) => console.log("connected", err)
);

app.listen(4000, () => {
  console.log("service is connected to 4000");
});
