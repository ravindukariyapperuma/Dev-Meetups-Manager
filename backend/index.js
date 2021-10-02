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
app.use(cors())
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(require('cookie-parser')());
app.use(session({ secret: 'keyboard cat', resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

// Google OAuth Routes

// Zoom OAuth Routes
const ZoomOAuthRoute = require("./routes/zoom.routes/Zoom.oauth.route");
app.use("/zoomOAuth", ZoomOAuthRoute);

// Facebook OAuth Routes

// GitHub OAuth Routes
const gitHubRoute = require("./routes/githubOauth");
app.use("/github", gitHubRoute);





passport.use(new facebookStrategy({
    clientID: process.env.clientID,
    clientSecret: process.env.clientSecret,
    callbackURL: process.env.callbackURL,
    profileFields: ['id', 'displayName']
},
    function (token, refreshToken, profile, done) {
        console.log("TOKEN", token)
        if (typeof localStorage === "undefined" || localStorage === null) {
            var LocalStorage = require('node-localstorage').LocalStorage;
            localStorage = new LocalStorage('./scratch');
        }
        localStorage.setItem('fbToken', token);
        return done(null, profile)
    }))

passport.serializeUser(function (user, done) {
    done(null, user)
})

passport.deserializeUser(function (id, done) {
    return done(null, id)
})


app.use('/', fbAuth);

app.listen(process.env.PORT, () => {
    console.log("🚀 Server started on port 5000");
});
