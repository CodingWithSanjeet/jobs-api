const { StatusCodes } = require("http-status-codes");
const { AppError } = require("../errors");


const errHandler = (err, req, res, next) =>{
    let customError ={
        statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
        status: err.status || 'error',
        message: err.message || "Something went wrong! Please try again later.",
        timestamp: new Date().toISOString()
    }
    // if(err instanceof AppError){
    //     return res.status(err.statusCode).json({status: err.status, message: err.message, timestamp: new Date().toISOString()})
    // }
    if(err.code && err.code === 11000){
        customError.message = `Duplicate value entered for ${Object.keys(err.keyValue)} field, please choose another value.`;
        customError.statusCode = StatusCodes.BAD_REQUEST
        customError.status = 'fail'
    }
    if(err.name && err.name === "ValidationError"){
       customError.message = Object.values(err.errors).map(item => item.message).join(", ");
       customError.statusCode = StatusCodes.BAD_REQUEST;
       customError.status = "fail"
    }
    if(err.name && err.name === "CastError"){
        customError.message = `No item found with id : ${err.value}`;
        customError.statusCode = StatusCodes.NOT_FOUND;
        customError.status = 'fail'
    }
    res.status(customError.statusCode).json({
        status:customError.status,
        error: err,
        message: customError.message,
        timestamp: customError.timestamp
    })
}

module.exports = errHandler;