var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.send(req.query.idT+"<br/>"+req.query.time+"<br/>"+req.query.room);
});

module.exports = router;