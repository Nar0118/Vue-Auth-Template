import swaggerJsdoc from "swagger-jsdoc";

const options: swaggerJsdoc.Options = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "Your API Documentation",
      version: "1.0.0",
      description: "API documentation for Express.js application",
    },
    components: {
      securitySchemes: {
        Bearer: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
        CSRFToken: {
          type: "apiKey",
          in: "header",
          name: "X-CSRF-Token",
        },
      },
    },
    security: [
      {
        Bearer: [],
      },
      {
        CSRFToken: [],
      },
    ],
  },
  apis: ["src/api/**/*.ts"],
};

const swaggerSpec = swaggerJsdoc(options);

export default swaggerSpec;
