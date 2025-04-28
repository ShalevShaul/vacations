const db = require('mysql');

const connection = db.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    database: 'vacations'
});

function executeQueryAsync(sqlCmd) {
    return new Promise((resolve, reject) => {
        connection.query(sqlCmd, (err, result) => {
            if (err) {
                // console.log(err);
                reject(err);
            }
            else {
                // console.log(result);
                resolve(result);
            }
        });
    });
}

module.exports = {
    executeQueryAsync
}