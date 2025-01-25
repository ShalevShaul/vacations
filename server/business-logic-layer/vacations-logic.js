const dal = require('../data-access-layer/dal');

function getAllVacationsAsync() {
    return dal.executeQueryAsync(`
        SELECT * FROM vacations
    `);
}

function getAllFollowersAsync() {
    return dal.executeQueryAsync(`
        SELECT * FROM followers
    `);
}

function deleteVacationAsync(vacation_id) {
    return dal.executeQueryAsync(`
        DELETE FROM vacations
        WHERE vacation_id = ${vacation_id}    
    `);
}

function editVacationAsync(vacation_id, destination, description, start_time, end_time, price) {
    return dal.executeQueryAsync(`
        UPDATE vacations SET
        destination = '${destination}',
        description = '${description}',
        start_time = '${start_time}',
        end_time = '${end_time}',
        price = ${price}
        WHERE vacation_id = ${vacation_id}
    `);
}

function editVacationWithImageAsync(vacation_id, destination, description, start_time, end_time, price, image) {
    return dal.executeQueryAsync(`
        UPDATE vacations SET
        destination = '${destination}',
        description = '${description}',
        start_time = '${start_time}',
        end_time = '${end_time}',
        price = ${price},
        image = '${image}'
        WHERE vacation_id = ${vacation_id}
    `);
}

function insertVacationAsync(destination, description, start_time, end_time, price, image) {
    return dal.executeQueryAsync(`
        INSERT INTO vacations VALUES
        (DEFAULT,
        '${destination}',
        '${description}',
        '${start_time}',     
        '${end_time}',     
        ${price},
        '${image}')
    `);
}

function getImageByVacationId(vacation_id) {
    return dal.executeQueryAsync(`
        SELECT image FROM vacations
        WHERE vacation_id = ${vacation_id}
    `)
}

module.exports = {
    getAllVacationsAsync,
    getAllFollowersAsync,
    deleteVacationAsync,
    editVacationAsync,
    editVacationWithImageAsync,
    insertVacationAsync,
    getImageByVacationId
}