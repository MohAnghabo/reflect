let express = require('express');
let router = express.Router();

let passport = require('passport');

const {
    isLoggedIn
} = require('../config/auth');

router.get('/', isLoggedIn, (req, res, next) => {
    let flash_message = req.flash('error');
    console.log("login route")
    res.render('login', {
        message: flash_message
    });
});

router.post('/', passport.authenticate('localAdmin', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true
}));

module.exports = router;