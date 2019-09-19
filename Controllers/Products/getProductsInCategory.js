const pool = require('../../database');

module.exports = (req, res) => {
    const { category_id } = req.params;
    const { page, limit, descriptionLength } = req.body;
    if ( !category_id || page === undefined || !limit || !descriptionLength ) {
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
        const sql = `CALL catalog_get_products_in_category (?,?,?,?)`;

        connection.query(sql, [category_id, descriptionLength, limit, page], (error, response) => {
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