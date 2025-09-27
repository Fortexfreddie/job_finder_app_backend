// ============================
// Swagger Setup (swagger.js)
// ============================

// Use ES module imports
import swaggerJsdoc from "swagger-jsdoc";   // Generates OpenAPI specification from JSDoc comments
import swaggerUi from "swagger-ui-express"; // Provides interactive Swagger UI

// ============================
// Swagger Options Configuration
// ============================
const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Job Finder API Docs",          // Matches your app
      version: "1.0.0",
      description: "API documentation for Job Finder backend",
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
        bearerAuth: [], // applied globally; your /auth/login and /auth/signup won't require it automatically
      },
    ],
  },
  // ============================
  // Path to your route files for Swagger annotations
  // ============================
  apis: ["./routes/*.js"],  // your authRoutes.js annotations will be read
};

// Generate Swagger specification
const swaggerSpec = swaggerJsdoc(options);

// ============================
// Export default function to setup Swagger UI
// ============================
export default function swaggerDocs(app) {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  console.log(
    "Swagger docs available at https://job-finder-app-backend-7m5k.onrender.com/api-docs"
  );
}
