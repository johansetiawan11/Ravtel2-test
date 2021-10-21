function postUserAuthHandlerFcomposer(diHash) {
  function postUserAuthHandler(req, res) {
    res.send("postUserAuthHandler");
  }

  return postUserAuthHandler;
}

module.exports = postUserAuthHandlerFcomposer;
