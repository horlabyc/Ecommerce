const pool = require('../../database');

module.exports = (req, res) => {
    const { shippingRegionId } = req.params;
    if(!shippingRegionId) {
        return res.status(400).send({
            status: '01',
            errorMessage: 'Invalid request body'
        })
    }

    pool.getConnection((error, connection) => {
        if (error) {
            return res.status(503).send({
                status: '99',
                responseMessage: 'Error establishing database connection'
            })
        }
        const sql = `CALL orders_get_shipping_info (?)`
        connection.query(sql, [shippingRegionId], (error, response) => {
            connection.release();
            if (error) {
                res.send({
                    status: '01',
                    message: 'Error fetching data'
                })
            } else {
                res.send({
                    status: '00',
                    data: response
                })
            }
        })
    })
}