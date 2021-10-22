const dbTableName = require("../../const/dbTableName");
const subscriptionStatus = require("../../const/subscriptionStatus");

const localDbTableName = dbTableName.SUBSCRIPTION;
const accountDbTableName = dbTableName.ACCOUNT;
const productDbTableName = dbTableName.PRODUCT;

exports.up = async (knex) => {
  await knex.raw(`
    CREATE TABLE ${localDbTableName} (
      id                   BIGSERIAL PRIMARY KEY,

      account_id           INT NOT NULL REFERENCES ${accountDbTableName}(id),
      product_id           INT NULL REFERENCES ${productDbTableName}(id),

      intial_currency      currency NOT NULL,
      intial_amount        NUMERIC(32,12) NOT NULL,

      converted_currency   currency NOT NULL,
      converted_amount     NUMERIC(32,12) NOT NULL,

      subscription_status  subscription_status NOT NULL DEFAULT '${subscriptionStatus.UNCONFIRMED}'::subscription_status,
      proof                TEXT NOT NULL,

      created_at           TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      created_by           TEXT NOT NULL DEFAULT '',
      updated_at           TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      updated_by           TEXT NOT NULL DEFAULT '',
      deleted_at           TIMESTAMPTZ NULL,
      deleted_by           TEXT NULL,
      metadata             JSONB NULL
    );
  `);
  console.log(`+++ '${localDbTableName}' table created.`);
};

exports.down = async (knex) => {
  await knex.schema.dropTable(localDbTableName);
  console.log(`--- '${localDbTableName}' table dropped.`);
};
