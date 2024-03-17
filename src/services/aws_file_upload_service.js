const AWS = require("aws-sdk");

class AwsFileUploadService {
  constructor() {
    this.bucketName = process.env.AWS_BUCKET_NAME;
    this.aws = new AWS.S3({
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    });
    this.uploadFiles = this.uploadFiles.bind(this);
  }

  /**
   *
   * @param {Array<Express.Multer.File>} files
   * @returns {Promise<Array<String>>}
   */
  async uploadFiles(files) {
    const res = await Promise.all(
      files.map((file) => {
        return this.aws
          .upload({
            Bucket: this.bucketName,
            Key: file.filename,
            Body: file.buffer,
          })
          .promise();
      })
    );

    return res.map((e) => e.Location);
  }
}

module.exports = { awsFileUploadService: new AwsFileUploadService() };
