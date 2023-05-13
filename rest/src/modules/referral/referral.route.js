const router = require('express').Router();
const referralController = require('./referral.controller');
const authMiddleware = require('../auth/auth.middleware');


router.use(authMiddleware.decodeFirebaseIdToken);
router.use(authMiddleware.isAuthorized);

router.get('/:key', referralController.completeReferral);

module.exports = router