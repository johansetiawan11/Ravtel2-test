function MiddlewareAuth(diHash) {
  function Authentication(req, res, next) {
    const { jwt } = diHash;
    const token = req.headers["x-access-token"];
    if (!token) {
      return res.status(403).send({
        message: "No token provided!",
      });
    }
    jwt.verify(token, "secret", (err, decoded) => {
      if (err) {
        res.status(401).send({
          message: err.message,
        });
      }
      req.role = decoded.role;
      req.userId = decoded.id;
      next();
    });
  }
  return Authentication;
}
module.exports = MiddlewareAuth;
