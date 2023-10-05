
const { constants } = require('../constants');
const ErroeHandler = (err, req, res, next) => {
    const statusCode = res.statusCode ? res.statusCode : 500;


    switch (statusCode) {
        case constants.VALIDATION_ERROR:
            res.json({ title: 'validation error', message: err.message, stackTrace: err.stack })
            break;
        case constants.NOT_FOUND:
            res.json({ title: 'Not found', message: err.message, stackTrace: err.stack })
        case constants.UNAUTHORIZED:
            res.json({ title: 'Authorization error', message: err.message, stackTrace: err.stack })
        case constants.FORBIDDEN:
            res.json({ title: 'forbidden error', message: err.message, stackTrace: err.stack })
        case constants.INTERNAL_SERVER_ERROR:
            res.json({ title: 'INTERNAL_SERVER_ERROR', message: err.message, stackTrace: err.stack })
        default:
            console.log("no Error All good!");
            break;
    }


}

module.exports = ErroeHandler