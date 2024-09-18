const express = require('express')
const router = express.Router();
const authController = require('../controllers/auth.controller')



router.post('/register', authController.register)
router.post('/signIn', authController.signin)
router.get('/isauth', authController.isauth)




module.exports = router;