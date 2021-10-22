const accountType = require("../../const/accountType");
const dbTableName = require("../../const/dbTableName");
const gender = require("../../const/gender");

const localDbTableName = dbTableName.ACCOUNT;

async function seed(knex) {
  await knex.raw(`TRUNCATE TABLE ${localDbTableName} CASCADE;`);
  console.log(`--- '${localDbTableName}' table truncated.`);

  const itemList = [];

  for (let i = 1; i <= 100; i += 1) {
    const item = {
      primary_email: `${i}@reserved.com`,
      primary_name: i,
      account_type: accountType.INSTITUTIONAL,
      primary_gender: gender.OTHER,
      primary_birth_date: "1970-01-01",
    };

    switch (i) {
      case 1:
        item.primary_email = "company@ravtel.com";
        item.primary_name = "Company Fund";
        break;

      case 2:
        item.primary_email = "founder@ravtel.com";
        item.primary_name = "Founders Fund";
        break;

      case 10:
        item.primary_email = "premier.index.alpha@ravtel.com";
        item.primary_name = "Premier Index Alpha";
        break;

      default:
        break;
    }

    itemList.push(item);
  }

  await knex(localDbTableName).insert(itemList);
  console.log(`+++ '${localDbTableName}' table seeded.`);
}

exports.seed = seed;
