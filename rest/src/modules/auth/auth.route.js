const { hasuraAuth } = require('./auth.middleware');
const router = require('express').Router();
const authController = require('./auth.controller');
const authMiddleware = require('./auth.middleware');


router.post('/register', authMiddleware.decodeFirebaseIdToken, authMiddleware.isAuthorized, authController.registerUser)


module.exports = router;