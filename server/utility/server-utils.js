require('dotenv').config({ path: require('path').join(__dirname, '../.env') });

function catchNotFoundError(req, res, next) {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
}

function errorHandler(err, req, res, next) {
    let error = {};
    if(process.env.NODE_ENV === 'development') error = err;
    
    res.status(err.status || 500);
    res.json({
        message: err.message,
        error: error,
    });
}


module.exports = {
    catchNotFoundError,
    errorHandler,
}