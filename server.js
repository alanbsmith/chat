var path = require('path');
var express = require('express');
var app = express();
var PORT = process.env.PORT || 8080
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var Promise = require('promise');
var request = require('request-json');
var requestClient = request.createClient('http://localhost:3001/');


// using webpack-dev-server and middleware in development environment
if(process.env.NODE_ENV !== 'production') {
  var webpackDevMiddleware = require('webpack-dev-middleware');
  var webpackHotMiddleware = require('webpack-hot-middleware');
  var webpack = require('webpack');
  var config = require('./webpack.config');
  var compiler = webpack(config);

  app.use(webpackDevMiddleware(compiler, { noInfo: true, publicPath: config.output.publicPath }));
  app.use(webpackHotMiddleware(compiler));
}

app.use(express.static(path.join(__dirname, 'dist')));

app.get('/', function(request, response) {
  response.sendFile(__dirname + '/dist/index.html')
});

io.on('connection', function(client) {
  console.log('client connected!');

  client.on('join', function(data) {
    console.log(data);
  });

  client.on('new-message', function(data) {

    var promise = new Promise(function(resolve, reject) {
      console.log("inside the promise");
      var messageData = { message: data };
      requestClient.post('api/v1/messages', messageData, function(err, res, body) {
        if(err) {
          reject(err);
        }
        else {
          io.sockets.emit('add-message', body);
        }
      })
    });
  });
});

server.listen(PORT, function(error) {
  if (error) {
    console.error(error);
  } else {
    console.info("==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.", PORT, PORT);
  }
});
