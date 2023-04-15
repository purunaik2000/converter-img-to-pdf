const aws = require('aws-sdk');

aws.config.update({
    accessKeyId: "AKIAXYKQ4YESHSPOA6F6",
    secretAccessKey: "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",
    region: "ap-south-1"
});

module.exports.uploadFile = async (file) => {
    return new Promise(function (resolve, reject) {

        const s3 = new aws.S3({apiVersion: "2012-10-17"});

        const uploadParams = {
            Bucket: "intern-aws-project",
            Key: Date.now() + file.filename,
            "ContentType": "image/png",
            Body: file.content
        }

        s3.upload(uploadParams, function (err, data) {
            if (err) return reject({ error: err });
            return resolve(data.Location);
        });
    });
}