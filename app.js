var http = require('http'),
  router = require('./router/router.js')

function mainProcess(req, res){
  res.writeHead(200, {'Content-Type' : 'text/plain'})
  router.routeHandler(req, res)
  res.end()
}

http.createServer(mainProcess).listen(process.env.PORT || 8080)
console.log('server is running')
