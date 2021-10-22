const dbTableName = require("../../const/dbTableName");

const localDbTableName = dbTableName.INVESTMENT_ACTIVITY;
const investmentDbTableName = dbTableName.INVESTMENT;

exports.up = async (knex) => {
  await knex.raw(`
    CREATE TABLE ${localDbTableName} (
      id               BIGSERIAL PRIMARY KEY,

      investment_id    INT NOT NULL REFERENCES ${investmentDbTableName}(id),
      activity_type    activity_type NOT NULL,

      unit_amount      NUMERIC(32,12) NOT NULL,
      hwm              NUMERIC(32,12) NOT NULL,

      currency         currency NOT NULL,
      currency_amount  NUMERIC(32,12) NOT NULL,

      description      TEXT NOT NULL DEFAULT '',

      created_at       TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      created_by       TEXT NOT NULL DEFAULT '',
      updated_at       TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      updated_by       TEXT NOT NULL DEFAULT '',
      deleted_at       TIMESTAMPTZ NULL,
      deleted_by       TEXT NULL,
      metadata         JSONB NULL
    );
  `);
  console.log(`+++ '${localDbTableName}' table created.`);
};

exports.down = async (knex) => {
  await knex.schema.dropTable(localDbTableName);
  console.log(`--- '${localDbTableName}' table dropped.`);
};
