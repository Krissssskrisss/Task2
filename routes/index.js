var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.sendFile('index.js', { root: './views' });
});

module.exports = router;
