const router = require('express').Router();
const verifyToken = require('../Utilities/verifyToken');
const getAllCategoriesController = require('../Controllers/Categories/getAllCategories');
const getSingleCategoryController = require('../Controllers/Categories/getSingleCategory');
const getProductCategoryController = require('../Controllers/Categories/getProductCategory');
const getAllCategoriesInDepartment  = require('../Controllers/Categories/getCategoriesInDepartment');

// Get all categories
router.get('/', verifyToken, getAllCategoriesController);

//Get a single category detail
router.get('/:category_Id', verifyToken, getSingleCategoryController);

// Get category of a particular product
router.get('/inProduct/:product_id', verifyToken, getProductCategoryController);

// Get all categories in a department
router.get('/inDepartment/:department_id', verifyToken, getAllCategoriesInDepartment);


module.exports = router;