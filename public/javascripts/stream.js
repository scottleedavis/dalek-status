var options = {
  width: "400", height: "50%",
  redFrom: 0, redTo: 10,
  yellowFrom:10, yellowTo: 30,
  minorTicks: 5
};

google.load("visualization", "1", {packages:["gauge"]});

var source = new EventSource('/stream');
source.addEventListener('message', function(e) {
  
  var data = JSON.parse(e.data);
  console.log(data);

  var d1 = google.visualization.arrayToDataTable([
     ['Keg', 'Mills'],
     [data[0].color,  data[0].millis]
  ]);
  var chart1 = new google.visualization.Gauge(document.getElementById('orange_div'));
  chart1.draw(d1, options);

  var d2 = google.visualization.arrayToDataTable([
     ['Keg', 'Mills'],
     [data[1].color,  data[1].millis]
  ]);
  var chart2 = new google.visualization.Gauge(document.getElementById('green_div'));
  chart2.draw(d2, options);


  var d3 = google.visualization.arrayToDataTable([
     ['Keg', 'Mills'],
     [data[2].color,  data[2].millis]
  ]);
  var chart3 = new google.visualization.Gauge(document.getElementById('yellow_div'));
  chart3.draw(d3, options);

 }, false);

