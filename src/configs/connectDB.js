// get the client

import mysql from 'mysql2/promise';

// create the connection to database
// const connection = mysql.createConnection({
//     host: 'localhost',
//     user: 'root',
//     database: 'nodejsbasic'
// });
// const connection = await mysql.createConnection({host:'localhost', user: 'root', database: 'test'});
console.log("Creating connection pool...");

const pool = mysql.createPool({
    host: '103.27.239.251',
    user: 'thangdb',
    database: 'thangdb',
    password: 'thang123'
})


export default pool;

