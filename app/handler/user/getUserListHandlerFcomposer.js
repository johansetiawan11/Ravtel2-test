function getUserListHandlerFcomposer(diHash) {
  function getUserListHandler(req, res) {
    res.send("getUserListHandler");
  }

  return getUserListHandler;
}

module.exports = getUserListHandlerFcomposer;
