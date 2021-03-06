const accountDbModelComposer = require("./model/accountDbModelComposer");
const fundDbModelComposer = require("./model/fundDbModelComposer");
const investmentDbModelComposer = require("./model/investmentDbModelComposer");
const ledgerDbModelComposer = require("./model/ledgerDbModelComposer");
const navDbModelComposer = require("./model/navDbModelComposer");
const productDbModelComposer = require("./model/productDbModelComposer");
const subscriptionDbModelComposer = require("./model/subscriptionDbModelComposer");
const userDbModelComposer = require("./model/userDbModelComposer");

function dbModelHashComposer(diHash) {
  const {
    knexAgent,
    objection,
  } = diHash;
  const { Model } = objection;
  Model.knex(knexAgent);

  const dbModelComposerHash = {
    Account: accountDbModelComposer,
    Fund: fundDbModelComposer,
    Investment: investmentDbModelComposer,
    Ledger: ledgerDbModelComposer,
    Nav: navDbModelComposer,
    Product: productDbModelComposer,
    Subscription: subscriptionDbModelComposer,
    User: userDbModelComposer,
  };
  const dbModelComposerHashKeys = Object.keys(dbModelComposerHash);

  const dbModelHash = {};

  for (let i = 0; i < dbModelComposerHashKeys.length; i += 1) {
    const dbModelComposerHashKey = dbModelComposerHashKeys[i];
    const dbModelComposer = dbModelComposerHash[dbModelComposerHashKey];
    const dbModel = dbModelComposer({
      dbModelHash,
      Model,
    });
    dbModelHash[dbModelComposerHashKey] = dbModel;
  }

  return dbModelHash;
}

module.exports = dbModelHashComposer;
