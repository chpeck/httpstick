httpstick
=========

Just a simple http server to set blinkstick color

## Install blinkstick
```
npm i blinkstick
```

## Start the server
```
node server.js
```

## curl it to set the color
```
$ curl http://localhost:8080?rgb=11111
$ curl http://localhost:8080?r=255&g=255&b=255

