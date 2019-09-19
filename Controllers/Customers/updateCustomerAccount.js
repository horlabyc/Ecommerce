const pool = require('../../database');
const { updateAccountValidation } = require('../../Utilities/validation');
const hashData = require('../../Utilities/cipher');


module.exports = (req, res) => {
    const {customerId, name, email, password, dayPhone, evePhone, mobPhone} = req.body
    const { error } = updateAccountValidation(req.body);
    if(error) {
        return res.status(400).send({
            status: '01',
            errorMessage: error.details[0].message
        })
    }
   
    pool.getConnection( async (error, connection) => {
        if (error) {
            return res.status(503).send({
                status: '99',
                responseMessage: 'Error establishing database connection'
            })
        }
        const sql = `CALL customer_update_account (?,?,?,?,?,?,?)`
        const queryParams = [
            customerId, name, email, await hashData.hashData(password), dayPhone, evePhone, mobPhone
        ]
        connection.query(sql, queryParams, (err, response) => {
            connection.release();
            if (err) {
                res.send({
                    status: '01',
                    message: 'Account update not successful'
                })
                return;
            } 
            if(response['affectedRows'] > 0) {
                 res.send({
                    status: '00',
                    message: 'Account update successful'
                })
            }           
        })
    })
}