function postUserAuthHandlerFcomposer(diHash) {
  async function postUserAuthHandler(req, res) {
    const { bcrypt, dataMock, jwt } = diHash;
    try {
      const { userList } = dataMock;
      const user = userList.find(item => item.username === req.body.username);
      if (!user) {
        return res.status(401).send({ message: "Username Not found." });
      }
      const passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password,
      );
      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Invalid Password!",
        });
      }
      // eslint-disable-next-line consistent-return
      const token = jwt.sign(
        { id: user.id, role: user.role_id },
        "secret",
        {
          expiresIn: 86400 * 90, // 90 days
        },
      );
      req.headers["x-access-token"] = token;
      return res.status(200).json({
        user: {
          id: user.id,
          username: user.username,
          fullname: user.fullname,
          email: user.email,
          accessToken: token,
        },
      });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }

  return postUserAuthHandler;
}

module.exports = postUserAuthHandlerFcomposer;
