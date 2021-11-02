const accountHandlerFcomposerHash = require("./account");
const userHandlerFcomposerHash = require("./user");

const handlerFcomposerList = [
  accountHandlerFcomposerHash,
  userHandlerFcomposerHash,
];
const handlerFcomposerHash = {};

for (let i = 0; i < handlerFcomposerList.length; i += 1) {
  const handlerFcomposer = handlerFcomposerList[i];
  Object.assign(handlerFcomposerHash, handlerFcomposer);
}

module.exports = handlerFcomposerHash;
