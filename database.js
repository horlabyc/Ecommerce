const mysql = require('mysql');

//Mysql connection
const pool= mysql.createPool({
    host     : 'localhost',
    user     :'root',
    password : 'Control1234:',
    database : 'ecommerce',
    multipleStatements:  true
});

// const createConnection = async () => {
//     let connectionResponse;
//     pool.getConnection( (error, connection) =>{
//         console.log(connection);
//         if(error) {
//             connectionResponse = error;
//         }else {
//             connectionResponse = connection;
//         }
//     })
//     return connectionResponse;
// }



module.exports = pool;