const { StatusCodes } = require("http-status-codes");
const AppError = require("../errors/AppError");

const sendSuccessResponse = (
  res,
  data = {},
  message = "Success",
  statusCode = StatusCodes.OK
) => {
  res.status(statusCode).json({
    status: "success",
    message,
    data,
    timestamp: new Date().toISOString(),
  });
};

const sendErrorResponse = (res, err) => {
  let statusCode = 500;
  let status = "fail";
  if (err instanceof AppError) {
    statusCode = err.statusCode;
    status = err.status;
  }
  res.status(statusCode).json({
    status,
    message: err.message || "Something went wrong!",
    data: err.data || {},
  });
};

module.exports = {
  sendSuccessResponse,
  sendErrorResponse,
};
