const dbTableName = require("../../const/dbTableName");

const localDbTableName = dbTableName.INVESTMENT;
const accountDbTableName = dbTableName.ACCOUNT;
const productDbTableName = dbTableName.PRODUCT;

exports.up = async (knex) => {
  await knex.raw(`
    CREATE TABLE ${localDbTableName} (
      id                         BIGSERIAL PRIMARY KEY,

      account_id                 INT NOT NULL REFERENCES ${accountDbTableName}(id),
      product_id                 INT NOT NULL REFERENCES ${productDbTableName}(id),

      last_unit_amount           NUMERIC(32,12) NOT NULL,
      hwm                        NUMERIC(32,12) NOT NULL,

      performance_fee_percent    NUMERIC(32,12) NOT NULL,
      penalty_fee_percent        NUMERIC(32,12) NOT NULL,

      investment_date            TIMESTAMPTZ NOT NULL,
      next_performance_fee_date  TIMESTAMPTZ NOT NULL,
      maturity_date              TIMESTAMPTZ NOT NULL,

      created_at                 TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      created_by                 TEXT NOT NULL DEFAULT '',
      updated_at                 TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      updated_by                 TEXT NOT NULL DEFAULT '',
      deleted_at                 TIMESTAMPTZ NULL,
      deleted_by                 TEXT NULL,
      metadata                   JSONB NULL
    );
  `);
  console.log(`+++ '${localDbTableName}' table created.`);
};

exports.down = async (knex) => {
  await knex.schema.dropTable(localDbTableName);
  console.log(`--- '${localDbTableName}' table dropped.`);
};
