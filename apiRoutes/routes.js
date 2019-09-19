const router = require('express').Router();
const customerRoutes = require('./customerRoutes');
const departmentRoutes = require('./departmentRoutes');
const categoriesRoutes = require('./categoriesRoutes');
const atrributeRoutes = require('./attributeRoutes');
const productRoutes = require('./productRoutes');
const orderRoutes = require('./orderRoutes');
const shoppingCartRoutes = require('./shoppingCartRoutes');
const verifyToken = require('../Utilities/verifyToken');
const shippingRoutes = require('./shippingRoutes');
const taxRoutes = require('./taxRoutes');

router.get('/', (req, res) => {
    res.send({
        message: 'Welcome to my api'
    })
})

router.use('/customers', customerRoutes);
router.use('/customer', customerRoutes);
router.use('/departments', departmentRoutes);
router.use('/categories', categoriesRoutes);
router.use('/attributes', atrributeRoutes);
router.use('/products', productRoutes);
router.use('/orders', orderRoutes);
router.use('/shoppingcart', shoppingCartRoutes);
router.use('/tax', taxRoutes);
router.use('/shipping', verifyToken, shippingRoutes);

module.exports = router;