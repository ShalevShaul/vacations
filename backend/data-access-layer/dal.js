const db = require('mysql');

const connection = db.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
    ssl: {
        rejectUnauthorized: true
    }
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