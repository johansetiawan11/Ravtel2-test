const accountHandlerFcomposerHash = require("./account");
const bankHandlerFcomposerHash = require("./bank");
const depositHandlerFcomposerHash = require("./deposit");
const investmentHandlerFcomposerHash = require("./investment");
const ledgerHandlerFcomposerHash = require("./ledger");
const navHandlerFcomposerHash = require("./nav");
const portfolioHandlerFcomposerHash = require("./portfolio");
const productHandlerFcomposerHash = require("./product");
const subscriptionHandlerFcomposerHash = require("./subscription");
const userHandlerFcomposerHash = require("./user");
const withdrawalHandlerFcomposerHash = require("./withdrawal");

const handlerFcomposerList = [
  accountHandlerFcomposerHash,
  bankHandlerFcomposerHash,
  depositHandlerFcomposerHash,
  investmentHandlerFcomposerHash,
  ledgerHandlerFcomposerHash,
  navHandlerFcomposerHash,
  portfolioHandlerFcomposerHash,
  productHandlerFcomposerHash,
  subscriptionHandlerFcomposerHash,
  userHandlerFcomposerHash,
  withdrawalHandlerFcomposerHash,
];
const handlerFcomposerHash = {};

for (let i = 0; i < handlerFcomposerList.length; i += 1) {
  const handlerFcomposer = handlerFcomposerList[i];
  Object.assign(handlerFcomposerHash, handlerFcomposer);
}

module.exports = handlerFcomposerHash;
