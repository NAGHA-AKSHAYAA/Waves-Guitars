const express = require("express");
const router = express.Router()
const productController = require('../controllers/product.controller');
const auth = require("../middleware/auth");
const {addProductValidator} = require('../middleware/validation');


router.post('/', auth('createAny','product'), addProductValidator, productController.addProduct)
router.get('/all', productController.allProducts)
router.post('/paginate/all', productController.paginateProducts)

router.route('/product/:id')
.get(productController.getProductById)
.patch(auth('updateAny','product'), productController.updateProductById)
.delete(auth('deleteAny','product'),productController.deleteproductById)





module.exports = router