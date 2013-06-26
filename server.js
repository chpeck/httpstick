var http = require('http');
var url = require('url');
var querystring = require('querystring');
var blinkstick = require('blinkstick');
var led = blinkstick.findFirst();
led.setInverse(true);
led.setDuration(1000);
led.setSteps(100);

var server = http.createServer(function(request, response) {
  response.writeHead(200, {'Content-Type': 'application/json'});
  if ('PUT' == request.method) {
    var uri = url.parse(request.url);
    params = querystring.parse(uri.query);
    if (params.duration) {
      led.setDuration(parseInt(params.duration)); 
    }
    if (params.steps) {
      led.setSteps(parseInt(params.steps));
    }
    if (params.colors) {
      led.cycle(params.colors);
      response.end(JSON.stringify(params.colors));
    } else if (params.color) {
      led.setColor(params.color);
      response.end(JSON.stringify(params.color));
    }
  } 
  if ('GET' == request.method) {
    led.getColor(function(err, r, g, b) {
      response.end(JSON.stringify({'r':r, 'g':g, 'b':b}));
    });
  }

  if ('DELETE' == request.method) {
    led.turnOff();
    response.end(JSON.stringify({'r':0, 'g':0, 'b':0}));
  }
});

server.listen('8080');
