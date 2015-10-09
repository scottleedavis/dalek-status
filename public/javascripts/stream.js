
google.load("visualization", "1", {packages:["corechart"]});
google.setOnLoadCallback(drawVisualization);

function drawVisualization() {

	var data = google.visualization.arrayToDataTable([
     ['Keg', 'Mills'],
     ['Keg 1',  0],
     ['Keg 2',  0],
     ['Keg 2',  0]
  ]);

var options = {
  title : 'Dalek Pour stats',
  vAxis: {title: 'Milliters Poured'},
  hAxis: {title: 'Keg'},
  seriesType: 'bars'
};

var chart = new google.visualization.ComboChart(document.getElementById('chart_div'));
//chart.draw(data, options);


var source = new EventSource('/stream');
source.addEventListener('message', function(e) {
  
  var raw_data = JSON.parse(e.data);
  console.log(data);
  var data = google.visualization.arrayToDataTable([
     ['Keg', 'Mills'],
     ['Keg 1',  raw_data['keg_1'].flow],
     ['Keg 2',  raw_data['keg_2'].flow],
     ['Keg 2',  raw_data['keg_3'].flow]
  ]);
  chart.draw(data, options);

 }, false);


		  }

