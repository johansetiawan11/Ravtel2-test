const dbTableName = require("../../const/dbTableName");

const localDbTableName = dbTableName.NAV;

function navDbModelComposer(argHash) {
  const {
    Model,
  } = argHash;

  class Nav extends Model {
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

  return Nav;
}

module.exports = navDbModelComposer;
