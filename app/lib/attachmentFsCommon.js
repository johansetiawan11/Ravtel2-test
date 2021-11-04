const fileMimeTypeToExtensionDictionary = {
  "image/gif": "gif",
  "image/jpeg": "jpg",
  "image/png": "png",
};

function getFileExtension(fileMimeType) {
  return fileMimeTypeToExtensionDictionary[fileMimeType];
}

// TODO: Limit uploaded file size
class Adapter {

  resetDiReferenceBatch(diHash) {
    const {
      awsSdk,
      env,
      Promise,
    } = diHash;
    this.awsSdk = awsSdk;
    this.env = env;
    this.Promise = Promise;
  }

  constructor(diHash) {
    this.resetDiReferenceBatch(diHash);
  }

  resetVarBatch() {
    this.s3Agent = new this.awsSdk.S3({
      region: this.env.AWS_S3_REGION,
    });
    this.s3RootDir = this.env.AWS_S3_ROOT_DIR;
  }

  async moveReqFileToStorage(reqFile) {
    const reqFileMimeType = reqFile.mimetype;
    const reqFileExtension = getFileExtension(reqFileMimeType);

    // TODO: Use UTC0 'datetime-uuid-extension' formatted fileKey (e.g. '202111052321_123e4567-e89b-12d3-a456-426614174000.png')
    const fileKey = `${new Date().toISOString()}.${reqFileExtension}`;
    const s3Params = {
      Bucket: this.env.AWS_S3_BUCKET,
      Key: `${this.s3RootDir}/${fileKey}`,
      Body: reqFile.buffer, // Stream the file directly from client-side to AWS S3
    };
    const storageResponse = new Promise((resolve, reject) => {
      this.s3Agent.upload(s3Params, (err, data) => {
        if (err) {
          reject(err);
        }

        resolve(data);
      });
    });

    return storageResponse
    .then((s3Response) => {
      return {
        fileKey,
        s3Response,
      };
    });
  }
}

module.exports = {
  Adapter,
  getFileExtension,
};
