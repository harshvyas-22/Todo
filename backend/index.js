const { ObjectId } = require("mongodb");
const express = require("express");
const { createTodo, updateTodo } = require("./types");
const { todo } = require("./db");
const app = express();
const cors = require("cors");

app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:5173", 
  })
);

app.post("/todo", async (req, res) => {
  try {
    const createPayload = req.body;
    const parsePayload = createTodo.safeParse(createPayload);

    if (!parsePayload.success) {
      return res.status(400).json({
        msg: "Invalid input format",
        errors: parsePayload.error.errors, 
      });
    }

    await todo.create({
      title: createPayload.title,
      description: createPayload.description,
      completed: false,
    });

    res.status(201).json({
      msg: "Todo created successfully",
    });
  } catch (error) {
    console.error("Error creating todo:", error);
    res.status(500).json({
      msg: "Internal Server Error",
    });
  }
});

app.get("/todos", async (req, res) => {
  try {
    const todos = await todo.find({});
    res.json({
      todos,
    });
  } catch (error) {
    console.error("Error fetching todos:", error);
    res.status(500).json({
      msg: "Internal Server Error",
    });
  }
});

app.put("/completed", async (req, res) => {
  try {
    const updatePayload = req.body;
    const parsePayload = updateTodo.safeParse(updatePayload);

    if (!parsePayload.success) {
      return res.status(400).json({
        msg: "Invalid input format",
        errors: parsePayload.error.errors, 
      });
    }

    const objectId = new ObjectId(updatePayload.id);

    const result = await todo.updateOne(
      { _id: objectId },
      { $set: { completed: true } } 
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({
        msg: "Todo not found",
      });
    }

    res.json({
      msg: "Todo marked as completed successfully",
    });
  } catch (error) {
    console.error("Error updating todo:", error);
    res.status(500).json({
      msg: "Internal Server Error",
    });
  }
});

app.delete("/todo", async (req, res) => {
  try {
    const { id } = req.body;  

    if (!id) {
      return res.status(400).json({
        msg: "ID is required to delete a todo",
      });
    }

    const objectId = new ObjectId(id);

    const result = await todo.deleteOne({ _id: objectId });

    if (result.deletedCount === 0) {
      return res.status(404).json({
        msg: "Todo not found",
      });
    }

    res.json({
      msg: "Todo deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting todo:", error);
    res.status(500).json({
      msg: "Internal Server Error",
    });
  }
});

app.listen(3000, () => {
  console.log("Server started on http://localhost:3000");
});
