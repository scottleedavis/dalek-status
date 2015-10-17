var rest = require('restler'),
       _ = require('underscore');

var dcsid = process.env.DCSID;  //webtrends.com
var idUrl = 'http://dc.webtrends.com/v1/'+dcsid+'/ids.svc'
var eventUrl = 'http://dc.webtrends.com/v1/'+dcsid+'/events.svc';
var scsUrl = 'http://scs.webtrends.com/'+dcsid+'/dcs.gif?';

var headers = {
  'connection': 'close',
  'user-agent': 'dalek-stream',
  'Content-Type': 'application/x-www-form-urlencoded',
  'accept-encoding': 'identity'
};

function sendToSCS(payload, callback){

  rest.post(idUrl, {
    headers: headers
  }).on('complete', function(data, response) {
    var jsonData = {
      dcssip: "localhost",
      dcsuri: "/dalek/stream",
      "WT.ti": "Dalek Stream Info",
      "WT.co_f": response.rawEncoded
    };

    var data = _.extend(jsonData,payload);
    var params = Object.keys(data).map(function(k) {
      return encodeURIComponent(k) + '=' + encodeURIComponent(data[k])
    }).join('&');

    var stream_url =scsUrl+params;
    rest.get(stream_url, {
      headers: headers
    }).on('complete', function(data, response) {
      callback({
        code: response.statusCode,
        raw: response.rawEncoded
      });
    });
  });


}
function sendToCDAPI(payload, callback){

  rest.post(idUrl, {
    headers: headers
  }).on('complete', function(data, response) {
    var jsonData = {
      dcssip: "localhost",
      dcsuri: "/dalek/stream",
      "WT.ti": "My NodeJS Test",
      "WT.co_f": response.rawEncoded
    };
    
    rest.post(eventUrl, {
      data: _.extend(jsonData,payload),
      headers: headers
    }).on('complete', function(data, response) {
      callback({
        code: response.statusCode,
        raw: response.rawEncoded
      });
    });

  });
}

module.exports = {
  send: function (payload, callback) {
    sendToSCS(payload, callback);
  }
};
