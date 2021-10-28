function putUserHandlerFcomposer(diHash) {
  async function putUserHandler(req, res) {
    const { dataMock } = diHash;
    const { userList } = dataMock;
    try {
      const user = userList.find((item) => item.uuid === req.params.uuid);
      const newUser = {
        id: userList[userList.length - 1].id,
        uuid: userList[userList.length - 1].uuid,
        fullname: req.body.fullname,
        username: req.body.username,
        email: req.body.email,
        rolename: req.body.rolename,
        created_by: 1,
        updated_at: new Date(Date.now()).toLocaleString().split(",")[0],
        updated_by: 1,
        deleted_at: null,
        deleted_by: null,
      };
      userList[user.id - 1] = newUser;
      res.status(200).send({
        message: "Success Updated",
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        message: error.message,
      });
    }
  }

  return putUserHandler;
}

module.exports = putUserHandlerFcomposer;
