function getUserListHandlerFcomposer(diHash) {
  async function getUserListHandler(req, res) {
    const { dataMock } = diHash;
    const { userList } = dataMock;
    try {
      res.status(200).json({
        user: userList,
      });
    } catch (error) {
      res.status(500).send({
        message: error.message,
      });
    }
  }

  return getUserListHandler;
}

module.exports = getUserListHandlerFcomposer;
