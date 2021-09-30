require('dotenv/config')

const express = require('express');
const { LocalStorage } = require("node-localstorage");
const app = express();
const cors = require("cors");
require('dotenv').config()
const passport = require('passport');
const session = require('express-session');
const fbAuth = require('./routes/fbAuth')
app.use(express.json());

const facebookStrategy = require('passport-facebook').Strategy


// Google OAuth Routes

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(require('cookie-parser')());
app.use(session({ secret: 'keyboard cat', resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());
app.use(cors())
// Google OAuth Routes

// Zoom OAuth Routes
const ZoomOAuthRoute = require("./routes/zoom.routes/Zoom.oauth.route");
app.use("/zoomOAuth", ZoomOAuthRoute);

app.use('/fbOauth', fbAuth);

app.listen(process.env.PORT, () => {
    console.log("🚀 Server started on port 5000");
});
