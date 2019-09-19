const pool = require('../../database');

module.exports = (req, res) => {
    const sql = `CALL customer_get_shipping_regions`
    pool.getConnection( (error, connection) => {
        connection.release();
        if (error) {
            return res.status(503).send({
                status: '99',
                responseMessage: 'Error establishing database connection'
            })
        }

        connection.query(sql, (error, response) => {
            if(error) {
                res.send({
                    status: '01',
                    message: 'Error fetching required content'
                })
            } else {
                res.send({
                    status: '00',
                    data: response[0]
                })
            }
        })
    })
}