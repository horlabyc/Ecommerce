const { registerValidation } = require('../../Utilities/validation');
const pool= require('../../database');
const hashData = require('../../Utilities/cipher');
const jwt = require('jsonwebtoken');

module.exports = async (req, res) => {
    const { error } = registerValidation(req.body);
    if(error) 
        return res.status(400).send({
            status: '01',
            errorMessage: error.details[0].message
        })
         pool.getConnection( async (err, connection) => {
            if (err) {
                return res.status(503).send({
                    status: '99',
                    responseMessage: 'Error establishing database connection'
                })
            } else {
                const sql = `CALL customer_add  (?,?,?)`
                const payload = [
                    req.body.name,
                    req.body.email,
                    await hashData.hashData(req.body.password)
                ];
                connection.query(sql, payload, (err, result) => {
                    connection.release();
                    if(err) {
                        if (err.code === 'ER_DUP_ENTRY') {
                            res.status(400).send({
                                status: '01',
                                message: 'User already exist'
                            })
                        }else {
                            res.status(400).send({
                                status: '01',
                                message: 'Invalid Request'
                            })
                        }
                        return
                    }
                    if (result[0][0]["LAST_INSERT_ID()"] > 0) {
                        const token = jwt.sign( 
                            { 
                                id: result[0][0]["LAST_INSERT_ID()"], 
                                email:  req.body.email
                            }, 
                            process.env.SECRET_KEY,
                            { expiresIn : '24h'}
                        );
                        res.status(201).send({
                            status: '00',
                            data: {
                                customer_id: result[0][0]["LAST_INSERT_ID()"],
                                username: req.body.name,
                                email: req.body.email
                            },
                            accessToken: `Bearer ${token}`,
                            message: 'User created succesfully'
                        })
                    } else {
                        res.status(400).send({
                            status: '01',
                            message: 'User not registered'
                        })
                    }                       
                   
                })
            }
        })
}