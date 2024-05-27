const express = require("express");
const bodyParser = require("body-parser");
const dbConnection = require("./config/dbConfigure");
const app = express();
const dotenv = require("dotenv");
require("dotenv").config();
const { body,validationResult } = require('express-validator');

const port = process.env.PORT ||8000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/user", (req, res) => {
  //const userId = req.params.id;
  //const query = 'SELECT * FROM kodie.tbl_company_information';
  const query = `call kodie.USP_KODIE_GET_COMPANY_INFORMATION()`;
  dbConnection.query(query,(err, results) => {
    if (err) {
      console.error("error executng query:" + err.stack);
      res.status(500).send("error");
      return;
    }
    res.json(results);
  });

});

app.get("/user/:id", (req, res) => {
  const userId = req.params.id; 
  //const query = `SELECT * FROM kodie.tbl_company_information where ci_company_id = ${userId}`;
  const query = `call kodie.USP_KODIE_GET_BYID_COMPANY_INFORMATION(${userId})`;

  dbConnection.query(query, [userId], (err, results) => {
    if (err) {
      console.error("Error executing query:", err.stack);
      res.status(400).json({ message: "Invalid request" });
      return;
    }

    if (!results || results.length === 0 || !results[0].length) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    res.json(results[0]);
  });

});


app.delete("/user/:id", (req, res) => {
  const userId = req.params.id;  
  const query = `call kodie.USP_KODIE_DELETE_COMPANY_INFORMATION(${userId})`; 

  dbConnection.query(query, [userId], (err, results) => {
    if (err) {
      console.error("Error executing query: " + err.stack); 
      res.status(500).send("Error"); 
      return;
    }
    
    if (results.affectedRows === 0) {
      res.status(404).send("User not found"); 
      return;
    }
    
    res.status(200).send("User deleted successfully");  
  });
});

app.post("/user", [
  
  body('ci_company_name').notEmpty().withMessage('Company name is required'),
  body('ci_company_email').isEmail().withMessage('Valid email is required'),
  body('ci_contact_number').isNumeric().withMessage('Contact number must be numeric')
], (req, res) => {
  
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const companyName = req.body.ci_company_name;
  const companyEmail = req.body.ci_company_email;
  const contactNumber = req.body.ci_contact_number;

  const query = 'CALL kodie.USP_KODIE_INSERT_COMPANY_INFORMATION(?, ?, ?)';

  dbConnection.query(query, [companyName, companyEmail, contactNumber], (err, results) => {
    if (err) {
      console.error("Error executing query: " + err.stack);
      return res.status(500).send("Error");
    }

    if (results.affectedRows === 0) {
      return res.status(404).send("User not found");
    }

    res.send("Data inserted successfully");
  });
});

app.put("/user/:id", [
  body('ci_company_name').notEmpty().withMessage('Company name is required'),
  body('ci_company_email').isEmail().withMessage('Valid email is required'),
  body('ci_contact_number').isNumeric().withMessage('Contact number must be numeric')
], (req, res) => {
  
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const userId = req.params.id;
  const companyName = req.body.ci_company_name;
  const companyEmail = req.body.ci_company_email;
  const contactNumber = req.body.ci_contact_number;

  const query = 'CALL kodie.USP_KODIE_UPDATE_COMPANY_INFORMATION( ?, ?, ?, ?)';


  dbConnection.query(query, [userId, companyName, companyEmail, contactNumber], (err, results) => {
    if (err) {
      console.error("Error executing query: " + err.stack);
      return res.status(500).send("Error");
    }

    if (results.affectedRows === 0) {
      return res.status(404).send("User not found");
    }

    res.send("Data updated successfully");
  });
});


  app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);

});
