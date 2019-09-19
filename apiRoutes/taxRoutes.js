const router = require('express').Router();
const verifyToken = require('../Utilities/verifyToken');
const getAllTaxesController = require('../Controllers/Tax/getAllTaxes');
const getTaxController = require('../Controllers/Tax/getTax');

// Get all taxes
router.get('/', verifyToken, getAllTaxesController);

// Get tax by id
router.get('/:taxId', verifyToken, getTaxController)
module.exports = router;