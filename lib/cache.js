var NodeCache = require( "node-cache" ),
    jsonfile = require('jsonfile'),
    path = require('path');

try {
  var data = jsonfile.readFileSync(path.resolve(__dirname,"dalekState.json"), {encoding: "utf8"});
} catch ( e ) {
  var data = {}
}

store = new NodeCache();
store.set("dalekState",data);

function update(data, callback){

  store.get( "dalekState", function( err, s ){
    if( !err ){
      if( s === undefined ){
        jsonfile.writeFileSync(path.resolve(__dirname,"dalekState.json"), data);
        store.set( "dalekState", data, function( err, success ){
          callback(data);
        });
      } else {
        jsonfile.writeFileSync(path.resolve(__dirname,"dalekState.json"), data);
        store.set( "dalekState", data, function( err, success ){
          callback(data);
        });
      }
    }
  });
 
};

function reset(){
      data = [
        {
            "id": 17,
            "color": "orange",
            "millis": 0,
            "pouring": false
        },
        {
            "id": 27,
            "color": "green",
            "millis": 0,
            "pouring": false
        },
        {
            "id": 22,
            "color": "yellow",
            "millis": 0,
            "pouring": false
        }
    ];
    update(data, function(f){});
}
module.exports = {
  update: update,
  store: store,
  reset: reset
}
