const getProductList = require("./getProductListHandlerFcomposer");
const deleteProduct = require("./deleteProductHandlerFcomposer");
const getProduct = require("./getProductHandlerFcomposer");
const postProduct = require("./postProductHandlerFcomposer");
const putProduct = require("./putProductHandlerFcomposer");

module.exports = {
  deleteProduct,
  getProduct,
  getProductList,
  postProduct,
  putProduct,
};
