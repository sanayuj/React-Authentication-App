const express = require('express');
const { signup, login, uploadImage } = require('../Controllers/Authcontrollers');
const { checkUser } = require('../Middleware/AuthMiddleware');
const router = express.Router();
const {uploadFile}= require('../Middleware/Multer')

router.post("/",checkUser); 
router.post("/signup",signup);
router.post("/login",login);
router.post("/uploadimage",uploadFile.single('image'),uploadImage)


module.exports = router;
 