function home(req, res){
  res.write('home route')
}

function routeHandler(req, res){
  if (req.url === '/'){
    home(req, res)
  }
}

module.exports = routeHandler
