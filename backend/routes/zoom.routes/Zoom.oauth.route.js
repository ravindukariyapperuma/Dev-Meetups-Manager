const express = require("express");
const router = express.Router();
const request = require('request')

const ZoomService = require("../../services/Zoom.services/Zoom.oauth.service");

router.get("/", ZoomService.RequestUserAuthorization);

router.get("/redirect", ZoomService.RequestAccessToken);

router.get("/refresh", ZoomService.RefreshAccessToken);

router.get("/userdata", ZoomService.GetUserData);

router.post("/createmeeting", ZoomService.CreateMeeting);

router.get("/getmeetings", ZoomService.GetAllMeetings);

// router.delete("/deletemeeting", ZoomService.DeleteMeeting);

module.exports = router;