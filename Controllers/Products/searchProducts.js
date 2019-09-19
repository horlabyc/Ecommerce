const pool = require('../../database');


module.exports = (req, res) => {
    const { query_string, all_words } = req.query;
    const { descriptionLength, page, limit } = req.body;
    if ( query_string === undefined || all_words.toLowerCase() !== 'on'  && all_words.toLowerCase() !== 'off'  ) {
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
        const sql = `CALL catalog_search (?,?,?,?,?)`;
        connection.query(sql, [query_string, all_words, descriptionLength, limit, page ], (error, response) => {
            connection.release();
            if (error) {
                return res.send({
                    status: '99',
                    message: 'Error fetching data'
                })
            }
            res.send({
                status: '00',
                rows: response[0]
            })
        })
    })

}