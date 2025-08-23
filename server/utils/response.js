function responseObject(res, { success = true, status = 200, message = '', data = null, error = null }) {
  return res.status(status).json({
    success,
    status,
    message,
    data,
    error,
    timestamp: new Date().toISOString(),
  });
}

module.exports = responseObject;
