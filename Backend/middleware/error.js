class ErrorHandler extends Error {

    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
    }
}

export const errorMiddleware = (err, req, res, next) => {
    err.message = err.message || 'Internal Server Error';
    // Internal Server Error status code is 500
    err.statusCode = err.statusCode || 500;

    if( err.name === "CastError" ) {
        const message = `Resource not found. Invalid: ${err.path}`;
        err = new ErrorHandler(message, 404);
    }

    return res.status(err.statusCode).json({
        success: false,
        message: err.message,
    })
}

export default ErrorHandler;