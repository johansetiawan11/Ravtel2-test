const dbTableName = require("../../const/dbTableName");

const localDbTableName = dbTableName.INVESTMENT;

function investmentDbModelComposer(argHash) {
  const {
    Model,
  } = argHash;

  class Investment extends Model {
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

  return Investment;
}

module.exports = investmentDbModelComposer;
