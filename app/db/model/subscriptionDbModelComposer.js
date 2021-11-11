const dbTableName = require("../../const/dbTableName");

const localDbTableName = dbTableName.SUBSCRIPTION;

function subscriptionDbModelComposer(argHash) {
  const {
    Model,
  } = argHash;

  class Subscription extends Model {
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

  return Subscription;
}

module.exports = subscriptionDbModelComposer;
