const express = require("express");
const bodyParser = require("body-parser");
const dbConnection = require("./config/dbConfigure");
const userRoutes = require("./src/routes/userRoute");
const app = express();
const dotenv = require("dotenv");
require("dotenv").config();
const port = process.env.PORT || 8000;

//user Routes
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/userRoutes", userRoutes);

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});

module.exports = app;
