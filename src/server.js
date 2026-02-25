require("dotenv").config();
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const swaggerSpec = require("./config/swagger");
const connectDB = require("./config/db");
const errorHandler = require("./middleware/errorHandler");

const authRoutes = require("./routes/auth");
const taskRoutes = require("./routes/tasks");

const app = express();

// middleware
app.use(helmet());
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

// swagger JSON spec
app.get("/api-docs.json", (req, res) => {
  res.json(swaggerSpec);
});

// swagger UI via CDN (works on serverless)
app.get("/docs", (req, res) => {
  res.send(`<!DOCTYPE html>
<html><head>
<title>Express API Demo - Docs</title>
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/swagger-ui-dist@5/swagger-ui.css">
</head><body>
<div id="swagger-ui"></div>
<script src="https://cdn.jsdelivr.net/npm/swagger-ui-dist@5/swagger-ui-bundle.js"></script>
<script>SwaggerUIBundle({ url: "/api-docs.json", dom_id: "#swagger-ui" });</script>
</body></html>`);
});

// routes
app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);

// health check
app.get("/", (req, res) => {
  res.json({ status: "ok", docs: "/docs" });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

// error handler
app.use(errorHandler);

// connect to db once (reused across serverless invocations)
connectDB();

// for local dev
if (process.env.NODE_ENV !== "production") {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`Swagger docs: http://localhost:${PORT}/docs`);
  });
}

module.exports = app;
