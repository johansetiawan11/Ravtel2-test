function postUserHandlerFcomposer(diHash) {
  function postUserHandler(req, res) {
    res.send("postUserHandler");
  }

  return postUserHandler;
}

module.exports = postUserHandlerFcomposer;
