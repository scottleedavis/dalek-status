
var run_timeout = 5000,
	cache = {},
	stream = {},
	data = {};

function run_fake() {
console.log("run_fake")
	data = {
		"keg_1": {
			"flow": 0
		},
		"keg_2": {
			"flow": 0
		},
		"keg_3": {
			"flow": 0
		}
	};
	
    cache.update(data, function(data){
        console.log(JSON.stringify(data,null,'  '));
        stream.trigger(data);
    });

    setTimeout(run_fake_iteration, run_timeout);

}

var ctr = 0;
function run_fake_iteration() {

	var keg = "keg_"+((ctr++ % 3)+1);
	data[keg].flow += 470;  //add another pint!

    cache.update(data, function(data){
        console.log(JSON.stringify(data,null,'  '));
        stream.trigger(data);
    });

    setTimeout(run_fake_iteration, run_timeout);
}

function run() {
	//TODO merge in emitter collection
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
		if( process.env.LIVE)
			run() 
		else
			run_fake();
	}
};