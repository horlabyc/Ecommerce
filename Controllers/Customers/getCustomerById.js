const retrieveIdFromToken = require('../../Utilities/retrieveIdFromToken');
const pool = require('../../database');


module.exports = (req, res) => {
    const token = req.header('auth-token');
    if(!token) {
        return res.status(400).send({
            code: '01',
            message: 'Customer I.d is missing'
        })
    }
    const customerId = retrieveIdFromToken(token);

    pool.getConnection( (error, connection) => {
        if (error) {
            return res.status(503).send({
                status: '99',
                responseMessage: 'Error establishing database connection'
            })
        }

        const sql = `CALL customer_get_customer (?)`;
        connection.query(sql, [customerId], (error, response) => {
            connection.release();
            if (error) {
                return res.send({
                    status: '01',
                    message: 'Error fetching data'
                })
            }
            res.status(200).json({
                customerInfo: response[0][0]
            })
        })
    })
}