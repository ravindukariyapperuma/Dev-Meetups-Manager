const express = require("express");
const router = express.Router();

const ZoomService = require("../../services/Zoom.services/Zoom.oauth.service");

router.get("/", ZoomService.getOAuthCode);

module.exports = router;