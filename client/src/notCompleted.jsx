import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { FaSignOutAlt } from "react-icons/fa";
import Modal from "react-bootstrap/Modal";
import "./style.css";
import 'bootstrap/dist/css/bootstrap.min.css';

function Information2() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3001/notcompleted")
      .then((response) => {
        setTodos(response.data);
      })
      .catch((error) => {
        console.error("Error fetching to-do items:", error);
      });
  }, []);

  return (
    <div>
      {/* Navbar */}
      <center>
        <nav className="navbar navbar-dark bg-black" style={{ borderRadius: "20px", padding: "20px", width: "92%", marginTop: "30px", height: "90px" }}>
          <div className="container-fluid">
            <a className="navbar-brand mx-auto" href="#">
              <center style={{ marginLeft: "100px" }}><h2>Not Completed ToDo task Members List</h2></center>
            </a>
          </div>
        </nav>
      </center>

      {/* Main content */}
      <div className="container mt-4" style={{ backgroundColor: "black" }}>
        <h4 style={{ paddingLeft: "15px", paddingTop: "15px" }}>To-Do List</h4>
        <hr></hr>
        <div className="table-container p-2">
          {/* Table goes here */}
          <table className="table table-bordered table-striped table-custom">
            <thead className="thead-dark">
              <tr>
                <th>Title</th>
                <th>Description</th>
                <th>Status</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {todos.map((todo, index) => (
                <tr key={todo.id}>
                  <td>{todo.title}</td>
                  <td>{todo.description}</td>
                  <td>{todo.status}</td>
                  <td>{todo.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Information2;
