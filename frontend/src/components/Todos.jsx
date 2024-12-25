import React, { useState, useEffect, useCallback } from "react";
import { CreateTodo } from "./CreateTodo";

export function Todos() {
  const [todos, setTodos] = useState([]);

  const fetchTodos = useCallback(async () => {
    try {
      const response = await fetch("http://localhost:3000/todos");
      const data = await response.json();
      setTodos(data.todos);
    } catch (error) {
      console.error("Error fetching todos:", error);
    }
  }, []);

  useEffect(() => {
    fetchTodos();
  }, [fetchTodos]);

  const handleDeleteTodo = async (id) => {
    try {
      const response = await fetch("http://localhost:3000/todo", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      });

      if (!response.ok) {
        throw new Error("Error deleting todo");
      }

      alert("Todo deleted successfully");
      fetchTodos(); 
    } catch (error) {
      console.error("Error deleting todo:", error);
      alert("Error deleting todo");
    }
  };

  return (
    <div>
      <h1 className="text-center my-4">Todo List</h1>

      <CreateTodo onTodoAdded={fetchTodos} />

      <div className="container mt-4">
        {todos.map((todo) => (
          <div
            key={todo._id}
            className="p-3 mb-3 shadow-sm rounded"
            style={{
              backgroundColor: todo.completed ? "#d4edda" : "#f8d7da",
            }}
          >
            <h5>{todo.title}</h5>
            <p>{todo.description}</p>
            <button
              className="btn btn-sm btn-success"
              onClick={async () => {
                try {
                  await fetch("http://localhost:3000/completed", {
                    method: "PUT",
                    headers: {
                      "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ id: todo._id }),
                  });
                  fetchTodos(); 
                } catch (error) {
                  console.error("Error marking todo as completed:", error);
                }
              }}
              disabled={todo.completed}
            >
              {todo.completed ? "Completed" : "Mark as Completed"}
            </button>
            <button
              className="btn btn-sm btn-danger"
              style={{ marginLeft: "10px" }} 
              onClick={() => handleDeleteTodo(todo._id)}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
