const errorHandler = (err, req, res, next) => {
  console.error(err.stack);

  // mongoose validation error
  if (err.name === "ValidationError") {
    const errors = Object.values(err.errors).map((e) => e.message);
    return res.status(400).json({ error: "Validation error", details: errors });
  }

  // mongoose duplicate key
  if (err.code === 11000) {
    const field = Object.keys(err.keyValue)[0];
    return res.status(409).json({ error: `${field} already exists` });
  }

  // mongoose bad ObjectId
  if (err.name === "CastError") {
    return res.status(400).json({ error: "Invalid ID format" });
  }

  res.status(err.status || 500).json({
    error: err.message || "Something went wrong",
  });
};

module.exports = errorHandler;
