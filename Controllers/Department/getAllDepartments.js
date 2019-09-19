const pool = require('../../database');

module.exports = (req, res) => {
    pool.getConnection((error, connection) => {
        if (error) {
            return res.status(503).send({
                status: '99',
                responseMessage: 'Error establishing database connection'
            })
        }
        const sql = `CALL catalog_get_departments`
        connection.query(sql, (error, response) => {
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