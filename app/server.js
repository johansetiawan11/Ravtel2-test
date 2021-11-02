// External dependencies
const bcrypt = require("bcryptjs");
const cors = require("cors");
const express = require("express");
const expressOpenapiValidator = require("express-openapi-validator");
const jwt = require("jsonwebtoken");
const Knex = require("knex");
const objection = require("objection");
const swaggerJsdocFcomposer = require("swagger-jsdoc");
const swaggerUiExpress = require("swagger-ui-express");

// Internal dependencies
const authHandlerFcomposerHash = require("./auth/handler");
const dataMock = require("./lib/dataMock");
const handlerFcomposerHash = require("./handler");
const knexSetup = require("./db/knexSetup");
const dbModelHashComposer = require("./db/index");
const routerFcomposer = require("./router");

// App registration
const app = express();
app.use(cors());
app.use(express.urlencoded({ extended: true }));
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
  apis: [
    "./app/router/*.js",
    "./app/router/**/*.js",
  ],
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
  APP_ENV: process.env.APP_ENV,
  GENERIC_JOB_API_KEY: process.env.GENERIC_JOB_API_KEY,
};
const knexAgent = Knex(knexSetup[env.APP_ENV]);

const diHash = {
  app,
  authHandlerFcomposerHash,
  bcrypt,
  dataMock,
  env,
  express,
  handlerFcomposerHash,
  jwt,
  knexAgent,
  Knex,
  objection,
};

const dbModelHash = dbModelHashComposer(diHash);
diHash.dbModelHash = dbModelHash;

const router = routerFcomposer(diHash);
app.use("/v1", router);

// Error handler registration
app.use((err, req, res, next) => {
  console.error(err);

  res.status(err.status || 500).json({
    message: err.message,
  });
});

module.exports = app;
