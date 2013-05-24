var http = require('http');
var blinkstick = require('blinkstick');
var url = require('url');
var querystring = require('querystring');
var blinkstick = require('blinkstick');

var led = blinkstick.findFirst();

var server = http.createServer(function(request, response) {
  var uri = url.parse(request.url);
  params = querystring.parse(uri.query);
  if (params.rgb)  {
    params.r = parseInt(params.rgb.substring(0,2), 16);
    params.g = parseInt(params.rgb.substring(2,4), 16);
    params.b = parseInt(params.rgb.substring(4,6), 16);
  }

  if (typeof(params.r) != 'undefined' &&
      typeof(params.g) != 'undefined' &&
      typeof(params.b) != 'undefined') {
    led.getColour(function(or, og, ob) {
      var rstep = (or - parseInt(params.r)) / 100.0;
      var gstep = (og - parseInt(params.g)) / 100.0;
      var bstep = (ob - parseInt(params.b)) / 100.0;
  
      var i = 0;
      var timer = setInterval(function() {
        i++;
        led.setColour(
            Math.floor(or - rstep*i), 
            Math.floor(og - gstep*i), 
            Math.floor(ob - bstep*i)
        );
        if (i == 100) clearInterval(timer);
      }, 10);
    });
  }
  response.writeHead(200, {'Content-Type': 'text/plain'});
  response.end('ok');
});

server.listen('8080');
