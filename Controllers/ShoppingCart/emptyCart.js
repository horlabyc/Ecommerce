const pool = require('../../database');

module.exports = (req, res) => {
    const { cartId } = req.params;
    const token = req.header('auth-token');
    const customerId = retrieveIdFromToken(token);
    if (!cartId || !customerId) {
        return res.status(400).send({
            code: '01',
            message: 'Invalid request body'
        })
    }
    pool.getConnection( (error, connection) => {
        if (error) {
            return res.status(503).send({
                status: '99',
                responseMessage: 'Error establishing database connection'
            })
        }

        const sql = `CALL shopping_cart_empty (?,?)`;
        connection.query(sql, [cartId, customerId], (error, response) => {
            connection.release();
            if (error) {
                return res.send({
                    status: '99',
                    message: 'Error fetching data'
                })
            }
            if (response['affectedRows'] > 0) {
                res.status(200).send({
                    status: '00',
                    data: [],
                    message: 'Cart deleted successfully'
                })
            } else {
                res.status(200).send({
                    status: '01',
                    message: 'Customer has no functional cart'
                })
            }
             
            
        })
    })
}