/* eslint-disable import/newline-after-import */
/* eslint-disable no-unneeded-ternary */
require("dotenv").config();

const path = require("path");

// knex
const Knex = require("knex");
const knexSetup = require("../app/db/knexSetup");
const knex = Knex(knexSetup[process.env.APP_ENV]);

// yargs
const yargs = require("yargs/yargs");
const { hideBin } = require("yargs/helpers");
const argv = yargs(hideBin(process.argv)).argv;

const rollbackFlag = argv["rollback-flag"] ? true : false;
const seedFlag = argv["seed-flag"] ? true : false;

async function main() {
  const migrationPath = path.resolve(__dirname, "../app/db/migration");
  const seedPath = path.resolve(__dirname, "../app/db/seed");

  if (seedFlag) {
    await knex.seed.run({
      directory: seedPath,
    });
  } else if (rollbackFlag) {
    await knex.migrate.rollback({
      directory: migrationPath,
    });
  } else {
    await knex.migrate.latest({
      directory: migrationPath,
    });
  }

  await knex.destroy();
}

main();
