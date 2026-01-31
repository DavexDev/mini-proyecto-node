// src/middlewares/errorHandler.js
export default (err, req, res, next) => {
  console.error(err);

  const statusCode = err.status || 500;

  res.status(statusCode).json({
    error: err.code || 'INTERNAL_SERVER_ERROR',
    message: err.message || 'Unexpected error'
  });
};

