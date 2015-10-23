
var keg_size = 19500;  //milliters in a sixth barrel keg

var options = {
  width: "400", height: "50%",
  redFrom: 0, redTo: keg_size/1000 * 0.10,
  yellowFrom: keg_size/1000 * 0.10, yellowTo: keg_size/1000 * 0.30,
  minorTicks: 5,
  max: keg_size/1000
};

function normalize(val){
  return parseInt(val)/1000;
}

google.load("visualization", "1", {packages:["gauge"]});
var source = new EventSource('/stream');
source.addEventListener('message', function(e) {
  
  var data = JSON.parse(e.data);
  console.log(data);

  var d1 = google.visualization.arrayToDataTable([
     ['Keg', 'Mills'],
     [data[0].color,  normalize(keg_size - data[0].millis)]
  ]);
  var chart1 = new google.visualization.Gauge(document.getElementById('orange_div'));
  chart1.draw(d1, options);

  var d2 = google.visualization.arrayToDataTable([
     ['Keg', 'Mills'],
     [data[1].color,  normalize(keg_size - data[1].millis)]
  ]);
  var chart2 = new google.visualization.Gauge(document.getElementById('green_div'));
  chart2.draw(d2, options);


  var d3 = google.visualization.arrayToDataTable([
     ['Keg', 'Mills'],
     [data[2].color,  normalize(keg_size - data[2].millis)]
  ]);
  var chart3 = new google.visualization.Gauge(document.getElementById('yellow_div'));
  chart3.draw(d3, options);

 }, false);

