// External dependencies
const awsSdk = require("aws-sdk");
const bcrypt = require("bcryptjs");
const cors = require("cors");
const csvtojson = require("csvtojson");
const express = require("express");
const expressOpenapiValidator = require("express-openapi-validator");
const fs = require("fs-extra");
const jwt = require("jsonwebtoken");
const Knex = require("knex");
const objection = require("objection");
const path = require("path");
const Promise = require("bluebird");
const swaggerJsdocFcomposer = require("swagger-jsdoc");
const swaggerUiExpress = require("swagger-ui-express");

// Internal dependencies
const aclAdminCommon = require("./auth/aclAdminCommon");
const attachmentFsCommon = require("./lib/attachmentFsCommon");
const authHandlerFcomposerHash = require("./auth/handler");
const dataMock = require("./lib/dataMock");
// const devlabAuxComposer = require("./lib/devlabAux");
const handlerFcomposerHash = require("./handler");
const knexSetup = require("./db/knexSetup");
const dbModelHashComposer = require("./db/index");
const routerFcomposer = require("./router");
const sqlCommon = require("./lib/sqlCommon");

// App registration
// ----------------
const env = {
  APP_ENV: process.env.APP_ENV,
  APP_VERSION: process.env.APP_VERSION,
  GENERIC_JOB_API_KEY: process.env.GENERIC_JOB_API_KEY,

  AWS_S3_REGION: process.env.AWS_S3_REGION,
  AWS_S3_BUCKET: process.env.AWS_S3_BUCKET,
  AWS_S3_ROOT_DIR: process.env.AWS_S3_ROOT_DIR,
};

const app = express();
// ----------------

// ----------------------
// Middleware composition
/**
 * NOTE: Only compose the middlewares here without registering them into the app.
 * Middleware registrations will be done at router-level to make them more customizable.
 */
const middlewareHash = {};

const corsMiddleware = cors();
middlewareHash.corsMiddleware = corsMiddleware;

const expressUrlencodedMiddleware = express.urlencoded({ extended: true });
middlewareHash.expressUrlencodedMiddleware = expressUrlencodedMiddleware;

const expressJsonMiddleware = express.json();
middlewareHash.expressJsonMiddleware = expressJsonMiddleware;
// ----------------------

// --------------------
// Swagger registration
const swaggerJsdocOptionHash = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "ravtel-api",
      version: env.APP_VERSION,
    },
    servers: [
      { url: "/v1" },
    ],
  },
  apis: [
    // "./app/lib/*.js",
    "./app/router/*.js",
    "./app/router/**/*.js",
  ],
};
const swaggerJsdoc = swaggerJsdocFcomposer(swaggerJsdocOptionHash);

const expressOpenapiValidatorMiddleware = expressOpenapiValidator.middleware({
  apiSpec: swaggerJsdoc,
  validateRequests: true,
});
middlewareHash.expressOpenapiValidatorMiddleware = expressOpenapiValidatorMiddleware;

const standardMiddlewareList = [
  corsMiddleware,
  expressUrlencodedMiddleware,
  expressJsonMiddleware,
  expressOpenapiValidatorMiddleware,
];
middlewareHash.standardMiddlewareList = standardMiddlewareList;

const swaggerUiExpressOptionHash = {
  swaggerOptions: {
    operationsSorter: "alpha",
    tagsSorter: "alpha",
  },
};
app.use("/documentation", swaggerUiExpress.serve, swaggerUiExpress.setup(swaggerJsdoc, swaggerUiExpressOptionHash));
// --------------------

// -------------------
// Router registration
const knexAgent = Knex(knexSetup[env.APP_ENV]);

const diHash = {
  app,
  attachmentFsCommon,
  authHandlerFcomposerHash,
  awsSdk,
  bcrypt,
  csvtojson,
  dataMock,
  env,
  express,
  fs,
  handlerFcomposerHash,
  jwt,
  knexAgent,
  Knex,
  middlewareHash,
  objection,
  path,
  Promise,
  sqlCommon,
};

const aclAdminCommonAdapter = new aclAdminCommon.Adapter();
diHash.aclAdminCommonAdapter = aclAdminCommonAdapter;

const attachmentFsCommonAdapter = new attachmentFsCommon.Adapter(diHash);
diHash.attachmentFsCommonAdapter = attachmentFsCommonAdapter;

const dbModelHash = dbModelHashComposer(diHash);
diHash.dbModelHash = dbModelHash;

attachmentFsCommonAdapter.resetDiReferenceBatch(diHash);
attachmentFsCommonAdapter.resetVarBatch();

const router = routerFcomposer(diHash);
app.use("/v1", router);

// const devlabAux = devlabAuxComposer(diHash);
// app.use("/v1", devlabAux.devlabAuxRouter); // NOTE: Comment out this experimental route by default
// -------------------

// Error handler registration
// --------------------------
app.use((err, req, res, next) => {
  console.error(err);

  res.status(err.status || 500).json({
    message: err.message,
  });
});
// --------------------------

module.exports = app;
