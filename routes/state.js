var express = require('express'),
    router = express.Router(),
    flow = require('../lib/flow_sensor');

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

router.get('/reset', function(req, res) {
  cache.reset();
  cache.store.get( "dalekState", function( err, s ){
    if( !err ){
      if( s !== undefined ){
        flow.init(s)
      }
    }
  });
  res.json({reset: "complete"})
});

router.setCache = function(c){
  cache = c;
}

module.exports = router;
