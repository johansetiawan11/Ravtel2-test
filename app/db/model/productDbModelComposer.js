const dbTableName = require("../../const/dbTableName");

const localDbTableName = dbTableName.PRODUCT;

function productDbModelComposer(argHash) {
  const {
    Model,
  } = argHash;

  class Product extends Model {
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

  return Product;
}

module.exports = productDbModelComposer;
