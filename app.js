var router = require('./router.js')
// Problem:
// we need a simple way to look at a user's badge
// count and Javascript points from a web browser

// Solution:
// use node.js to perform the profile look ups
// and serve our templates via HTTP

// create a web server
var http = require('http')
http.createServer(function(req, res){
  res.writeHead(200, {'Content-Type': 'text/plain'})
  router.home(req, res)
  router.user(req, res)
  // res.end('the end of the code.')
}).listen(5000, '127.0.0.1')
console.log('server is running')
