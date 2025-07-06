const { StatusCodes } = require("http-status-codes")

const notFound = (req, res) =>{
    res.status(StatusCodes.NOT_FOUND).json({
        status: 'success',
        message: 'Route doesn\'t exist',
        timestamp: new Date().toISOString()
    })
}

module.exports = notFound;