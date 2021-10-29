function deleteUserHandlerFcomposer(diHash) {
  async function deleteUserHandler(req, res) {
    const { dataMock } = diHash;
    const { userList } = dataMock;
    try {
      const user = userList.find((item) => item.uuid === req.params.uuid);
      userList.splice(+user.id - 1, 1);
      res.status(200).send({
        message: "Deleted Complete",
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        message: error.message,
      });
    }
  }
  return deleteUserHandler;
}

module.exports = deleteUserHandlerFcomposer;
