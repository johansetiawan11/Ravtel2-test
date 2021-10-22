const dbTableName = require("../../const/dbTableName");

const localDbTableName = dbTableName.ACCOUNT_BANK;
const accountDbTableName = dbTableName.ACCOUNT;

exports.up = async (knex) => {
  await knex.raw(`
    create table ${localDbTableName} (
      id              SERIAL PRIMARY KEY,

      account_id      INT NOT NULL REFERENCES ${accountDbTableName}(id),

      bank_name       TEXT NOT NULL,
      bank_branch     TEXT NOT NULL,
      swift_code      TEXT NOT NULL,
      currency        currency NOT NULL,
      account_name    TEXT NOT NULL,
      account_number  TEXT NOT NULL,
      is_primary      BOOLEAN DEFAULT FALSE,

      created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      created_by      TEXT NOT NULL DEFAULT '',
      updated_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      updated_by      TEXT NOT NULL DEFAULT '',
      deleted_at      TIMESTAMPTZ NULL,
      deleted_by      TEXT NULL,
      metadata        JSONB NULL
    );
  `);
  console.log(`+++ '${localDbTableName}' table created.`);
};

exports.down = async (knex) => {
  await knex.schema.dropTable(localDbTableName);
  console.log(`--- '${localDbTableName}' table dropped.`);
};
