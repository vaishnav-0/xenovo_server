const { S3Client } = require("@aws-sdk/client-s3");
const { CognitoIdentityProviderClient } = require("@aws-sdk/client-cognito-identity-provider"); // CommonJS import

const credentials = {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
}

const config = {
    region: process.env.REGION,
    credentials
}

const s3Client = new S3Client(config);
const cognitoClient = new CognitoIdentityProviderClient(config);


module.exports.s3Client = s3Client;
module.exports.cognitoClient = cognitoClient;