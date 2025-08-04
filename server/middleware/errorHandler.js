function errorHandler(err, req, res, next) {
  console.error('Error Handler:', err);
  const statusCode = err.status || 500;
  res.status(statusCode).json({
    error: {
      message: err.message,
      statusCode: statusCode,
    },
  });
}

module.exports = { errorHandler };
