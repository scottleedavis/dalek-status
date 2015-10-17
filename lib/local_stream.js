
var run_timeout = 5000,
	cache = {},
	stream = {},
	data = {},
    flow = {};

function run_fake() {
	data = [
		{
            "id": 18,
			"millis": 0,
            "pouring": false
		},
        {
            "id": 19,
			"millis": 0,
            "pouring": false
		},
		{
            "id": 20,
			"millis": 0,
            "pouring": false
		}
	];
	
    cache.update(data, function(data){
        console.log(JSON.stringify(data,null,'  '));
        stream.trigger(data);
    });

    setTimeout(run_fake_iteration, run_timeout);

}

var ctr = 0;
function run_fake_iteration() {

	var keg = ((ctr++ % 3));
	data[keg].millis += 470;  //add another pint!

    cache.update(data, function(data){
        console.log(JSON.stringify(data,null,'  '));
        stream.trigger(data);
    });

    setTimeout(run_fake_iteration, run_timeout);
}

function run() {
    flow = require('./flow_sensor');
    run_iteration();
}

function run_iteration() {
  flow.check({}, function(data){
    cache.update(data, function(data){
        console.log(JSON.stringify(data,null,'  '));
        stream.trigger(data);
    });
  });
  
  setTimeout(run_iteration, run_timeout);
}

function setStream(s){
    stream = s;
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