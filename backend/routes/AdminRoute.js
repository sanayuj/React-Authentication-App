
const express = require('express');
const { home, addUser, deleteUser, AdminLogin, editUser } = require('../Controllers/AdminControllers');
const router = express.Router();



router.get("/",home)
router.post("/adduser",addUser)
router.post("/deleteuser/:id",deleteUser)
router.post("/adminlogin",AdminLogin)
router.post("/edituser",editUser)

module.exports = router;