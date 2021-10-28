function postUserHandlerFcomposer(diHash) {
  const { dataMock, bcrypt } = diHash;
  const { userList } = dataMock;
  async function postUserHandler(req, res) {
    try {
      const newUser = {
        id: userList[userList.length - 1].id + 1,
        uuid: userList[userList.length - 1].uuid + 1,
        fullname: req.body.fullname,
        username: req.body.username,
        rolename: req.body.rolename,
        password: bcrypt.hashSync(req.body.password, 8),
        email: req.body.email,
        created_at: new Date(Date.now()).toLocaleString().split(",")[0],
        created_by: 1,
        updated_at: new Date(Date.now()).toLocaleString().split(",")[0],
        updated_by: 1,
        deleted_at: null,
        deleted_by: null,
      };
      userList.push(newUser);
      res.status(200).send({
        user: newUser,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        message: error.message,
      });
    }
  }

  return postUserHandler;
}

module.exports = postUserHandlerFcomposer;
