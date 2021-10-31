const dbTableName = require("../../const/dbTableName");

const localDbTableName = dbTableName.LEDGER;
const accountDbTableName = dbTableName.ACCOUNT;

exports.up = async (knex) => {
  await knex.raw(`
    CREATE TABLE ${localDbTableName} (
      id                BIGSERIAL PRIMARY KEY,

      account_id        INT NOT NULL REFERENCES ${accountDbTableName}(id),
      event_code        TEXT NOT NULL DEFAULT '',

      transaction_date  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      debit             NUMERIC(32,12) NOT NULL,
      credit            NUMERIC(32,12) NOT NULL,
      balance           NUMERIC(32,12) NOT NULL,
      info              TEXT NOT NULL,

      reference_table   reference_table NULL,
      reference_id      INT NULL,

      created_at        TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      created_by        TEXT NOT NULL DEFAULT '',
      updated_at        TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      updated_by        TEXT NOT NULL DEFAULT '',
      deleted_at        TIMESTAMPTZ NULL,
      deleted_by        TEXT NULL,
      metadata          JSONB null
    );
  `);
  console.log(`+++ '${localDbTableName}' table created.`);
};

exports.down = async (knex) => {
  await knex.schema.dropTable(localDbTableName);
  console.log(`--- '${localDbTableName}' table dropped.`);
};
