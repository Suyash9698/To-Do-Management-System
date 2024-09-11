const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
app.use(express.json());
app.use(cors());

// Create connections for "users" and "chats" databases
const userConnection = mongoose.createConnection("mongodb://localhost:27017/Suyash8th");
const suyashLab2ndConnection = mongoose.createConnection("mongodb://localhost:27017/SuyashLab2nd");
// Define schemas for "users" and "chats" collections
const userSchema = new mongoose.Schema({
  username: String,
  password: String,
});


const todoSchema = new mongoose.Schema({
   title:String,
   description:String,
   date:String,
   status:String,
});


// Create models for "users" and "chats" collections using their respective connections and schemas
const User = userConnection.model("User", userSchema);
const todo=suyashLab2ndConnection.model("todo",todoSchema);


app.post("/submitData", (req, res) => {
  const { title, description, date, status } = req.body;

  todo.create({ title, description, date, status })
    .then((newEntry) => {
      res.status(200).json({ message: "Data submitted successfully" });
    })
    .catch((err) => {
      res.status(500).json({ message: "Error creating entry", error: err });
    });
});
// ...

app.get("/completed", async (req, res) => {
  try {
    // Fetch completed to-do items from your database
    const completedTodos = await todo.find({ status: "Completed" });

    // Send the completed to-do items as a JSON response
    res.json(completedTodos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

app.get("/notcompleted", async (req, res) => {
  try {
    // Fetch completed to-do items from your database
    const completedTodos = await todo.find({ status: "Not Completed" });

    // Send the completed to-do items as a JSON response
    res.json(completedTodos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});


app.post("/register", (req, res) => {
  const { username, password } = req.body;

  User.findOne({ username: username })
    .then((user) => {
      if (user) {
        res.status(400).json({ message: "Username already registered" });
      } else {
        User.create({ username, password })
          .then((newUser) => {
            res.status(200).json({ message: "Registered successfully" });
          })
          .catch((err) => {
            res.status(500).json({ message: "Error creating user" });
          });
      }
    })
    .catch((err) => {
      res.status(500).json({ message: "Error checking" });
    });
});

// Login endpoint
app.post("/login", (req, res) => {
  const { username, password } = req.body;

  User.findOne({ username: username })
    .then((user) => {
      if (user) {
        if (user.password === password) {
          // Set a session cookie upon successful login
         
          res.json({ success: true, message: "Redirecting to to-do page" });
        } else {
          res.json({ success: false, message: "The password is incorrect" });
        }
      } else {
        res.json({ success: false, message: "No record existed" });
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ success: false, message: "Internal Server Error" });
    });
});




app.listen(3001, () => {
  console.log("Server is running");
});