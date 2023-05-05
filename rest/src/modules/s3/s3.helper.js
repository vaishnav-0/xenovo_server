const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");
const { createPresignedPost } = require("@aws-sdk/s3-presigned-post");
const { GetObjectCommand, PutObjectCommand, DeleteObjectCommand } = require("@aws-sdk/client-s3");
const tk = require("timekeeper");

const { s3Client } = require('../../config/aws');

const ObjectParams = (key) => ({ Bucket: process.env.BUCKET, Key: key, ResponseCacheControl: `max-age=86400` })
const getTruncatedTime = () => {
    const currentTime = new Date();
    const d = new Date(currentTime);
    d.setMinutes(0);
    d.setSeconds(0);
    d.setMilliseconds(0);

    return d;
};
const getS3signedUrl = async (key) => {

    try {
        const command = new GetObjectCommand(ObjectParams(key));
        const url = await tk.withFreeze(getTruncatedTime(), () => getSignedUrl(s3Client, command, { expiresIn: process.env.S3_URL_EXPIRY }));
        return url;
    }
    catch (e) {
        console.log(e)
        throw e;
    }
}


const putS3signedUrl = async (key) => {

    try {
        const command = new PutObjectCommand(ObjectParams(key));
        const url = await getSignedUrl(s3Client, command, { expiresIn: process.env.S3_URL_EXPIRY });
        return url;
    }
    catch (e) {
        console.log(e)
        throw e;
    }
}

const postS3signedUrl = async ({ name, extention }) => {
    const extentionIndex = name.search(/\.[a-zA-Z0-9]+/);
    const params = {
        Bucket: process.env.BUCKET,
        Key: `${name.substring(0, extentionIndex)}-${Date.now()}${name.substring(extentionIndex)}`,
        Expires: process.env.S3_URL_EXPIRY,
        Conditions: [["content-length-range", process.env.CONTENT_LENGTH_FROM_SIZE, process.env.CONTENT_LENGTH_TO_SIZE]], //bytes
        Fields: { contentType: extention }
    }
    try {
        const { url, fields } = await createPresignedPost(s3Client, params);
        return { url, fields };
    }
    catch (e) {
        console.log(e);
        throw e;
    }
}


const deleteObject = async (key) => {
    try {
        const data = await s3Client.send(new DeleteObjectCommand(ObjectParams(key)));
        console.log("Object deleted.", data);
        return data;

    } catch (err) {
        return new Error(err);
    }

}

module.exports = {
    getS3signedUrl, postS3signedUrl, putS3signedUrl, deleteObject
}
