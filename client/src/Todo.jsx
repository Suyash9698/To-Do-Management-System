import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./style.css";
import { FiLogOut } from "react-icons/fi";
import axios from "axios";
import { Link } from "react-router-dom";

function ToDoPage() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [status, setStatus] = useState("Not Completed");
  const [todoItem, setTodoItem] = useState(null);

  const handleCreate = () => {
    if (!title || !description || !date) {
      toast.error("Please fill in all fields.", {
        position: "top-center",
        autoClose: 3000,
      });
      return;
    }

    const newTodoItem = {
      title,
      description,
      date,
      status,
    };

    setTodoItem(newTodoItem);
    toast.success("To-Do item created successfully!", {
      position: "top-center",
      autoClose: 3000,
    });
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3001/submitData", {
        title,
        description,
        date,
        status,
      })
      .then((result) => {
        const { success, message } = result.data;
  
        if (success) {
          toast.success(message, {
            position: "top-center",
            autoClose: 3000,
          });
          handleLoginSuccess();
          setTimeout(() => {
            navigate("/todo");
          }, 2000);
        } else {
          toast.error(message, {
            position: "top-center",
            autoClose: 3000,
          });
        }
      })
      .catch((err) => {
        console.error(err);
        toast.error("An error occurred while logging in.", {
          position: "top-center",
          autoClose: 3000,
        });
      });
  };
  

  useEffect(() => {
    const currentDate = new Date();
    const selectedDateObj = new Date(date);
  
    if (status === "Not Completed" && selectedDateObj < currentDate) {
      toast.error("You can't select a past date for 'Not Completed' status.", {
        position: "top-center",
        autoClose: 3000,
      });
      setDate(""); 
    } else if (status === "Completed" && selectedDateObj > currentDate) {
      toast.error("You can't select a future date for 'Completed' status.", {
        position: "top-center",
        autoClose: 3000,
      });
      setDate(""); 
    }
  }, [status, date]);
  

  const displayTodoItem = () => {
    if (todoItem) {
      const message = (
        <div>
          <p style={{ color: "black" }}>
            <strong style={{ color: "black" }}>Title:</strong> {todoItem.title}
          </p>
          <p style={{ color: "black" }}>
            <strong style={{ color: "black" }}>Description:</strong> {todoItem.description}
          </p>
          <p style={{ color: "black" }}>
            <strong style={{ color: "black" }}>Date:</strong> {todoItem.date}
          </p>
          <p style={{ color: "black" }}>
            <strong style={{ color: "black" }}>Status:</strong> {todoItem.status}
          </p>
        </div>
      );

      toast.info(message, {
        position: "top-center",
        autoClose: false,
      });
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/login";
  };

  return (
    <div className="todo-container" style={{marginTop:"50px"}}>
      <h1 style={{ color: "black", textAlign: "center" }}>To-Do List</h1>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div></div>
        <div className="logout-button" onClick={handleLogout} style={{ height: "40px", width: "20px" }}>
          <FiLogOut style={{ fontSize: "25px", marginLeft: "-10px", marginTop: "-10px" }} />
        </div>
      </div>
      <div className="input-container">
        <label style={{ color: "blue" }}>Title:</label>
        <input
          type="text"
          value={title}
          placeholder="Enter the title here..."
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div className="input-container">
        <label style={{ color: "blue" }}>Description:</label>
        <textarea
          value={description}
          style={{ height: "100px", width: "410px" }}
          placeholder="Enter the task description here..."
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      
      <div className="input-container">
        <label style={{ color: "blue" }}>Status:</label>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="custom-select"
        >
          <option value="Not Completed">Not Completed</option>
          <option value="Completed">Completed</option>
        </select>
      </div>
      <div className="input-container">
        <label style={{ color: "blue" }}>Date:</label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
      </div>
      <button className="create-button" onClick={handleCreate}>
        Create
      </button>
      <br />
      <button className="display-button" onClick={displayTodoItem}>
        Display To-Do Item
      </button>
      <br />
      <button className="submit-button" onClick={handleSubmit}>
        Submit
      </button>
      <Link to="/Completed">List of Completed tasks</Link><br></br>
      <Link to="/Completed">List of Not Completed tasks</Link>
      <ToastContainer />
    </div>
  );
}

export default ToDoPage;
