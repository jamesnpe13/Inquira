const responseObject = require('../utils/response');

function errorHandler(err, req, res, next) {
  console.error('>>>> Error Handler <<<<:', err);
  const statusCode = err.status || 500;

  responseObject(res, {
    success: false,
    status: statusCode,
    message: err.message,
    error: err,
  });

  // res.status(statusCode).json({
  //   error: {
  //     statusCode: statusCode,
  //     message: err.message,
  //     error: err,
  //   },
  // });
}

module.exports = { errorHandler };
