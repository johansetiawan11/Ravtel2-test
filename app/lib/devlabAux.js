// NOTE: This is an experimental-only module; Avoid using this for the actual service

function devlabAuxComposer(diHash) {
  const {
    attachmentFsCommon,
    attachmentFsCommonAdapter,
    authHandlerFcomposerHash,
    express,
    middlewareHash,
  } = diHash;
  const appAuthHandlerFcomposer = authHandlerFcomposerHash.appOrUser;
  const devlabAuxRouter = express.Router();

  /**
   * @openapi
   * /devlab/fs:
   *   post:
   *     security:
   *       - appAuthScheme: []
   *     description: Experimental route for handling file upload.
   *     requestBody:
   *       required: true
   *       content:
   *         multipart/form-data:
   *           schema:
   *             $ref: '#/components/schemas/postDevlabFsPayload'
   *     responses:
   *       200:
   *         description: File upload response.
   *     tags:
   *       - 00_devlab
   *
   * components:
   *   schemas:
   *     postDevlabFsPayload:
   *       type: object
   *       properties:
   *         fileNote:
   *           description: File note
   *           type: string
   *         filePath:
   *           description: File path
   *           type: string
   *           format: binary
   */
  const routerPath = "/devlab/fs";
  devlabAuxRouter.use(routerPath, middlewareHash.standardMiddlewareList);
  devlabAuxRouter.post(routerPath, [appAuthHandlerFcomposer(diHash)], async (req, res) => {
    let resMessage = "No file uploaded";

    if (
      req.files
      && (req.files.length > 0)
    ) {
      const reqFile = req.files[0];
      const reqFileMimeType = reqFile.mimetype;
      const reqFileExtension = attachmentFsCommon.getFileExtension(reqFileMimeType); // Only allow certain MIME types

      if (reqFileExtension) {
        const storageResponse = await attachmentFsCommonAdapter.moveReqFileToStorage(reqFile)
        .catch((err) => {
          resMessage = `File upload failed`;
          console.error(err);
        });

        if (storageResponse) {
          resMessage = `'${storageResponse.fileKey}' uploaded`;
        }
      }
    }

    return res.status(200).json({
      message: resMessage,
    });
  });

  return {
    devlabAuxRouter,
  };
}

module.exports = devlabAuxComposer;
