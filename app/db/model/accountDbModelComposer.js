const dbTableName = require("../../const/dbTableName");

const localDbTableName = dbTableName.ACCOUNT;

function accountDbModelComposer(argHash) {
  const {
    Model,
  } = argHash;

  class Account extends Model {
    static get tableName() {
      return localDbTableName;
    }

    $beforeInsert() {
      this.updated_at = new Date().toISOString();
      this.created_at = this.updated_at;
    }

    $beforeUpdate() {
      this.updated_at = new Date().toISOString();
    }
  }

  return Account;
}

module.exports = accountDbModelComposer;
