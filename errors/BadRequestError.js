const { StatusCodes } = require("http-status-codes");
const AppError = require("./AppError");

class BadRequestError extends AppError {
  constructor(message = "Bad Request") {
    super(message, StatusCodes.BAD_REQUEST);
    this.name="BadRequest"
  }
}

module.exports = BadRequestError;
