var http = require('http');
var blinkstick = require('blinkstick');
var url = require('url');
var querystring = require('querystring');
var blinkstick = require('blinkstick');

var led = blinkstick.findFirst();
var timer = null;
var server = http.createServer(function(request, response) {
  response.writeHead(200, {'Content-Type': 'application/json'});
  if ('PUT' == request.method) {
  var uri = url.parse(request.url);
    if (timer) clearInterval(timer);
    params = querystring.parse(uri.query);
    if (params.rgb)  {
      params.r = parseInt(params.rgb.substring(0,2), 16);
      params.g = parseInt(params.rgb.substring(2,4), 16);
      params.b = parseInt(params.rgb.substring(4,6), 16);
    }
  
    var duration = 1000;
    var steps = 100;
    if (params.duration) {
      duration = parseInt(params.duration); 
    }
    if (params.steps) {
      steps = parseInt(params.steps);
    }
    if (typeof(params.r) != 'undefined' &&
        typeof(params.g) != 'undefined' &&
        typeof(params.b) != 'undefined') {
      led.getColour(function(or, og, ob) {
        var rstep = (or - parseInt(params.r)) / steps;
        var gstep = (og - parseInt(params.g)) / steps;
        var bstep = (ob - parseInt(params.b)) / steps;
        var i = 0;
        timer = setInterval(function() {
          i++;
          var r = Math.floor(or - rstep*i);
          var g = Math.floor(og - gstep*i);
          var b = Math.floor(ob - bstep*i);
          led.setColour(r,g,b);
          if (i == steps) {
            response.end(JSON.stringify({'r':r, 'g':g, 'b':b}));
            clearInterval(timer);
          }
        }, duration/steps);
      });
    }
  } 
  if ('GET' == request.method) {
    led.getColour(function(r, g, b) {
      response.end(JSON.stringify({'r':r, 'g':g, 'b':b}));
    });
  }

  if ('DELETE' == request.method) {
    led.turnOff();
    response.end(JSON.stringify({'r':0, 'g':0, 'b':0}));
  }
});

server.listen('8080');
