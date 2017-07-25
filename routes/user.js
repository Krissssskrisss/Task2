var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('Hi get');
});

router.post('/', function(req, res, next) {
  res.send('Hi post');
});

router.put('/', function(req, res, next) {
  res.send('Hi put');
});

router.delete('/', function(req, res, next) {
  res.send('Hi delete');
});

module.exports = router;