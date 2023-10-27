const express = require("express");

const app = express();

app.use(express.json());

const destinationController = require("../controllers/destinationController");
const auth = require(`../auth/auth`);
require("dotenv/config");

app.post(
  "/addDestination",
  auth.authVerify,
  destinationController.addDestination
);
app.delete(
  "/deleteDestination/:id",
  auth.authVerify,
  destinationController.deleteDestination
);
app.get("/getAll", destinationController.getDestination);
app.put(
  "/updateDestination/:id",
  auth.authVerify,
  destinationController.updateDestination
);
app.get("/find/:id", destinationController.findDestination);
app.post("/findByTitle", auth.authVerify, destinationController.findByTitle);


module.exports = app;
