const express = require('express');
const app = express();
const dotenv = require('dotenv');
const apiRoutes = require('./apiRoutes/routes');
const pool = require('./database');

// Configure dotenv
dotenv.config();
app.use(express.json())

// Application routes
app.use('/api', apiRoutes)


app.post('/getCategories', (req, res) => {
    pool.getConnection( (err, connection) => {
        if (err) {
            return res.status(503).send({
                status: '99',
                responseMessage: 'Error establishing database connection'
            })
        } else {
            let sql = `CALL catalog_get_categories`
            connection.query(sql, (err, result) => {
                connection.release();
                res.send({
                    data: result
                })
            })
        }
    })
  
})


app.post('/addCustomer', (req, res) => {
    let sql = `CALL customer_add  (?,?,?)`
    const payload = [
        req.body.name,
        req.body.email,
        req.body.password
    ];
    console.log(payload);
    db.query(sql, payload, (err, result) => {
        if (err) {
            throw err;
        }
        res.send({
            data: result
        })
    })
})

app.listen('5000', () => {
    console.log('Server started on port 5000');
})