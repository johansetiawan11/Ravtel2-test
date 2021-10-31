const dbTableName = require("../../const/dbTableName");

const localDbTableName = dbTableName.USERS;

exports.up = async (knex) => {
  await knex.raw(`
    CREATE TABLE ${localDbTableName} (
      id          SERIAL PRIMARY KEY,
      uuid        UUID DEFAULT public.gen_random_uuid() NOT NULL,

      username    TEXT NOT NULL DEFAULT '',
      password    TEXT NOT NULL,
      email       TEXT NOT NULL,

      created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      created_by  TEXT NOT NULL DEFAULT '',
      updated_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      updated_by  TEXT NOT NULL DEFAULT '',
      deleted_at  TIMESTAMPTZ NULL,
      deleted_by  TEXT NULL,
      metadata    JSONB NULL
    );
    CREATE UNIQUE INDEX user_username ON ${localDbTableName}(username) WHERE deleted_at IS NULL;
  `);
  console.log(`+++ '${localDbTableName}' table created.`);
};

exports.down = async (knex) => {
  await knex.schema.dropTable(localDbTableName);
  console.log(`--- '${localDbTableName}' table dropped.`);
};
