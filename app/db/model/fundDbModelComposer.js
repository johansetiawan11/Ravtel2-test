const dbTableName = require("../../const/dbTableName");

const localDbTableName = dbTableName.FUND;

function fundDbModelComposer(argHash) {
  const {
    Model,
  } = argHash;

  class Fund extends Model {
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

  return Fund;
}

module.exports = fundDbModelComposer;
