function errorHandler(error, req, res, next) {
  const status = error.status || 500;

  if (status >= 500) {
    console.error(error);
  }

  return res.status(status).json({
    message:
      status >= 500
        ? "Internal server error"
        : error.message
  });
}

module.exports = errorHandler;
