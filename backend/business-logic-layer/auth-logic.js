const dal = require('../data-access-layer/dal');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

async function loginAsync(credentials) {
    credentials.password = hash(credentials.password);

    const user = await dal.executeQueryAsync(
        'SELECT * FROM users WHERE email = ? AND password = ?',
        [credentials.email, credentials.password]
    );
    if (!user || user.length < 1) return null;

    delete user[0].password;

    user[0].token = jwt.sign({ user: user[0] }, process.env.JWT_SECRET, { expiresIn: '10m' });
    return user[0];
}

async function checkEmail(email) {
    const isEmail = await dal.executeQueryAsync(
        'SELECT * FROM users WHERE email = ? ',
        [email]
    );
    if (isEmail.length > 0) return 'Email is already taken';
    return;
}

async function registerAsync(user) {
    user.password = hash(user.password);

    const sql = 'INSERT INTO users (first_name, last_name, email, password, role) VALUES (?, ?, ?, ?, ?)';
    const params = [user.first_name, user.last_name, user.email, user.password, 'user'];
    await dal.executeQueryAsync(sql, params);

    delete user.password;

    user.token = jwt.sign({ user }, process.env.JWT_SECRET, { expiresIn: "10m" });

    return user;
}

function hash(plainText) {
    if (!plainText) return null;

    const salt = process.env.SALT_SECRET;
    return crypto.createHmac("sha512", salt).update(plainText).digest("hex");
}

module.exports = {
    registerAsync,
    loginAsync,
    checkEmail,
}