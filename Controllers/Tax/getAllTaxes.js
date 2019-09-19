const pool = require('../../database');

module.exports = (req, res) => {
    
    pool.getConnection( (error, connection) => {
        if (error) {
            return res.status(503).send({
                status: '99',
                responseMessage: 'Error establishing database connection'
            })
        }
        
        const sql = `CALL tax_get_taxes`;
        connection.query(sql, (error, response) => {
            connection.release();
            if (error) {
                return res.send({
                    status: '99',
                    message: 'Error fetching data'
                })
            }
            res.send({
                status: '00',
                response: response[0]
            })
        })
    })
}