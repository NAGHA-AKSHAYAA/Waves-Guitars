const express = require("express");
const router = express.Router()
const auth = require('../middleware/auth');
const auth_header = require("passport-jwt/lib/auth_header");

router.post('/brand', auth(),)





module.exports= router;
