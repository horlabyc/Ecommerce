const router = require('express').Router();
const verifyToken = require('../Utilities/verifyToken');
const getShippingRegionsController = require('../Controllers/Shipping/getShippingRegions');
const getSingleShippingRegionController = require('../Controllers/Shipping/getSingleShippingRegion');

//Get all regions
router.get('/regions' , verifyToken, getShippingRegionsController);

//Get single region
router.get('/regions/:shippingRegionId', verifyToken, getSingleShippingRegionController );

module.exports = router;