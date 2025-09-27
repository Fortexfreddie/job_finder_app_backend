// ============================
// Swagger Setup (swagger.js)
// ============================

// Import required packages for Swagger
const swaggerJsdoc = require("swagger-jsdoc");       // Generates OpenAPI specification from JSDoc comments
const swaggerUi = require("swagger-ui-express");     // Provides interactive Swagger UI

// ============================
// Swagger Options Configuration
// ============================
const options = {
  definition: {
    openapi: "3.0.0", // OpenAPI version (3.0 is most common for modern APIs)

    info: {
      title: "My API Docs",          // Title displayed in Swagger UI
      version: "1.0.0",              // Version of your API
      description: "API documentation for my Express app", // Short description
    },

    servers: [
      {
        // Change localhost to your deployed Render backend
        url: "https://job-finder-app-backend-7m5k.onrender.com/api",
        description: "Production server (Render)",
      },
      {
        // Keep localhost for local testing if you run `npm run dev`
        url: "http://localhost:5000/api",
        description: "Local development server",
      },
    ],

    // ============================
    // Add JWT Bearer Auth Support
    // ============================
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",        // Security scheme type
          scheme: "bearer",    // Bearer authentication
          bearerFormat: "JWT", // Format of the bearer token
        },
      },
    },

    // Apply security globally (all routes will expect Authorization: Bearer <token>)
    security: [
      {
        bearerAuth: [],
      },
    ],
  },

  // Path to your route files for annotations (e.g., JSDoc comments with @swagger/@openapi)
  apis: ["./routes/*.js"],
};

// Generate Swagger specification from options
const swaggerSpec = swaggerJsdoc(options);

// ============================
// Function to Setup Swagger UI
// ============================
// Call this function in server.js / index.js to mount Swagger docs
export default function swaggerDocs(app) {
  // Route to access Swagger UI (e.g., https://job-finder-app-backend-7m5k.onrender.com/api-docs)
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

  console.log(
    "Swagger docs available at https://job-finder-app-backend-7m5k.onrender.com/api-docs"
  );
}
