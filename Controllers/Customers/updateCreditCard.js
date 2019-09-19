const pool = require('../../database');

module.exports = (req, res) => {
    const { creditCard, customerId  } = req.body;
    if(!creditCard || !customerId) {
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
        const sql = `CALL customer_update_credit_card (?,?)`;
        connection.query(sql, [customerId, creditCard ], (error, response) => {
            connection.release();
            if (error) {
                res.send({
                    status: '01',
                    message: 'Card update not successful'
                })
                return;
            }
            if(response['affectedRows'] > 0) {
                res.send({
                   status: '00',
                   message: 'Credit card update successful'
               })
           }     
        })
    })
}