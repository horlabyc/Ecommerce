const pool = require('../../database');

module.exports = (req, res) => {
    const { department_Id } = req.params;
    if(!department_Id) {
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
        const sql = `CALL catalog_get_department_details (?)`
        connection.query(sql, [department_Id], (error, response) => {
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