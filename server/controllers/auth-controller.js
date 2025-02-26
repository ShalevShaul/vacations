const express = require('express');
const authLogic = require('../business-logic-layer/auth-logic');
const LoginDetails = require('../model/loginDetails');
const RegisterDetails = require('../model/registerDetails');
const router = express.Router();

// Login
router.post('/login', async (request, response) => {
    try {
        const credentials = new LoginDetails(request.body);

        const errors = credentials.validate();
        if (errors) {
            return response.status(400).send(errors);
        }

        const loggedInUser = await authLogic.loginAsync(credentials);
        if (!loggedInUser) return response.status(401).send({ message: 'Incorrect email or password' });

        response.status(201).send(loggedInUser);
    } catch (error) {
        console.log(error);
        response.status(500).send({ message: 'Internal server error' });
    }
});

// Register
router.post('/register', async (request, response) => {
    try {
        const details = new RegisterDetails(request.body);
        const isEmail = await authLogic.checkEmail(details.email);
        if (isEmail) return response.status(400).send('Email is alredy taken');

        const errors = details.validate();
        if (errors) return response.status(400).send(errors);

        await authLogic.registerAsync(details);

        const credentials = new LoginDetails({ email: details.email, password: request.body.password })
        const loggedInUser = await authLogic.loginAsync(credentials);

        response.status(201).send(loggedInUser);
        console.log(loggedInUser);
    } catch (error) {
        console.log(error);
        response.status(500).send({ message: 'Internal server error' });
    }
});

module.exports = router;