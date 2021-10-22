const accountType = require("../../const/accountType");
const dbTableName = require("../../const/dbTableName");

const localDbTableName = dbTableName.ACCOUNT;

exports.up = async (knex) => {
  await knex.raw(`
    create table ${localDbTableName} (
      id                               SERIAL PRIMARY KEY,
      uuid                             UUID DEFAULT public.gen_random_uuid() NOT NULL,

      account_type                     account_type NOT NULL DEFAULT '${accountType.PERSONAL}'::account_type,

      primary_email                    TEXT NOT NULL DEFAULT '',
      primary_name                     TEXT NOT NULL DEFAULT '',
      primary_identification_number    TEXT NOT NULL DEFAULT '',
      primary_tax_number               TEXT NOT NULL DEFAULT '',
      primary_phone1                   TEXT NOT NULL DEFAULT '',
      primary_phone2                   TEXT NOT NULL DEFAULT '',
      primary_address                  TEXT NOT NULL DEFAULT '',
      primary_city                     TEXT NOT NULL DEFAULT '',
      primary_province                 TEXT NOT NULL DEFAULT '',
      primary_country                  TEXT NOT NULL DEFAULT '',
      primary_zipcode                  TEXT NOT NULL DEFAULT '',
      primary_gender                   gender NOT NULL,
      primary_birth_place              TEXT NOT NULL DEFAULT '',
      primary_birth_date               TIMESTAMPTZ NULL,

      secondary_email                  TEXT NOT NULL DEFAULT '',
      secondary_name                   TEXT NOT NULL DEFAULT '',
      secondary_identification_number  TEXT NOT NULL DEFAULT '',
      secondary_tax_number             TEXT NOT NULL DEFAULT '',
      secondary_phone1                 TEXT NOT NULL DEFAULT '',
      secondary_phone2                 TEXT NOT NULL DEFAULT '',
      secondary_address                TEXT NOT NULL DEFAULT '',
      secondary_city                   TEXT NOT NULL DEFAULT '',
      secondary_province               TEXT NOT NULL DEFAULT '',
      secondary_country                TEXT NOT NULL DEFAULT '',
      secondary_zipcode                TEXT NOT NULL DEFAULT '',
      secondary_gender                 gender NULL,
      secondary_birth_place            TEXT NOT NULL DEFAULT '',
      secondary_birth_date             timestamptz NULL,

      created_at                       timestamptz NOT NULL DEFAULT NOW(),
      created_by                       TEXT NOT NULL DEFAULT '',
      updated_at                       timestamptz NOT NULL DEFAULT NOW(),
      updated_by                       TEXT NOT NULL DEFAULT '',
      deleted_at                       TIMESTAMPTZ NULL,
      deleted_by                       TEXT NULL,
      metadata                         JSONB NULL
    );
    CREATE UNIQUE INDEX account_email ON ${localDbTableName}(primary_email) WHERE deleted_at IS NULL;
  `);
  console.log(`+++ '${localDbTableName}' table created.`);
};

exports.down = async (knex) => {
  await knex.schema.dropTable(localDbTableName);
  console.log(`--- '${localDbTableName}' table dropped.`);
};
