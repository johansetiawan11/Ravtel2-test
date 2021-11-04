function postNavHandlerFcomposer(diHash) {
  const { dataMock } = diHash;
  const { navList } = dataMock;
  async function postNavHandler(req, res) {
    const navLast = navList[navList.length - 1];
    try {
      const newNav = {
        id: navList.length + 1,
        nlv: +navLast.nlv + 1000,
        totalUnit: +navLast.totalUnit + 10,
        nav: req.body.nav,
        date: req.body.date,
      };
      navList.push(newNav);
      res.status(200).send({
        nav: newNav,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        message: error.message,
      });
    }
  }

  return postNavHandler;
}

module.exports = postNavHandlerFcomposer;
