const { updateAddressValidation } = require('../../Utilities/validation');
const pool = require('../../database');

module.exports = (req, res) => {
    const { customerId, address1, address2, city, region, postalCode, country, shippingRegionId } = req.body;
    const { error } = updateAddressValidation(req.body);
    if(error) {
        return res.status(400).send({
            status: '01',
            errorMessage: error.details[0].message
        })
    }

    pool.getConnection( (error, connection) => {
        if (error) {
            return res.status(503).send({
                status: '99',
                responseMessage: 'Error establishing database connection'
            })
        }
        const sql = `CALL customer_update_address (?,?,?,?,?,?,?,?)`
        const queryParams = [
            customerId, address1, address2, city, region, postalCode, country, shippingRegionId
        ]
        connection.query(sql, queryParams, (error, response) =>{
            connection.release();
            if (error) {
                res.send({
                    status: '01',
                    message: 'Address update not successful'
                })
                return;
            }
            if(response['affectedRows'] > 0) {
                res.send({
                   status: '00',
                   message: 'Address update successful'
               })
           }    
        } )
    })
}