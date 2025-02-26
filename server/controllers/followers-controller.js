const express = require('express');
const verifyLoggedIn = require('../middleware/verify-logged-in');
const verifyAdmin = require('../middleware/verify-admin');
const followersLogic = require('../business-logic-layer/followers-logic');

const router = express.Router();

// Get all followers
router.get('/followers', verifyLoggedIn, async (request, response) => {
    try {
        const followers = await followersLogic.getAllFollowersAsync();
        response.status(200).send(followers);
    } catch (error) {
        console.log(error);
        response.status(500).send({ message: 'Internal server error' });
    }
});

// Get following vacations by user id
router.get('/following/:user_id', verifyLoggedIn, async (request, response) => {
    const user_id = request.params.user_id;
    try {
        const followingVacations = await followersLogic.getFollowingVacationsByUserId(user_id);
        response.status(200).send(followingVacations);
    } catch (error) {
        console.log(error);
        response.status(500).send({ message: 'Internal server error' });
    }
});

// Get reports (admin-only)
router.post('/reports', [verifyLoggedIn, verifyAdmin], async (request, response) => {
    try {
        const reports = await followersLogic.getReportsAsync();
        response.status(200).send(reports);
    } catch (error) {
        console.log(error);
        response.status(500).send({ message: 'Internal server error' });
    }
});

// Insert new follower
router.post('/insertFollower/:vacation_id/:user_id', verifyLoggedIn, async (request, response) => {
    const { vacation_id, user_id } = request.params;
    try {
        await followersLogic.insertFollowerAsync(vacation_id, user_id);
        response.status(200).send({ message: 'New follower inserted' });
    } catch (error) {
        console.log(error);
        response.status(500).send({ message: 'Internal server error' });
    }
});

// Delete follower
router.delete('/deleteFollower/:vacation_id/:user_id', verifyLoggedIn, async (request, response) => {
    const { vacation_id, user_id } = request.params;
    try {
        await followersLogic.deleteFollowerAsync(vacation_id, user_id);
        response.status(200).send({ message: 'Follower deleted.' });
    } catch (error) {
        console.log(error);
        response.status(500).send({ message: 'Internal server error' });
    }
});

module.exports = router;