var http = require('http'),
    router = require('./router/router.js')

function mainProcess(req, res){
  router.routeHandler(req, res)
}

http.createServer(mainProcess).listen(process.env.PORT || 8080)
console.log('server is running')
