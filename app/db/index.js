const accountDbModelComposer = require("./model/accountDbModelComposer");
const ledgerDbModelComposer = require("./model/ledgerDbModelComposer");
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
    Ledger: ledgerDbModelComposer,
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
