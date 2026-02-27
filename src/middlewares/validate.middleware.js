const globalValidationMiddleware = (req, res, next) => {
  const method = req.method.toUpperCase();
  const methodsWithBody = ["POST", "PUT", "PATCH"];

  if (methodsWithBody.includes(method) && req.body !== undefined) {
    if (Array.isArray(req.body) || typeof req.body !== "object" || req.body === null) {
      return res.status(400).json({
        message: "Request body must be a valid JSON object",
      });
    }
  }

  return next();
};

module.exports = globalValidationMiddleware;

