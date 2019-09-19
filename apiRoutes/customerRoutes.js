const router = require('express').Router();
const verifyToken = require('../Utilities/verifyToken');
const registerController = require('../Controllers/Customers/register');
const loginController = require ('../Controllers/Customers/login');
const updateAccountController = require('../Controllers/Customers/updateCustomerAccount');
const updateAddressController = require('../Controllers/Customers/updateCustomerAddress');
const updateCreditCardController = require('../Controllers/Customers/updateCreditCard');
getCustomerInfoController = require('../Controllers/Customers/getCustomerById');


// Register a new customer
router.post('/register', registerController);

//Login
router.post('/login', loginController);

// Update User Account Info
router.put('/', verifyToken, updateAccountController);

// Update User Address
router.put('/address', verifyToken, updateAddressController);

//Update Credit card
router.put('/creditCard', verifyToken, updateCreditCardController)

// Get a Cutomer Info
router.get('/', verifyToken, getCustomerInfoController)

module.exports = router;