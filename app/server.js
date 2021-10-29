// External dependencies
const bcrypt = require("bcryptjs");
const cors = require("cors");
const express = require("express");
const jwt = require("jsonwebtoken");
const expressOpenapiValidator = require("express-openapi-validator");
const swaggerJsdocFcomposer = require("swagger-jsdoc");
const swaggerUiExpress = require("swagger-ui-express");

// Internal dependencies
const dataMock = require("./lib/dataMock");
const handlerFcomposerHash = require("./handler");
const middlewareFcomposerHash = require("./middleware");
const routerFcomposer = require("./router");

// App registration
const app = express();
app.use(cors());
app.use(express.json());

// Swagger registration
const swaggerJsdocOptionHash = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "ravtel-api",
      version: "1.0.0",
    },
    servers: [
      { url: "/v1" },
    ],
  },
  apis: ["./app/router/**/*.js"],
};
const swaggerJsdoc = swaggerJsdocFcomposer(swaggerJsdocOptionHash);

app.use(expressOpenapiValidator.middleware({
  apiSpec: swaggerJsdoc,
  validateRequests: true,
}));

const swaggerUiExpressOptionHash = {
  swaggerOptions: {
    operationsSorter: "alpha",
    tagsSorter: "alpha",
  },
};
app.use("/documentation", swaggerUiExpress.serve, swaggerUiExpress.setup(swaggerJsdoc, swaggerUiExpressOptionHash));

// Router registration
const env = {
  GENERIC_JOB_API_KEY: process.env.GENERIC_JOB_API_KEY,
  PERFORMANCE_FEE_DEBIT_INVESTOR_ID: process.env.PERFORMANCE_FEE_DEBIT_INVESTOR_ID,
};
const diHash = {
  app,
  bcrypt,
  dataMock,
  env,
  express,
  handlerFcomposerHash,
  jwt,
  middlewareFcomposerHash,
};

const router = routerFcomposer(diHash);
app.use("/v1", router);

module.exports = app;
