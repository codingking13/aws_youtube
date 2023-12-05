mysql = require('mysql');

const db = mysql.createPool({
            host: 'spring-deply-test.c9ipefc4bbbj.us-east-1.rds.amazonaws.com',
            port: '3306',
            user: 'adminsus',
            password: 'adminsus',
            database: 'spring_deploy_test'


});

module.exports = db;