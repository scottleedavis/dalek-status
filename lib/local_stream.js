var dcapi = require('../lib/wt_dcapi');


var run_timeout = 5000,
    local_only = true,
	cache = {},
	stream = {},
	data = {},
    flow = {};

function collect(data){
    dcapi.send({payload: JSON.stringify(data)}, function(resp){
        console.log(resp.code + " : "+resp.raw.toString('base64'));
    });
}

function run_fake() {
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
	
    cache.update(data, function(d){
        console.log(JSON.stringify(d,null,'  '));
        stream.trigger(d);
    });

    setTimeout(run_fake_iteration, run_timeout);

}

var ctr = 0;
function run_fake_iteration() {

    function randomIntInc (low, high) {
        return Math.floor(Math.random() * (high - low + 1) + low);
    }

    var keg = randomIntInc(0,2);
	data[keg].millis += 470;  //millis in a pint'ish

    if( !local_only )
        collect(data);

    cache.update(data, function(d){
        console.log(JSON.stringify(d,null,'  '));
        stream.trigger(d);
    });

    setTimeout(run_fake_iteration, run_timeout);
}

function run() {
    flow = require('./flow_sensor');
    run_iteration();
}

function run_iteration() {

  flow.check({}, function(data){

    if( !local_only )
        collect(data);

    cache.update(data, function(d){
        console.log(JSON.stringify(d,null,'  '));
        stream.trigger(d);
    });
  });
  
  setTimeout(run_iteration, run_timeout);
}

function setStream(s,l){
    stream = s;
    local_only = l;
}

module.exports = {
	setCache: function(c){
		cache = c;
	},
	setStream: setStream,
	run: function() {
		if( process.env.LIVE )
			run() ;
		else
			run_fake();
	}
};