const dbTableName = require("../../const/dbTableName");

const localDbTableName = dbTableName.NAV;
const productDbTableName = dbTableName.PRODUCT;

exports.up = async (knex) => {
  await knex.raw(`
    CREATE TABLE ${localDbTableName} (
      id          BIGSERIAL PRIMARY KEY,

      product_id  INT NOT NULL REFERENCES ${productDbTableName}(id),
      nav_date    TIMESTAMPTZ NOT NULL,
      nlv         NUMERIC(32,12) NOT NULL,
      total_unit  NUMERIC(32,12) NOT NULL,
      nav_price   NUMERIC(32,12) NOT NULL,
      change      NUMERIC(32,12) NOT NULL,
      ytd_return  NUMERIC(32,12) NOT NULL,

      created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      created_by  TEXT NOT NULL DEFAULT '',
      updated_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      updated_by  TEXT NOT NULL DEFAULT '',
      deleted_at  TIMESTAMPTZ NULL,
      deleted_by  TEXT NULL,
      metadata    JSONB NULL
    );
  `);
  console.log(`+++ '${localDbTableName}' table created.`);
};

exports.down = async (knex) => {
  await knex.schema.dropTable(localDbTableName);
  console.log(`--- '${localDbTableName}' table dropped.`);
};
