const express = require('express')
const router = express.Router();
const profile = require('../Controller/Profile');
const jwtVerify = require('../Middleware/jwtVerify')
router.get('/',jwtVerify,profile.displayProfile);
router.post('/',jwtVerify,profile.createProfile)
router.put('/',jwtVerify,profile.editProfile)

module.exports = router;