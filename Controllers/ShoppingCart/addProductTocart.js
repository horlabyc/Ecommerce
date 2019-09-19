const pool = require('../../database');
const retrieveIdFromToken = require('../../Utilities/retrieveIdFromToken');

module.exports = (req, res) => {
    const token = req.header('auth-token');
    const customerId = retrieveIdFromToken(token);
    const { cartId, productId, attributes } = req.body
    if ( !cartId || !productId || !attributes) {
        return res.status(400).send({
            status: '01',
            errorMessage: 'Invalid request body'
        })
    }

    pool.getConnection( (error, connection) => {
        if (error) {
            return res.status(503).send({
                status: '99',
                responseMessage: 'Error establishing database connection'
            })
        }

        const sql = `CALL shopping_cart_add_product (?,?,?,?)`;
        const sql2 = `CALL shopping_cart_get_products (?)`;

        connection.query(sql, [ cartId, productId, attributes, customerId], (error, response) => {
            if (error) {
                return res.send({
                    status: '99',
                    message: 'Error fetching data'
                })
            }
            if (response.affectedRows > 0) {
                connection.query(sql2, [cartId], (error, response) => {
                    connection.release();
                    if (error) {
                        return res.send({
                            status: '99',
                            message: 'Error fetching data'
                        })
                    }
                    res.status(201).send({
                        status: '00',
                        data: response[0]
                    })
                })
            } else {
                res.send({
                    status: '01',
                    message: `Product couldn't be added to cart`
                })
            }
            
        })
    })
}