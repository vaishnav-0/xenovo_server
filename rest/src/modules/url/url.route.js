const router = require('express').Router();
const urlController = require('./url.controller');


router.get('/:key', urlController.redirect);

module.exports = router