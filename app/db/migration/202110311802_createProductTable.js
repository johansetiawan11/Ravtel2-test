const dbTableName = require("../../const/dbTableName");

const localDbTableName = dbTableName.PRODUCT;

exports.up = async (knex) => {
  await knex.raw(`
    CREATE TABLE ${localDbTableName} (
      id                   SERIAL PRIMARY KEY,

      product_name         TEXT NOT NULL DEFAULT '',
      product_description  TEXT NOT NULL DEFAULT '',
      performance_fee      NUMERIC(32,12) NOT NULL DEFAULT 20,
      penalty_fee          NUMERIC(32,12) NOT NULL DEFAULT 10,

      created_at           TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      created_by           TEXT NOT NULL DEFAULT '',
      updated_at           TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      updated_by           TEXT NOT NULL DEFAULT '',
      deleted_at           TIMESTAMPTZ NULL,
      deleted_by           TEXT NULL,
      metadata             JSONB NULL
    );
    CREATE UNIQUE INDEX product_name ON ${localDbTableName}(product_name) WHERE deleted_at IS NULL;
  `);
  console.log(`+++ '${localDbTableName}' table created.`);
};

exports.down = async (knex) => {
  await knex.schema.dropTable(localDbTableName);
  console.log(`--- '${localDbTableName}' table dropped.`);
};
