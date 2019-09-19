const pool = require('../../database');

module.exports = (req, res) => {
    const { itemId } = req.params;
    if (!itemId) {
        return res.status(400).send({
            code: '01',
            message: 'Item Id is missing'
        })
    }

    const sql = `CALL shopping_cart_save_product_for_later (?)`;
    pool.getConnection( (error, connection) => {
        if (error) {
            return res.status(503).send({
                status: '99',
                responseMessage: 'Error establishing database connection'
            })
        }

        connection.query(sql, [itemId], (error, response) => {
            connection.release();
            if (error) {
                return res.send({
                    status: '99',
                    message: 'Error fetching data'
                })
            }
            if (response['affectedRows'] > 0) {
                res.status(200).send({
                    status: '00',
                    message: 'Item added to save for later successfully'
                })
            }else {
                res.send({
                    status: '01',
                    message: 'Item not added to save for later'
                })
            }
        })
    })
}