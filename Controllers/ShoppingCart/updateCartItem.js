const pool = require('../../database');


module.exports = (req, res) => {
    const { itemId } = req.params;
    const { quantity, cartId } = req.body;
    if (!itemId || !quantity || !cartId) {
        return res.status(400).send({
            code: '01',
            message: 'Invalid request body'
        })
    }

    pool.getConnection( (error, connection) => {
        if (error) {
            return res.status(503).send({
                status: '99',
                responseMessage: 'Error establishing database connection'
            })
        }

        const sql = `CALL shopping_cart_update (?,?)`;
        const sql2 = `CALL shopping_cart_get_products (?)`;
        connection.query(sql, [itemId,quantity], (error, response) => {
            if (error) {
                console.log(error)
                return res.send({
                    status: '99',
                    message: 'Error fetching data'
                })
            }
            connection.query(sql2, [cartId], (error, response) => {
                connection.release();
                if (error) {
                    return res.send({
                        status: '99',
                        message: 'Error fetching data'
                    });
                }

                res.status(201).send({
                    status: '00',
                    data: response[0]
                })
            })
            
        })
    })

}