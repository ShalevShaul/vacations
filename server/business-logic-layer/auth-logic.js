const dal = require('../data-access-layer/dal');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const uuid = require('uuid');

async function loginAsync(credentials) {
    credentials.password = hash(credentials.password);

    const user = await dal.executeQueryAsync(`
        SELECT * FROM users
        WHERE email = '${credentials.email}'
        AND password = '${credentials.password}'
    `);
    if (!user || user.length < 1) return null;

    delete user[0].password;

    user[0].token = jwt.sign({ user: user[0] }, 'HineHahagbahaVeeizeShaarWohoWohoMaAsaHaYeled', { expiresIn: '10m' });
    return user[0];
}

async function checkEmail(email) {
    const isEmail = await dal.executeQueryAsync(`
        SELECT * FROM users WHERE email = '${email}'
    `);
    if (isEmail.length > 0) return 'Email is alredy taken';
    return;
}

async function registerAsync(user) {
    user.password = hash(user.password);

    user.uuid = uuid.v4;

    const sql = `INSERT INTO users VALUES (DEFAULT, '${user.first_name}', '${user.last_name}', '${user.email}', '${user.password}', 'user')`;
    const info = await dal.executeQueryAsync(sql);

    delete user.password;

    user.token = jwt.sign({ user: user[0] }, 'HineHahagbahaVeeizeShaarWohoWohoMaAsaHaYeled', { expiresIn: "10m" });

    return user;
}

function hash(plainText) {
    if (!plainText) return null;

    const salt = 'SoneMatanotIchie';
    return crypto.createHmac("sha512", salt).update(plainText).digest("hex");
}

module.exports = {
    registerAsync,
    loginAsync,
    checkEmail,
}