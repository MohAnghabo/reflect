let express = require('express');
let router = express.Router();

let passport = require('passport');

const {
    isLoggedIn
} = require('../config/auth');

router.get('/', (req, res, next) => {
    console.log("login route")
    res.render('login');
});

router.post('/', passport.authenticate('localAdmin', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true
}));

module.exports = router;