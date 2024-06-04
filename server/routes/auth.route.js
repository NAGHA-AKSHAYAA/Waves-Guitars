const express = require('express');
const router = express.Router()
const authController = require('../controllers/auth.controller')

// api/auth/hello..
router.post('/register',authController.register);
router.post('/signin',authController.signin);
router.get('/isauth',authController.isauth)



module.exports = router;