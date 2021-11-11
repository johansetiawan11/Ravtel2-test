const aclPrivilege = require("../const/aclPrivilege");
const aclRole = require("../const/aclRole");

class Adapter {

  constructor() {
    this.aclSchema = {};

    Object.keys(aclRole).forEach((aclRoleKey) => {
      const aclRoleValue = aclRole[aclRoleKey];
      this.aclSchema[aclRoleValue] = {};

      Object.keys(aclPrivilege).forEach((aclPrivilegeKey) => {
        const aclPrivilegeValue = aclPrivilege[aclPrivilegeKey];

        switch (aclRoleValue) {
          case aclRole.SUPER_ADMIN:
            // Grant all privileges
            this.aclSchema[aclRoleValue][aclPrivilegeValue] = true;
            break;

          default:
            this.aclSchema[aclRoleValue][aclPrivilegeValue] = false;
            break;
        }
      });
    });

    const observerAdminAclPrivilegeList = [
      aclPrivilege.ACCOUNT_LISTING,
      aclPrivilege.ACCOUNT_VIEW,
      aclPrivilege.DEPOSIT_LISTING,
      aclPrivilege.DEPOSIT_VIEW,
      aclPrivilege.INVESTMENT_LISTING,
      aclPrivilege.INVESTMENT_VIEW,
      aclPrivilege.LEDGER_LISTING,
      aclPrivilege.LEDGER_VIEW,
      aclPrivilege.NAV_LISTING,
      aclPrivilege.NAV_VIEW,
      aclPrivilege.PRODUCT_LISTING,
      aclPrivilege.PRODUCT_VIEW,
      aclPrivilege.SUBSCRIPTION_LISTING,
      aclPrivilege.SUBSCRIPTION_VIEW,
      aclPrivilege.USER_LISTING,
      aclPrivilege.USER_VIEW,
    ];
    observerAdminAclPrivilegeList.forEach((aclPrivilegeEntry) => {
      this.aclSchema[aclRole.OBSERVER_ADMIN][aclPrivilegeEntry] = true;
    });

    const salesAgentAclPrivilegeList = [
      aclPrivilege.ACCOUNT_CREATION,
      aclPrivilege.ACCOUNT_DELETION,
      aclPrivilege.ACCOUNT_LISTING,
      aclPrivilege.ACCOUNT_UPDATE,
      aclPrivilege.ACCOUNT_VIEW,

      aclPrivilege.INVESTMENT_CREATION,
      aclPrivilege.INVESTMENT_DELETION,
      aclPrivilege.INVESTMENT_LISTING,
      aclPrivilege.INVESTMENT_UPDATE,
      aclPrivilege.INVESTMENT_VIEW,

      aclPrivilege.SUBSCRIPTION_CREATION,
      aclPrivilege.SUBSCRIPTION_DELETION,
      aclPrivilege.SUBSCRIPTION_LISTING,
      aclPrivilege.SUBSCRIPTION_UPDATE,
      aclPrivilege.SUBSCRIPTION_VIEW,
    ];
    salesAgentAclPrivilegeList.forEach((aclPrivilegeEntry) => {
      this.aclSchema[aclRole.SALES_AGENT][aclPrivilegeEntry] = true;
    });

    const traderAclPrivilegeList = [
      aclPrivilege.NAV_CREATION,
      aclPrivilege.NAV_DELETION,
      aclPrivilege.NAV_LISTING,
      aclPrivilege.NAV_UPDATE,
      aclPrivilege.NAV_VIEW,
    ];
    traderAclPrivilegeList.forEach((aclPrivilegeEntry) => {
      this.aclSchema[aclRole.TRADER][aclPrivilegeEntry] = true;
    });
  }

  getAclPrivilegeHash(sourceAclRole) {
    let aclPrivilegeHash;

    if (this.aclSchema[sourceAclRole]) {
      // Clone this to prevent unintended mutation
      aclPrivilegeHash = JSON.parse(JSON.stringify(this.aclSchema[sourceAclRole]));
    }

    return aclPrivilegeHash;
  }

}

module.exports = {
  Adapter,
};
