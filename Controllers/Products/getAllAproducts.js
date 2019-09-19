const pool = require('../../database');

module.exports = (req, res) => {
    const { page, limit, descriptionLength } = req.body;
    if ( page === undefined  || !limit || !descriptionLength) {
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
        const sql = `CALL catalog_get_products (?,?,?)`
        const queryTogetTotalNumberOfProduct = `SELECT COUNT(*) FROM ecommerce.product`;
        let productCount = 0;
        connection.query(queryTogetTotalNumberOfProduct, (error, response) => {
            if (error) {
                return res.send({
                    status: '99',
                    message: 'Error fetching data'
                })
            }
            productCount = response[0]['COUNT(*)'];
        })
        connection.query(sql , [(page-1) * limit, limit, descriptionLength] ,(error, response) => {
            connection.release();
            if (error) {
                res.send({
                    status: '01',
                    message: 'Error fetching data'
                })
            } else {
                res.send({
                    status: '00',
                    paginationMeta: {
                        currentPage: page ,
                        currentPageSize: limit,
                        totalPages: Math.ceil(productCount / limit),
                        totalRecords: productCount
                    },
                    rows: response[0]
                })
            }
        })
    })
}