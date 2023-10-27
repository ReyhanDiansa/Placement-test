const express = require("express");

const app = express();

app.use(express.json());

const userController = require("../controllers/userController");
require("dotenv/config");


app.post("/login", userController.Login);
app.post(
  "/register",
  userController.Register
);

module.exports = app;
