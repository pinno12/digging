var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('subtract', { title: '뺄셈 암산 게임' });
});

module.exports = router;
