const router = require('express').Router();
const verifyToken = require('../Utilities/verifyToken');
const generateUniqueIdController = require('../Controllers/ShoppingCart/generateUniqueId');
const addProductToCartController = require('../Controllers/ShoppingCart/addProductTocart')
const getProductsInCartController = require('../Controllers/ShoppingCart/getProductsInCart');
const updateCartItemController = require('../Controllers/ShoppingCart/updateCartItem');
const emptyCartController = require('../Controllers/ShoppingCart/emptyCart');
const removeItemController = require('../Controllers/ShoppingCart/removeItemFromCart');
const getTotalAmountController = require('../Controllers/ShoppingCart/getTotalAmount');
const saveForLaterController = require('../Controllers/ShoppingCart/saveItemForLater');
const getsavedItemController = require('../Controllers/ShoppingCart/getSavedItem');

// Generate Unique cart Id
router.get('/generateUniqueId', verifyToken, generateUniqueIdController );

// Add product to cart
router.post('/add', verifyToken, addProductToCartController);

// get list of products in a cart
router.get('/:cartId', verifyToken,getProductsInCartController );

// Update a cart by item quantity
router.put('/update/:itemId', verifyToken, updateCartItemController);

// Empty a cart
router.delete('/empty/:cartId', verifyToken, emptyCartController);

// Remove item from cart
router.delete('/removeProduct/:itemId', verifyToken, removeItemController);

// Get total amount
router.get('/totalAmount/:cartId', verifyToken, getTotalAmountController);

// Save for later
router.get('/saveForLater/:itemId', verifyToken, saveForLaterController);

// Get saved item
router.get('/getSaved/:cartId', verifyToken, getsavedItemController);

module.exports = router;