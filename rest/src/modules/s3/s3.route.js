const router = require('express').Router();
const s3Controller = require('./s3.controller');
// const verifyAwsJwt = require('../auth/cognito.middleware');
const hasRole = require('../auth/role.middleware');
const { hasuraAuth } = require('../auth/auth.middleware');


/**
 * @api {get} /preSignedUrl/:key Request Presigned URL for retrieving S3 objects
 * @apiName preSignedUrl
 * @apiGroup S3
 *
 * @apiParam {String} key File Name.
 *
 * @apiSuccess {String} url Get URL for provided object key.
 * 
 */
router.get('/preSignedUrl/:key', s3Controller.getPresignedUrl);
router.get('/preSignedUrl', s3Controller.getPresignedUrl)
/**
 * @api {PUT} /preSignedUrl/:key Request Presigned URL for updating S3 objects
 * @apiName preSignedUrl
 * @apiGroup S3
 *
 * @apiParam {String} key File Name.
 *
 * @apiSuccess {String} url PUT URL for provided object key.
 * 
 */
router.put('/preSignedUrl/:key', hasRole(['admin', 'landlord']), s3Controller.putPresignedUrl);


/**
 * @api {POST} /preSignedUrl Request Presigned URL for uploading S3 objects
 * @apiName preSignedUrl
 * @apiGroup S3
 *
 * @apiBody {String} name File Name.
 * @apiBody {String} extention File Extention.
 * 
 * 
 * @apiSuccess {String} url POST URL for provided object key.
 * @apiSuccess {Object} fields POST URL for provided object key.
 * 
 */
router.post('/preSignedUrl', hasRole(['tenant', 'admin', 'landlord']), s3Controller.postPresignedUrl);

// delete s3 object
router.post('/object', hasuraAuth, s3Controller.deleteS3Object);


module.exports = router;
