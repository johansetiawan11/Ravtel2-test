const deleteProductRouterComposer = require("./deleteProductRouterComposer");
const getProductListRouterComposer = require("./getProductListRouterComposer");
const getProductRouterComposer = require("./getProductRouterComposer");
const postProductRouterComposer = require("./postProductRouterComposer");
const putProductRouterComposer = require("./putProductRouterComposer");

function navRouterFcomposer(diHash) {
  const {
    express,
  } = diHash;
  const expressRouter = express.Router();

  expressRouter.use(deleteProductRouterComposer(diHash));
  expressRouter.use(getProductListRouterComposer(diHash));
  expressRouter.use(getProductRouterComposer(diHash));
  expressRouter.use(postProductRouterComposer(diHash));
  expressRouter.use(putProductRouterComposer(diHash));

  return expressRouter;
}

module.exports = navRouterFcomposer;
