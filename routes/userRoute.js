const express = require("express");

const app = express();

app.use(express.json());

const userController = require("../controllers/userController");
const auth = require(`../auth/auth`);
require("dotenv/config");


app.post("/login", userController.Login);
app.post(
  "/register",
  auth.authVerify,
  userController.Register
);

module.exports = app;
