const router = require('express').Router();
const verifyToken = require('../Utilities/verifyToken');
const getAllproductsController = require('../Controllers/Products/getAllAproducts');
const searchProductController = require('../Controllers/Products/searchProducts');
const getSingleProductController = require('../Controllers/Products/getSingleProduct');
const getProductsInCategoryController = require('../Controllers/Products/getProductsInCategory');
const getProductsInDepartmentController = require('../Controllers/Products/getProductsInDepartment');
const getProductReviewsController = require('../Controllers/Products/getReviewsOfProduct');
const postProductReviewController = require('../Controllers/Products/postProductReview');


// Get all products
router.get('/', verifyToken, getAllproductsController);

//Search for product
router.get('/search', verifyToken, searchProductController)

// Get a single product
router.get('/:product_id', verifyToken, getSingleProductController);

//Get products in Category
router.get('/inCategory/:category_id', verifyToken, getProductsInCategoryController);

//Get products in Department
router.get('/inDepartment/:department_id', verifyToken, getProductsInDepartmentController);

// Get and post reviews for a product
router.route('/:product_id/reviews')
    .get(verifyToken, getProductReviewsController)
    .post(verifyToken, postProductReviewController);


module.exports = router;