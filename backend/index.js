require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const authController = require('./controllers/auth-controller');
const vacationsController = require('./controllers/vacations-controller');
const followersController = require('./controllers/followers-controller');
const PORT = process.env.PORT || 4000;

const app = express();
app.use(cors({
    origin: process.env.FRONTEND_URL || '*',
    credentials: true
}));
app.use(express.json());
app.use('/images', express.static(path.join(__dirname, 'images')));


app.use('/auth', authController);
app.use('/vacations', vacationsController);
app.use('/followers', followersController);

app.use('*', (req, res) => {
    res.status(404).send(`Route NOT found ${req.originalUrl}`);
});

app.listen(PORT, () => {
    console.log(`Listening to ${PORT}!`);
}).on('error', (err) => {
    console.log(err);
    if (err.code === 'EADDRINUSE')
        console.log('ERROR: Adress in use');
    else
        console.log('ERROR: Unknown error');
});