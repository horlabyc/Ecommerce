const pool = require('../../database');

module.exports = (req, res) => {
    const { department_id } = req.params;
    const { page, limit, descriptionLength } = req.body;
    if ( department_id === undefined || page === undefined || !limit || !descriptionLength ) {
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
        const sql = `CALL catalog_get_products_on_department (?,?,?,?)`;

        connection.query(sql, [department_id, descriptionLength, limit, page], (error, response) => {
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