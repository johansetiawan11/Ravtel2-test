function putUserHandlerFcomposer(diHash) {
  function putUserHandler(req, res) {
    res.send("putUserHandler");
  }

  return putUserHandler;
}

module.exports = putUserHandlerFcomposer;
