const express = require("express");
const bodyParser = require("body-parser");
const dbConnection = require("./config/dbConfigure");
const app = express();
const dotenv = require("dotenv");
require("dotenv").config();

const port = process.env.PORT ||8000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/user", (req, res) => {
  const query = 'SELECT * FROM kodie.tbl_company_information';
  dbConnection.query(query, (err, results) => {
    if (err) {
      console.err("error executng query:" + err.stack);
      res.status(500).send("error");
      return;
    }
    res.json(results);
  });

});


app.get("/signup/:id", (req, res) => {
  const query = 'SELECT * FROM kodie.tbl_company_information';
  dbConnection.query(query, (err, results) => {
    if (err) {
      console.err("error executng query:" + err.stack);
      res.status(500).send("error");
      return;
    }
    res.json(results);
  });

});

  app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);

});
