const express = require("express");
const router = express.Router();
const request = require('request')

const github = require("../../services/githubService");

router.get("/", github.RequestUserAuthorization);

router.get("/redirect", github.getAccessToken);

router.get("/get_user_data", github.getUserData);

router.post("/create_repo", github.createRepo);

module.exports = router;