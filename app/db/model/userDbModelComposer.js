const dbTableName = require("../../const/dbTableName");

const localDbTableName = dbTableName.USERS;

function userDbModelComposer(argHash) {
  const {
    Model,
  } = argHash;

  class User extends Model {
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

  return User;
}

module.exports = userDbModelComposer;
