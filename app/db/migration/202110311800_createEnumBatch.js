const accountType = require("../../const/accountType");
const aclRole = require("../../const/aclRole");
const activityType = require("../../const/activityType");
const attachmentType = require("../../const/attachmentType");
const currency = require("../../const/currency");
const gender = require("../../const/gender");
const subscriptionStatus = require("../../const/subscriptionStatus");

exports.up = async (knex) => {
  await knex.raw(`CREATE EXTENSION IF NOT EXISTS pgcrypto WITH SCHEMA public;`);
  console.log(`+++ 'pgcrypto' extension created.`);

  await knex.raw(`
    CREATE TYPE account_type AS ENUM
    ('${accountType.PERSONAL}', '${accountType.INSTITUTIONAL}', '${accountType.OTHER}');
  `);
  console.log(`+++ 'account_type' enum created.`);

  await knex.raw(`
    CREATE TYPE acl_role AS ENUM
    ('${aclRole.INITIATE}', '${aclRole.OBSERVER_ADMIN}', '${aclRole.OPERATION_AGENT}', '${aclRole.SALES_AGENT}', '${aclRole.SUPER_ADMIN}', '${aclRole.TRADER}');
  `);
  console.log(`+++ 'acl_role' enum created.`);

  await knex.raw(`
    CREATE TYPE activity_type AS ENUM
    ('${activityType.SUBSCRIPTION}', '${activityType.WITHDRAWAL}', '${activityType.PERFORMANCE_FEE}', '${activityType.PENALTY_FEE}');
  `);
  console.log(`+++ 'activity_type' enum created.`);

  await knex.raw(`
    CREATE TYPE attachment_type AS ENUM
    ('${attachmentType.ID_CARD}', '${attachmentType.TAX_CARD}', '${attachmentType.PHOTO}', '${attachmentType.SUBSCRIPTION_AGREEMENT}', '${attachmentType.COMPANY_REGISTRATION}', '${attachmentType.OTHER}');
  `);
  console.log(`+++ 'attachment_type' enum created.`);

  await knex.raw(`
    CREATE TYPE currency AS ENUM
    ('${currency.USD}', '${currency.IDR}', '${currency.SGD}', '${currency.MYR}');
  `);
  console.log(`+++ 'currency' enum created.`);

  await knex.raw(`
    CREATE TYPE gender AS ENUM
    ('${gender.MALE}', '${gender.FEMALE}', '${gender.OTHER}');
  `);
  console.log(`+++ 'gender' enum created.`);

  await knex.raw(`
    CREATE TYPE reference_table AS ENUM
    ('deposit', 'withdrawal', 'investment_activity', 'tda_movement');
  `);
  console.log(`+++ 'reference_table' enum created.`);

  await knex.raw(`
    CREATE TYPE subscription_status AS ENUM
    ('${subscriptionStatus.UNCONFIRMED}', '${subscriptionStatus.PENDING_CONVERSION}', '${subscriptionStatus.PENDING_TDA_FUND}', '${subscriptionStatus.CONFIRMED}', '${subscriptionStatus.FAILED}');
  `);
  console.log(`+++ 'subscription_status' enum created.`);
};

exports.down = async (knex) => {
  await knex.raw(`DROP TYPE subscription_status;`);
  console.log(`--- 'subscription_status' enum dropped.`);

  await knex.raw(`DROP TYPE reference_table;`);
  console.log(`--- 'reference_table' enum dropped.`);

  await knex.raw(`DROP TYPE gender;`);
  console.log(`--- 'gender' enum dropped.`);

  await knex.raw(`DROP TYPE currency;`);
  console.log(`--- 'currency' enum dropped.`);

  await knex.raw(`DROP TYPE attachment_type;`);
  console.log(`--- 'attachment_type' enum dropped.`);

  await knex.raw(`DROP TYPE activity_type;`);
  console.log(`--- 'activity_type' enum dropped.`);

  await knex.raw(`DROP TYPE acl_role;`);
  console.log(`--- 'account_type' enum dropped.`);

  await knex.raw(`DROP TYPE account_type;`);
  console.log(`--- 'account_type' enum dropped.`);

  await knex.raw(`DROP EXTENSION IF EXISTS pgcrypto;`);
  console.log(`--- 'pgcrypto' extension dropped.`);
};
