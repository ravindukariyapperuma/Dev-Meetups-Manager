const express = require("express");
const router = express.Router();
const request = require('request')
const googleAuthService = require('../../services/Googleservices/googleAuthServices');
const upload  = require('../../services/uploadMiddleWare/upload');


router.get("/getAuthURL",googleAuthService.getAuthUrlService);

router.get("/oauth", googleAuthService.OauthService);

router.post("/create-event", googleAuthService.googleCreateEventService);

router.get('/user-info', googleAuthService.googleUserInfo);

router.post("/upload-files",upload.single('file'),googleAuthService.googleDriveUpload);

module.exports = router;