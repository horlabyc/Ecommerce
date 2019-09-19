const pool = require('../../database');

module.exports = (req, res) => {
    const { product_id } = req.params;
    if ( !product_id ) {
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
        const sql = `CALL catalog_get_product_reviews (?)`;

        connection.query(sql, [product_id], (error, response) => {
            connection.release();
            if (error) {
                return res.send({
                    status: '99',
                    message: 'Error fetching data'
                })
            }
            res.send({
                status: '00',
                rows: response[0]
            })
        })
    })
}