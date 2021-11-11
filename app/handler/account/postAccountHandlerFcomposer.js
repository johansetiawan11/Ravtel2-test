function postAccountHandlerFcomposer(diHash) {
  const {
    dataMock,
    attachmentFsCommonAdapter,
    attachmentFsCommon,
    Promise,
  } = diHash;
  const { accountList, bankList } = dataMock;

  async function addPhoto(item, fileResp) {
    const reqFileMimeType = item.mimetype;
    const reqFileExtension = attachmentFsCommon.getFileExtension(reqFileMimeType);

    if (reqFileExtension) {
      await attachmentFsCommonAdapter.moveReqFileToStorage(item)
      .then((result) => {
        fileResp[item.fieldname] = result;
      })
      .catch((err) => {
        console.error(err);
      });
    }
  }

  async function postAccountHandler(req, res) {
    try {
      const fileResp = {};
      const promiseContainer = [
        addPhoto(req.files[0], fileResp),
        addPhoto(req.files[1], fileResp),
        addPhoto(req.files[2], fileResp),
      ];
      if (req.files && req.files.length > 0) {
        await Promise.all(promiseContainer);
      }
      let newAccount;
      const lastIndexAccount = accountList.length - 1;
      if (req.body.entity === "Personal") {
        newAccount = {
          id: `00${+accountList[lastIndexAccount].id + 1}`,
          name: req.body.name,
          email: req.body.email,
          gender: req.body.gender,
          birthdate: req.body.birthdate,
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
          idcard: fileResp.idcard,
          taxcard: fileResp.taxcard,
          selfie: fileResp.selfie,
          created_at: new Date(Date.now()).toLocaleString().split(",")[0],
          created_by: req.userId,
          updated_at: new Date(Date.now()).toLocaleString().split(",")[0],
          updated_by: req.userId,
          deleted_at: null,
          deleted_by: null,
        };
      } else {
        newAccount = {
          id: `00${+accountList[lastIndexAccount].id + 1}`,
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
          idcard: fileResp.idcard,
          taxcard: fileResp.taxcard,
          selfie: fileResp.selfie,
          created_at: new Date(Date.now()).toLocaleString().split(",")[0],
          created_by: req.userId,
          updated_at: new Date(Date.now()).toLocaleString().split(",")[0],
          updated_by: req.userId,
          deleted_at: null,
          deleted_by: null,
        };
      }
      const newBank = {
        id: +bankList[lastIndexAccount].id + 1,
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
      console.error(error);

      res.status(503).send({
        message: error.message,
      });
    }
  }

  return postAccountHandler;
}
module.exports = postAccountHandlerFcomposer;
