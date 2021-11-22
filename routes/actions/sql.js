let mysql = require('mysql');

let connection = mysql.createConnection({
        host: 'localhost',
        port: 3306,
        user: 'root',
        password: '789456123qwe',
        database: 'hw3_1'
});

connection.connect();

module.exports = connection;