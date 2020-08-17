let express = require('express');
let router = express.Router();

const {
    isAdmin
} = require('../config/auth');

router.get('/', isAdmin, function (req, res, next) {
    res.render('index');
});

module.exports = router;