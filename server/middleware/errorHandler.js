function errorHandler(err, req, res, next) {
  console.error('>>>> Error Handler <<<<:', err);
  const statusCode = err.status || 500;
  res.status(statusCode).json({
    error: {
      statusCode: statusCode,
      message: err.message,
      error: err,
    },
  });
}

module.exports = { errorHandler };
