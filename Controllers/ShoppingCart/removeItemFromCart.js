const pool = require('../../database');
const retrieveIdFromToken = require('../../Utilities/retrieveIdFromToken');


module.exports = (req, res) => {
    const { itemId } = req.params;
    const token = req.header('auth-token');
    const customerId = retrieveIdFromToken(token);
    if (!itemId || !customerId) {
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

        const sql = `CALL shopping_cart_remove_product (?, ?)`;
        connection.query(sql, [itemId, customerId], (error, response) => {
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
                    message: 'Item deleted successfully'
                })
            }else {
                res.send({
                    status: '01',
                    message: 'Item not deleted'
                })
            }
            
        })
    })
}