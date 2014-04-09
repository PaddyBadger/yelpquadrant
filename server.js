var http = require("http"),
    url = require("url"),
    fs = require('fs'),
    route = require("./router.js"),
    index;


function start() {

  fs.readFile('./index.html', function (err, data) {
    if (err) {
        throw err;
    }
    index = data;
  });
  
  function onRequest(request, response) {
  	var pathname = url.parse(request.url).pathname;
    console.log("Request for" + pathname + "received.");

    route(pathname);

    response.writeHead(200, {"Content-Type": "text/html"});
    response.write(index);
    response.end();
  }

  http.createServer(onRequest).listen(8888);
  console.log("Server has started");
}

exports.start = start;