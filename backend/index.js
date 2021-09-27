const express = require("express");

const app = express();
const cors = require("cors");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Google OAuth Routes

// Zoom OAuth Routes
const ZoomRoute = require("./routes/zoom.routes/Zoom.oauth.route");
app.use("/zoomOAuth", ZoomRoute);

// Facebook OAuth Routes

// GitHub OAuth Routes

app.listen('5000', () => {
    console.log("🚀 Server started on port 5000");
  });