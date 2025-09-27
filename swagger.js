// ============================
// Swagger Setup (swagger.js)
// ============================

// Use ES module imports
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

// ============================
// Swagger Options Configuration
// ============================
const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "My API Docs",
      version: "1.0.0",
      description: "API documentation for my Express app",
    },
    servers: [
      {
        url: "https://job-finder-app-backend-7m5k.onrender.com/api",
        description: "Production server (Render)",
      },
      {
        url: "http://localhost:5000/api",
        description: "Local development server",
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
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ["./routes/*.js"],
};

// Generate Swagger specification
const swaggerSpec = swaggerJsdoc(options);

// Export default function for ES module import
export default function swaggerDocs(app) {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  console.log("Swagger docs available at https://job-finder-app-backend-7m5k.onrender.com/api-docs");
}