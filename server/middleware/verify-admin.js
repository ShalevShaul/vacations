function verifyAdmin(request, response, next) {
    if (request.body && request.body.role === 'admin') {
        next()
    } else {
        return response.status(401).send({ message: 'Unauthorized (admin)' });
    }
}

module.exports = verifyAdmin;
