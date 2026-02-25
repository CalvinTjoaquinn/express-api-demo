const swaggerJsdoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Express API Demo",
      version: "1.0.0",
      description: "REST API with JWT auth, CRUD operations, and MongoDB",
    },
    servers: [
      {
        url: "https://express-api-demo-gray.vercel.app",
        description: "Production",
      },
      {
        url: "http://localhost:3002",
        description: "Local",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
  },
  apis: ["./src/routes/*.js"],
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;
