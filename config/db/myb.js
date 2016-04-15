/**
 * Created by kevin on 15/12/16.
 */
var mysql = require('mysql');
var conn;
var Mysql;
function handleError () {
    conn = mysql.createConnection({
        host: 'rdsf39n5tp6w482946xa.mysql.rds.aliyuncs.com',
        user: 'ecp_test',
        password: 'ecp_test',
        database: 'ecp',
        port: 3306
    });

    //连接错误，2秒重试
    conn.connect(function (err) {
        if (err) {
            console.log('error when connecting to db:', err);
            setTimeout(handleError , 2000);
        }
    });

    conn.on('error', function (err) {
        console.log('db error', err);
        // 如果是连接断开，自动重新连接
        if (err.code === 'PROTOCOL_CONNECTION_LOST') {
            handleError();
        } else {
            throw err;
        }
    });

    Mysql = {
        ecp:conn
    };
}
handleError();

module.exports = Mysql;