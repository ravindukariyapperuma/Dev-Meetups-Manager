const passport = require('passport');
const express = require('express');
var router = express.Router();

router.get('/', function (req, res) {
    res.render('pages/index.ejs'); // load the index.ejs file
});

router.get('/profile', isLoggedIn, function (req, res) {
    console.log("asrfadawd",req.user) // get the user out of session and pass to template

});

router.get('/error', isLoggedIn, function (req, res) {
    console.log("Error");
});

router.get('/auth/facebook', passport.authenticate('facebook', {
    scope: ['public_profile', 'email']
}));

router.get('/auth/facebook/callback',
    passport.authenticate('facebook', {
        successRedirect: '/profile',
        failureRedirect: '/failed'
    }));

router.get('/profile', (req, res) => {
    console.log("EFOIJEFOIJE")
    res.send("YOU ARE A VALID USER")
})

router.get('/failed', (req, res) => {
    console.log("ssssssssssssss")
    res.send("YOU ARE A NOT VALID USER")
})

router.get('/logout', function (req, res) {
    req.logout();
    res.redirect('/');
});

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()){
        console.log("HEREE")
        return next();
    }

    res.redirect('/');
}

module.exports = router;