const getSubscriptionListRouterComposer = require("./getSubscriptionListRouterComposer");
const getSubscriptionRouterComposer = require("./getSubscriptionRouterComposer");

function userRouterFcomposer(diHash) {
  const {
    express,
  } = diHash;
  const expressRouter = express.Router();

  expressRouter.use(getSubscriptionListRouterComposer(diHash));
  expressRouter.use(getSubscriptionRouterComposer(diHash));

  return expressRouter;
}

module.exports = userRouterFcomposer;
