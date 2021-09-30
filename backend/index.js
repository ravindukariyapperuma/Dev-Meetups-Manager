require('dotenv/config')
const express = require('express');
const app = express();
const cors = require("cors");
require('dotenv').config()
const passport = require('passport');
const session = require('express-session');
const bodyParser = require('body-parser');

const googleOAuthRoute = require("./routes/googleAuth/googleAuthRoute");
const fbAuth = require('./routes/fbAuth')
const ZoomOAuthRoute = require("./routes/zoom.routes/Zoom.oauth.route");

app.use(express.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(require('cookie-parser')());
app.use(session({ secret: 'keyboard cat', resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());
app.use(cors());


// Google OAuth Routes
app.use("/googleOAuth",googleOAuthRoute);

// Zoom OAuth Routes
app.use("/zoomOAuth", ZoomOAuthRoute);

// Facebook OAuth Routes
app.use('/fbOauth', fbAuth);


app.listen(process.env.PORT, () => {
    console.log("🚀 Server started on port " + process.env.PORT);
});
