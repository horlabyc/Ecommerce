const pool = require('../../database');
const retrieveIdFromToken = require('../../Utilities/retrieveIdFromToken');


module.exports = (req, res) => {
    const { cartId, shippingId, taxId } = req.body;
    const customerId = retrieveIdFromToken(token);

    if(!customerId) {
        return res.status(400).send({
            code: '01',
            message: 'Customer I.d is missing'
        })
    }

    if (!cartId || !shippingId || !taxId) {
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

        const sql = `CALL shopping_cart_create_order (?,?,?,?)`;
        connection.query(sql, [customerId,cartId, shippingId, taxId], (error, response) => {
            if (error) {
                return res.status(503).send({
                    status: '99',
                    responseMessage: 'Error establishing database connection'
                })
            }
            res.status(200).send({
                response: response
            })
        })
    })
}