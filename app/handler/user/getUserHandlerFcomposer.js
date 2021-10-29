function getUserHandlerFcomposer(diHash) {
  const { dataMock } = diHash;
  const { userList } = dataMock;
  async function getUserHandler(req, res) {
    const user = userList.find((item) => item.uuid === req.params.uuid);

    try {
      res.status(200).json({
        user,
      });
    } catch (error) {
      res.status(500).send({
        message: error.message,
      });
    }
  }

  return getUserHandler;
}

module.exports = getUserHandlerFcomposer;
