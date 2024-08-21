const express = require("express");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const PORT = 5005;
const mongoose = require("mongoose");

const students = require("./models/Student.model");
const cohorts = require("./models/Cohort.model");

const cors = require("cors");

mongoose
  .connect("mongodb://127.0.0.1:27017/cohorts-tools-api")
  .then((x) => console.log(`Connected to Database: "${x.connections[0].name}"`))
  .catch((err) => console.error("Error connecting to MongoDB", err));

// STATIC DATA
// Devs Team - Import the provided files with JSON data of students and cohorts here:
// ...

// INITIALIZE EXPRESS APP - https://expressjs.com/en/4x/api.html#express
const app = express();

// MIDDLEWARE
// Research Team - Set up CORS middleware here:
app.use(cors());

app.use(express.json());
app.use(morgan("dev"));
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// ROUTES - https://expressjs.com/en/starter/basic-routing.html
// Devs Team - Start working on the routes here:
// ...
app.get("/docs", (req, res, next) => {
  res.sendFile(__dirname + "/views/docs.html");
});

app.get("/students", (req, res) => {
  students
    .find({})
    .then((student) => {
      console.log("Retrieved student ->", student);
      res.json(student);
    })
    .catch((error) => {
      console.error("Error while retrieving student ->", error);
      res.status(500).json({ error: "Failed to retrieve student" });
    });
});

app.get("/cohorts", (req, res, next) => {
  cohorts
    .find({})
    .then((cohort) => {
      res.json(cohort);
    })
    .catch((err) => {
      res.status(500).json({ error: "Error fetching cohorts" });
    });
});

// START SERVER
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
