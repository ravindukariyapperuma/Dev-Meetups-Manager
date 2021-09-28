require('dotenv/config')
const express = require("express");

const cors = require("cors");



const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Google OAuth Routes

// Zoom OAuth Routes
const ZoomOAuthRoute = require("./routes/zoom.routes/Zoom.oauth.route");
app.use("/zoomOAuth", ZoomOAuthRoute);

// Facebook OAuth Routes

// GitHub OAuth Routes

app.listen('5000', () => {
    console.log("🚀 Server started on port 5000");
  });