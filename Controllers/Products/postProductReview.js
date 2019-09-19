const pool = require('../../database');

module.exports = (req, res) => {
    const { product_id } = req.params;
    const { customerId, review, rating } = req.body;
    console.log(product_id, customerId, review, rating);
    if (!product_id || !customerId || !review || !rating) {
        return res.status(400).send({
            status: '01',
            errorMessage: 'Invalid request body'
        });
    }

    pool.getConnection( (error, connection) => {
        if (error) {
            return res.status(503).send({
                status: '99',
                responseMessage: 'Error establishing database connection'
            })
        }
        const sql = `CALL catalog_create_product_review (?,?,?,?)`
        connection.query(sql, [customerId, product_id, review, rating ], (error, response) => {
            connection.release();
            if (error) {
                res.send({
                    status: '01',
                    message: 'Error fetching data'
                })
            } else if (response['affectedRows'] > 0){
                res.send({
                    status: '00',
                    mesage: 'Review added successfully'
                })
            }
        })
    })
}