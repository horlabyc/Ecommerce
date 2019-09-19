const pool = require('../../database');

module.exports = (req, res) => {
    const { cartId } = req.params;
    if (!cartId) {
        return res.status(400).send({
            code: '01',
            message: 'Cart Id is missing'
        })
    }

    const sql = `CALL shopping_cart_get_total_amount (?)`;
    pool.getConnection( (error, connection) => {
        if (error) {
            return res.status(503).send({
                status: '99',
                responseMessage: 'Error establishing database connection'
            })
        }

        connection.query(sql, [cartId], (error, response) => {
            connection.release();
            if (error) {
                return res.send({
                    status: '99',
                    message: 'Error fetching data'
                })
            }
            res.send({
                status: '00',
                response: response[0]
            })
        })
    })
}