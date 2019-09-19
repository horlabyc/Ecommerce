const pool = require('../../database');


module.exports = (req, res) => {
    const { attribute_id } = req.params
    if(!attribute_id) {
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
        const sql = `CALL catalog_get_attribute_values (?)`
        connection.query(sql, [attribute_id], (error, response) => {
            connection.release();
            if (error) {
                res.send({
                    status: '01',
                    message: 'Error fetching data'
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