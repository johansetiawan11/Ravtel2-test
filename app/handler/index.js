const accountHandlerFcomposerHash = require("./account");
const navHandlerFcomposerHash = require("./nav");
const subscriptionHandlerFcomposerHash = require("./subscription");
const userHandlerFcomposerHash = require("./user");

const handlerFcomposerList = [
  accountHandlerFcomposerHash,
  navHandlerFcomposerHash,
  subscriptionHandlerFcomposerHash,
  userHandlerFcomposerHash,
];
const handlerFcomposerHash = {};

for (let i = 0; i < handlerFcomposerList.length; i += 1) {
  const handlerFcomposer = handlerFcomposerList[i];
  Object.assign(handlerFcomposerHash, handlerFcomposer);
}

module.exports = handlerFcomposerHash;
