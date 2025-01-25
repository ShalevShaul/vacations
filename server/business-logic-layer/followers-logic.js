const dal = require('../data-access-layer/dal');

function getAllFollowersAsync() {
    return dal.executeQueryAsync(`
        SELECT * FROM followers
    `);
}

function getFollowingVacationsByUserId(user_id) {
    return dal.executeQueryAsync(`
        SELECT * FROM followers
        WHERE user_id = ${user_id}    
    `);
}

function getReportsAsync() {
    return dal.executeQueryAsync(`
        SELECT v.destination, COUNT(f.user_id) as followers
        FROM vacations AS v 
        INNER JOIN followers f
        ON v.vacation_id = f.vacation_id
        GROUP BY v.vacation_id, v.destination
    `);
}

function insertFollowerAsync(vacation_id, user_id) {
    return dal.executeQueryAsync(`
        INSERT INTO followers VALUES
        (${user_id}, ${vacation_id})
    `);
}

function deleteFollowerAsync(vacation_id, user_id) {
    return dal.executeQueryAsync(`
        DELETE FROM followers WHERE
        vacation_id = ${vacation_id} AND
        user_id = ${user_id}
    `);
}

module.exports = {
    getAllFollowersAsync,
    getFollowingVacationsByUserId,
    getReportsAsync,
    insertFollowerAsync,
    deleteFollowerAsync,
}