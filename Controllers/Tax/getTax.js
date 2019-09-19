const pool = require('../../database');

module.exports = (req, res) => {
    const { taxId } = req.params;
    if(!taxId) {
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
        const sql = `CALL tax_get_tax (?)`
        connection.query(sql, [taxId], (error, response) => {
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