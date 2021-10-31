const dbTableName = require("../../const/dbTableName");

const localDbTableName = dbTableName.FUND;
const accountDbTableName = dbTableName.ACCOUNT;

exports.up = async (knex) => {
  await knex.raw(`
    CREATE TABLE ${localDbTableName} (
      id          BIGSERIAL PRIMARY KEY,

      account_id  INT NOT NULL REFERENCES ${accountDbTableName}(id),
      balance     NUMERIC(32,12) NOT NULL,

      created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      created_by  TEXT NOT NULL DEFAULT '',
      updated_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      updated_by  TEXT NOT NULL DEFAULT '',
      deleted_at  TIMESTAMPTZ NULL,
      deleted_by  TEXT NULL,
      metadata    JSONB NULL
    );
    CREATE UNIQUE INDEX fund_account ON ${localDbTableName}(account_id) WHERE deleted_at IS NULL;
  `);
  console.log(`+++ '${localDbTableName}' table created.`);
};

exports.down = async (knex) => {
  await knex.schema.dropTable(localDbTableName);
  console.log(`--- '${localDbTableName}' table dropped.`);
};
