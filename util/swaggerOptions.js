module.exports = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API-KEY-TRACKER",
      version: "1.0.0",
      description: "An API for tracking requests",
    },
    servers: [
      {
        url: "http://localhost:8081",
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

  apis: ["./routes/*.js"],
};
