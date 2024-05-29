const express = require('express');
const router = express.Router();
const {createUser,getUsers,getUsersByid,deleteUser, updateUser}= require("../controller/userController");

router.post('/createUser',createUser);
router.get('/getAllUsers',getUsers);
router.get("/getUsers",getUsersByid);
router.delete("/deleteUser",deleteUser);
router.put("/updateUser",updateUser);

module.exports=router;