const dbTableName = require("../../const/dbTableName");

const localDbTableName = dbTableName.ACCOUNT_ATTACHMENT;
const accountDbTableName = dbTableName.ACCOUNT;

exports.up = async (knex) => {
  await knex.raw(`
    create table ${localDbTableName} (
      id               SERIAL PRIMARY KEY,

      account_id       INT NOT NULL REFERENCES ${accountDbTableName}(id),
      attachment_type  attachment_type NOT NULL,
      s3_url           TEXT NOT NULL,

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
