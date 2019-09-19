const jwt = require('jsonwebtoken');
const pool = require('../../database');
const { loginValidation } = require('../../Utilities/validation');
const { verifyHash } = require('../../Utilities/cipher');

module.exports = (req, res) => {
    const { email, password } = req.body;
    const { error } = loginValidation(req.body);
    if(error) 
    return res.status(400).send({
        status: '01',
        errorMessage: error.details[0].message
    })
    // Connect to db
    pool.getConnection( async (error, connection) => {
        if (error) {
            return res.status(503).send({
                status: '99',
                responseMessage: 'Error establishing database connection'
            })
        }
    const sql = `CALL customer_get_login_info (?)`
    const sql2 = `SELECT name FROM ecommerce.customer where email = '${email}' `;
    let name;
    connection.query(sql2, (error, response) => {
        if (error) {
            return res.send({
                status: '99',
                message: 'Error fetching data'
            })
        }
      name = response[0].name;
    })
    connection.query(sql, [email], async (err, response) => {
        connection.release();
        if (error) {
            return res.send({
                status: '99',
                message: 'Error fetching data'
            })
        }
        if(Object.keys(response[0]).length > 0) {
          const isPasswordCorrect = await verifyHash(password, response[0][0].password);
          if(isPasswordCorrect) {
            const token = jwt.sign( 
                {id: response[0][0].customer_id, email: email}, 
                process.env.SECRET_KEY,
                { expiresIn : '24h'}
            );
            res.json({
                statusCode: '00',
                customer: {
                    customer_id: response[0][0].customer_id,
                    name: name,
                    email: email, 
                    address_1: null,
                    address_2: null,
                    city: null,
                    region: null,
                    postal_code: null,
                    credit_card : null,
                    day_phone : null,
                    eve_phone : null,
                    mob_phone : null,                            
                 },
                    accessToken: `Bearer ${token}`,
                    expiresIn: '24h'              
            })
          } else {
            res.send({
                status: '01',
                responseMessage: 'Invalid Password'
            })
          }
        } else {
            res.send({
                status: '01',
                responseMessage: 'User does not exist'
            })
        }
    })
    })
}