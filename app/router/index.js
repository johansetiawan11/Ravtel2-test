const accountRouterFcomposer = require("./account");
const userRouterFcomposer = require("./user");

function routerFcomposer(diHash) {
  const {
    express,
  } = diHash;
  const expressRouter = express.Router();

  const accountRouter = accountRouterFcomposer(diHash);
  expressRouter.use(accountRouter);

  const userRouter = userRouterFcomposer(diHash);
  expressRouter.use(userRouter);

  return expressRouter;
}

module.exports = routerFcomposer;
