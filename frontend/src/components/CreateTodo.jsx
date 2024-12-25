import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

export function CreateTodo({ onTodoAdded }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleAddTodo = () => {
    fetch("http://localhost:3000/todo", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: title,
        description: description,
      }),
    })
      .then(async (res) => {
        if (!res.ok) {
          throw new Error("Failed to add todo");
        }
        const json = await res.json();
        console.log(json);
        
        alert("Todo added successfully");
        setTitle("");
        setDescription("");
        onTodoAdded(); 
      })
      .catch((err) => {
        console.error("Error:", err);
        alert("Error adding todo");
      });
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center vh-100"
      style={{
        background: "linear-gradient(135deg, #ff9a9e, #fad0c4)",
        fontFamily: "'Poppins', sans-serif",
      }}
    >
      <div
        className="p-4 shadow-lg rounded"
        style={{
          background: "#fff",
          maxWidth: "400px",
          width: "100%",
          boxShadow: "0 10px 20px rgba(0, 0, 0, 0.15)",
        }}
      >
        <h3
          className="text-center mb-4"
          style={{ fontWeight: "600", color: "#ff6f61" }}
        >
          Create a Todo
        </h3>
        <div className="form-group mb-3">
          <label htmlFor="title" className="form-label">
            Title
          </label>
          <input
            type="text"
            id="title"
            className="form-control"
            placeholder="Enter title"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
            style={{ padding: "10px", borderRadius: "5px" }}
          />
        </div>
        <div className="form-group mb-3">
          <label htmlFor="desc" className="form-label">
            Description
          </label>
          <textarea
            id="desc"
            className="form-control"
            placeholder="Enter description"
            rows="4"
            onChange={(e) => setDescription(e.target.value)}
            value={description}
            style={{ padding: "10px", borderRadius: "5px" }}
          />
        </div>
        <button
          className="btn btn-block w-100"
          style={{
            padding: "10px",
            backgroundColor: "#ff6f61",
            color: "#fff",
            fontWeight: "600",
            borderRadius: "5px",
            boxShadow: "0 5px 15px rgba(255, 111, 97, 0.3)",
            transition: "all 0.3s",
          }}
          onClick={handleAddTodo}
          onMouseEnter={(e) =>
            (e.target.style.backgroundColor = "#ff867c")
          }
          onMouseLeave={(e) =>
            (e.target.style.backgroundColor = "#ff6f61")
          }
        >
          Add a Todo
        </button>
      </div>
    </div>
  );
}
