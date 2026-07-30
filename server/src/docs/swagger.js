const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Zolvex Deep Clean API Documentation",
      version: "1.0.0",
      description: "Enterprise REST API for Zolvex Deep Clean Home Services with JWT Auth & MongoDB"
    },
    servers: [
      {
        url: "http://localhost:5000/api/v1",
        description: "Development Server (v1)"
      }
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT"
        }
      }
    }
  },
  apis: []
};

const swaggerSpec = swaggerJsdoc(options);

function setupSwagger(app) {
  app.use("/api/v1/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  app.get("/api/v1/docs.json", (req, res) => {
    res.setHeader("Content-Type", "application/json");
    res.send(swaggerSpec);
  });
}

module.exports = setupSwagger;
