const express = require('express');
var router = express.Router();
const FacebookService = require("../../services/facebook.services/facebook.services");

router.get("/", FacebookService.getFBAuthCode);

router.get("/redirect", FacebookService.RequestAccessToken);

router.get("/userInfo", FacebookService.getUserInfo);

router.get("/getPageInfo", FacebookService.getPageInfo);

router.post("/publishPost", FacebookService.publishPost)

module.exports = router;