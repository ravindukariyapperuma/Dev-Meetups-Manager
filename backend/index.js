const express = require('express');
const app = express();

const passport = require('passport');
const session = require('express-session')

const facebookStrategy = require('passport-facebook').Strategy



































































const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(require('cookie-parser')());
app.use(session({ secret: 'keyboard cat', resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

passport.use(new facebookStrategy({
    clientID: "2110538005761015",
    clientSecret: "7b5d28baadf309ab576b12be1f481023",
    callbackURL: "http://localhost:5000/auth/facebook/secrets"
},
    function (token, refreshToken, profile, done) {
        console.log("HELLLO")
        console.log("TOKEN", token)
        console.log("TOKEN refreshToken", refreshToken)
        console.log("TOKEN refreshToken", done)
        console.log("TOKEN refreshToken", profile)
    }))

app.get('/auth/facebook', passport.authenticate('facebook'))

app.get('/auth/facebook/secrets', passport.authenticate('facebook', {successRedirect:'/profile', failaureRedirect:'/failed'}))

app.get('/profile', (req, res) => {
    console.log("EFOIJEFOIJE")
    res.send("YOU ARE A VALID USER")
})

app.get('/failed', (req, res) => {
    console.log("ssssssssssssss")
    res.send("YOU ARE A NOT VALID USER")
})

passport.serializeUser(function (user, done) {
    done(null, user)
})
passport.deserializeUser(function (id, done) {
    return done(null, id)
})
app.listen(5000,(err)=>{
    if (err){
        console.error(err)
    }
    console.log(`Connected to port ${5000}`)
});
