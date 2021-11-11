function aclValidationHandlerFcomposer(diHash, argHash) {
  const {
    aclAdminCommonAdapter,
  } = diHash;
  const {
    requiredAclPrivilegeList,
  } = argHash;

  function aclValidationHandler(req, res, next) {
    // TODO: Validate privileges based on acl_role
    aclAdminCommonAdapter.getAclPrivilegeHash();

    requiredAclPrivilegeList.forEach((requiredAclPrivilege) => {
    });

    next();
  }

  return aclValidationHandler;
}

module.exports = aclValidationHandlerFcomposer;
