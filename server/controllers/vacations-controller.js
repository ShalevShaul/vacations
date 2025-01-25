const express = require('express');
const fs = require('fs').promises;
const path = require('path');
const fileUpload = require('express-fileupload');
const verifyLoggedIn = require('../middleware/verify-logged-in');
const verifyAdmin = require('../middleware/verify-admin');
const vacationsLogic = require('../business-logic-layer/vacations-logic');

const router = express.Router();
router.use(fileUpload());

// Get all vacations
router.get('/', verifyLoggedIn, async (request, response) => {
    try {
        const vacations = await vacationsLogic.getAllVacationsAsync();
        response.status(200).send(vacations);
    } catch (error) {
        console.log(error);
        response.status(500).send({ message: 'Internal server error' });
    }
});

// Delete vacation (admin-only)
router.delete('/deleteVacation/:vacation_id', [verifyLoggedIn, verifyAdmin], async (request, response) => {
    try {
        const imageName = await vacationsLogic.getImageByVacationId(request.params.vacation_id);
        if (imageName) {
            const imagePath = path.join(__dirname, '../images', imageName[0].image);    // Get path by image name
            await fs.unlink(imagePath);     // Delete image by imaegPath
        }
        await vacationsLogic.deleteVacationAsync(request.params.vacation_id);
        console.log('Vacation and image has been deleted.');
        response.status(200).send({ message: 'Vacation has been deleted.' });
    } catch (error) {
        console.log(error);
        response.status(500).send({ message: 'Internal server error' });
    }
});

// Edit vacation (admin-only)
router.put('/editVacation/:vacation_id', [verifyLoggedIn, verifyAdmin], async (request, response) => {
    const vacation_id = request.params.vacation_id;
    const { destination, description, start_time, end_time, price } = request.body;

    const errors = {};
    if (price > 10000) errors.highPrice = 'Price is too high';
    if (price < 0) errors.lowPrice = 'Price must be positive';
    if (start_time > end_time) errors.timeError = 'End time can NOT be after start time';

    if (Object.keys(errors).length > 0) {
        return response.status(401).send(errors);
    }

    try {
        const image = request.files?.image;
        if (image) {
            const imageName = image?.name;
            const absolutePath = path.join(__dirname, '..', 'images', imageName);
            await image.mv(absolutePath);
            console.log(`${imageName} --->>> ${absolutePath}`);
            await vacationsLogic.editVacationWithImageAsync(vacation_id, destination, description, start_time, end_time, price, imageName);
        }
        else {
            await vacationsLogic.editVacationAsync(vacation_id, destination, description, start_time, end_time, price);
        }

        response.status(200).send({ message: 'Vacation updated successfully!' });
    } catch (error) {
        console.log(error);
        response.status(500).send({ message: 'Internal server error' });
    }
});

// Add Vacation (admin-only)
router.post('/insertVacation', [verifyLoggedIn, verifyAdmin], async (request, response) => {
    console.log(request.body);
    const { destination, description, start_time, end_time, price } = request.body;

    const errors = {};
    if (price > 10000) errors.highPrice = 'Price is too high';
    if (price < 0) errors.lowPrice = 'Price must be positive';
    if (start_time > end_time) errors.timeError = 'End time can not be after start time';
    if (new Date(start_time) < new Date()) errors.dateError = 'Past date selection not possible';

    if (Object.keys(errors).length > 0) {
        return response.status(401).send(errors);
    }

    try {
        const image = request.files.image;
        const imageName = image.name;
        const absolutePath = path.join(__dirname, '..', 'images', imageName);
        await image.mv(absolutePath);
        console.log(`${imageName} --->>> ${absolutePath}`);

        await vacationsLogic.insertVacationAsync(destination, description, start_time, end_time, price, imageName);
        response.status(201).send({ message: 'Vacation added successfully!' });
    } catch (error) {
        console.log(error);
        response.status(500).send({ message: 'Internal server error' });
    }
});


module.exports = router;