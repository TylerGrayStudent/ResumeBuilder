const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "BunExpress API",
      version: "1.0.0",
    },
  },
  apis: ["./notes/**/*.ts"], // Path to the API docs
};

const swaggerSpec = swaggerJsdoc(options);

import type { Express } from "express";

export const setupSwagger = (app: Express) => {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};

