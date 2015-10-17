var collect = require('./lib/wt_dcapi'),
    wifi = require('./lib/wifi_sensor'),
    flow = require('./lib/flow_sensor');
var polling_period = 5000;

function checkState(data){
  flow.check(data, function(data){
    wifi.check(data, function(data){
      collect.send(data, function(state){
        console.log(JSON.stringify({
          sent: data,
          recv: state
        },null,'  '));
      });
    });
  });
  setTimeout(checkState, polling_period,{});
}

checkState({});


