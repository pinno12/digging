var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('digging', { title: '디깅' });
});

module.exports = router;
