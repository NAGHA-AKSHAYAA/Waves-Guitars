const express = require("express");
const router = express.Router()
const auth = require('../middleware/auth');
const brandControllers = require("../controllers/brand.controller");

router.post('/addBrand', auth('createAny','brand'), brandControllers.addBrand)
router.get('/all', brandControllers.getBrands)

router.route('/brand/:id')
.get(brandControllers.getBrandById)
.delete(auth('deleteAny','brand'),brandControllers.deleteBrandById)




module.exports= router;
