function getUserHandlerFcomposer(diHash) {
  function getUserHandler(req, res) {
    res.send("getUserHandler");
  }

  return getUserHandler;
}

module.exports = getUserHandlerFcomposer;
