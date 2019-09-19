const router = require('express').Router();
const verifyToken = require('../Utilities/verifyToken');
const createOrderController = require('../Controllers/Orders/createOrder');


// Create a new order
router.post('/', verifyToken, createOrderController);


module.exports = router;