var NodeCache = require( "node-cache" );

module.exports.store = new NodeCache({
  dalekState: {}
});

module.exports.update = function(data, callback){

  module.exports.store.get( "dalekState", function( err, store ){
    if( !err ){
      if( store === undefined || store.dalekState === undefined ){
        module.exports.store.set( "dalekState", data, function( err, success ){
          callback(data);
        });
      } else {

        module.exports.store.set( "dalekState", store.dalekState, function( err, success ){
          callback(store.dalekState);
        });
      }
    }
  });
 
};

