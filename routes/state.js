var express = require('express');
var router = express.Router();
var cache;

router.get('/', function(req, res) {

  cache.store.get( "dalekState", function( err, value ){
    if( !err ){
      res.json(value);
    } else {
      res.send(err);
    }
  });
});

router.setCache = function(c){
  cache = c;
}

module.exports = router;
