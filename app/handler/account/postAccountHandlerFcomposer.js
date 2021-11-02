function postAccountHandlerFcomposer(diHash) {
  const { dataMock } = diHash;
  const { accountList, bankList } = dataMock;
  async function postAccountHandler(req, res) {
    try {
      // console.log(req.files);
      // console.log(req.body);
      // file upload still doesnt work
      // const newFileName = `${Date.now()}-${req.files.idcard}`;
      // const uploadPath = `${process.cwd()}/app/uploads/assets/${newFileName}`;
      // await sharp(req.files.idcard).jpeg({ quality: 75, progressive: true }).toFile(uploadPath);
      let newAccount;
      if (req.body.entity === "Personal") {
        newAccount = {
          id: `00${accountList.length + 1}`,
          name: req.body.name,
          email: req.body.email,
          gender: req.body.gender,
          birthday: req.body.birthday,
          birthplace: req.body.birthplace,
          identityNum: req.body.identityNum,
          taxnum: req.body.taxnum,
          phone: req.body.phone,
          handphone: req.body.handphone,
          address: req.body.address,
          city: req.body.city,
          district: req.body.district,
          country: req.body.country,
          zipcode: req.body.zipcode,
          entity: req.body.entity,
          status: "Pending",
          // document: {
          //   idcard: newFileName[0],
          //   taxcard: newFileName[1],
          //   selfie: newFileName[2],
          // },
          created_at: new Date(Date.now()).toLocaleString().split(",")[0],
          created_by: req.userId,
          updated_at: new Date(Date.now()).toLocaleString().split(",")[0],
          updated_by: req.userId,
          deleted_at: null,
          deleted_by: null,
        };
      } else {
        newAccount = {
          id: `00${accountList.length + 1}`,
          companyName: req.body.companyName,
          email: req.body.email,
          industry: req.body.industry,
          doe: req.body.doe,
          regisNum: req.body.regisNum,
          taxnum: req.body.taxnum,
          phone: req.body.phone,
          handphone: req.body.handphone,
          address: req.body.address,
          city: req.body.city,
          district: req.body.district,
          country: req.body.country,
          zipcode: req.body.zipcode,
          entity: req.body.entity,
          status: "Pending",
          // document: {
          //   idcard: newFileName[0],
          //   taxcard: newFileName[1],
          //   selfie: newFileName[2],
          // },
          created_at: new Date(Date.now()).toLocaleString().split(",")[0],
          created_by: req.userId,
          updated_at: new Date(Date.now()).toLocaleString().split(",")[0],
          updated_by: req.userId,
          deleted_at: null,
          deleted_by: null,
        };
      }
      const newBank = {
        id: bankList + 1,
        bankName: req.body.bankName,
        accountId: newAccount.id,
        accountName: req.body.accountName,
        accountNumber: req.body.accountNumber,
        branch: req.body.branch,
        swiftCode: req.body.swiftCode,
        currency: req.body.currency,
      };
      accountList.push(newAccount);
      bankList.push(newBank);
      res.status(200).send({
        account: newAccount,
        bank: newBank,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        message: error.message,
      });
    }
  }
  return postAccountHandler;
}
module.exports = postAccountHandlerFcomposer;
