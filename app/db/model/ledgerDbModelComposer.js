const dbTableName = require("../../const/dbTableName");

const localDbTableName = dbTableName.LEDGER;

function ledgerDbModelComposer(argHash) {
  const {
    Model,
  } = argHash;

  class Ledger extends Model {
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

  return Ledger;
}

module.exports = ledgerDbModelComposer;
