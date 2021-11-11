function putAccountHandlerFcomposer(diHash) {
  const {
    dataMock,
    attachmentFsCommonAdapter,
    attachmentFsCommon,
    Promise,
  } = diHash;
  const { accountList, bankList } = dataMock;
  async function addPhoto(item, fileResp) {
    if (item) {
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
  }

  async function putAccountHandler(req, res) {
    try {
      const fileResp = {};
      const promiseContainer = [
        addPhoto(req.files[0], fileResp),
        addPhoto(req.files[1], fileResp),
        addPhoto(req.files[2], fileResp),
      ];
      const account = accountList.find((item) => (item.id).toString() === req.params.id);
      const bank = bankList.find((item) => item.accountId === account.id);

      let newAccount;
      if (req.body.entity === "Personal") {
        newAccount = {
          id: account.id,
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
          created_at: account.created_at,
          created_by: account.created_by,
          updated_at: new Date(Date.now()).toLocaleString().split(",")[0],
          updated_by: req.userId,
          deleted_at: null,
          deleted_by: null,
        };
      } else {
        newAccount = {
          id: account.id,
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
          created_at: account.created_at,
          created_by: account.created_by,
          updated_at: new Date(Date.now()).toLocaleString().split(",")[0],
          updated_by: req.userId,
          deleted_at: null,
          deleted_by: null,
        };
      }
      const newBank = {
        id: bank.id,
        bankName: req.body.bankName,
        accountId: newAccount.id,
        accountName: req.body.accountName,
        accountNumber: req.body.accountNumber,
        branch: req.body.branch,
        swiftCode: req.body.swiftCode,
        currency: req.body.currency,
      };

      if (promiseContainer.length > 0) {
        await Promise.all(promiseContainer).then(() => {
          newAccount.idcard = Object.prototype.hasOwnProperty.call(fileResp, "idcard") ? fileResp.idcard : account.idcard;
          newAccount.taxcard = Object.prototype.hasOwnProperty.call(fileResp, "taxcard") ? fileResp.taxcard : account.taxcard;
          newAccount.selfie = Object.prototype.hasOwnProperty.call(fileResp, "selfie") ? fileResp.selfie : account.selfie;
        });
      }
      const accountIndex = accountList.findIndex(key => (key.id).toString() === req.params.id);
      accountList[accountIndex] = newAccount;
      bankList[accountIndex] = newBank;
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

  return putAccountHandler;
}
module.exports = putAccountHandlerFcomposer;
