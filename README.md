httpstick
=========

Just a simple http server to set blinkstick color

## Install blinkstick
You need to use my fork of blinkstick-node https://github.com/chpeck/blinkstick-node

## Start the server
You might need to sudo if you are on linux
`$ sudo node server.js`

## curl it to set the color
`$ curl -X PUT "http://localhost:8080/?color=%23FF0000"`

## curl it to cycle between the colors
```
$ curl -X PUT
`http://localhost:8080/?colors=%23FF0000&colors=%2300FF00&colors=%230000FF"`

## curl turn it off
`$ curl -X DELETE "http://localhost:8080"`

## curl it to get the color
`$ curl "http://localhost:8080"`

