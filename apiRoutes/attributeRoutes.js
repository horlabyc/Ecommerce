const router = require('express').Router();
const verifyToken = require('../Utilities/verifyToken');
const getAllAttributesController = require('../Controllers/Attributes/getAllAttributes');
const getSingleAttributeController = require('../Controllers/Attributes/getSingleAttribute');
const getAttributeValuesInAttributeController = require('../Controllers/Attributes/getAllAttributeValuesInAnAttribute');
const getProductAttributes = require('../Controllers/Attributes/getProductAttributes');


//Get all attributes
router.get('/' , verifyToken, getAllAttributesController);

// Get single attribute details
router.get('/:attribute_id', verifyToken, getSingleAttributeController);

//Get all attribute values in an attribute
router.get('/values/:attribute_id', verifyToken, getAttributeValuesInAttributeController);

//Get all attributes of a product
router.get('/inProduct/:product_id', verifyToken, getProductAttributes );


module.exports = router;