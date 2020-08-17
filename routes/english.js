var express = require('express');
var router = express.Router();

const {
  isAdmin
} = require('../config/auth');

router.get('/', isAdmin, function(req, res, next) {
  res.render('english');
});

module.exports = router;
