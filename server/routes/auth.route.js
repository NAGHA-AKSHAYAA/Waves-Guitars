const express = require('express')
const router = express.Router();
const auth = require('../middleware/auth')
const authController = require('../controllers/auth.controller')


console.log("route");

router.post('/register', authController.register)
router.post('/signIn', authController.signin)
router.get('/isauth',auth(), authController.isauth)




module.exports = router;