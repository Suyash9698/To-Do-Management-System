// Login.js
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./style.css";
import { FaLock, FaUnlock, FaUser } from "react-icons/fa";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleLoginSuccess = () => {
    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("username", username);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3001/login", { username, password }) 
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

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="d-flex justify-content-center align-items-center bg-secondary vh-100">
      <div className="bg-black p-3 rounded-20 w-25">
        <center>
          <h6>GPT Lite</h6>
          <h2>Login</h2>
        </center>
        <hr></hr>
        <form onSubmit={handleSubmit}>
          {/* Username Field */}
          <div className="mb-3">
            <label htmlFor="username">
              <strong>Username</strong>
            </label>
            <div className="input-group">
              <span className="input-group-text">
                <FaUser />
              </span>
              <input
                type="text"
                placeholder="Enter Username"
                name="username"
                autoComplete="off"
                className="form-control rounded-0"
                required
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
          </div>
          {/* End of Username Field */}
          
          {/* Password Field */}
          <div className="mb-3">
            <label htmlFor="password">
              <strong>Password</strong>
            </label>
            <div className="input-group">
              <span className="input-group-text" onClick={togglePasswordVisibility}>
                {showPassword ? <FaUnlock /> : <FaLock />}
              </span>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter Password"
                name="password"
                autoComplete="off"
                className="form-control rounded-0"
                required
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>
          {/* End of Password Field */}
          
          <button type="submit" className="btn btn-success w-100 rounded-0">
            Login
          </button>
        </form>
        <p>Create account</p>
        <Link
          to="/register"
          className="btn btn-default border w-100 link-custom-bg text-decoration-none"
          style={{ marginTop: "4px" }}
        >
          Sign up
        </Link>
      </div>
      <ToastContainer />
    </div>
  );
}

export default Login;
