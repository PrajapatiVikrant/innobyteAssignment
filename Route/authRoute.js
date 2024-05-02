const express = require('express')
const router = express.Router();
const auth = require('../Controller/Auth');
router.post('/login',auth.Login);
router.post('/signup',auth.SignUp)


module.exports = router;