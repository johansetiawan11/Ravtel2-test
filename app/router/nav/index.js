const deleteNavRouterComposer = require("./deleteNavRouterComposer");
const getNavListRouterComposer = require("./getNavListRouterComposer");
const getNavRouterComposer = require("./getNavRouterComposer");
const postNavRouterComposer = require("./postNavRouterComposer");
const putNavRouterComposer = require("./putNavRouterComposer");

function navRouterFcomposer(diHash) {
  const {
    express,
  } = diHash;
  const expressRouter = express.Router();

  expressRouter.use(deleteNavRouterComposer(diHash));
  expressRouter.use(getNavListRouterComposer(diHash));
  expressRouter.use(getNavRouterComposer(diHash));
  expressRouter.use(postNavRouterComposer(diHash));
  expressRouter.use(putNavRouterComposer(diHash));

  return expressRouter;
}

module.exports = navRouterFcomposer;
