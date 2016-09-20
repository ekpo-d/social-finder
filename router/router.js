var render = require('./../renderer/render.js'),
    querystring = require('querystring'),
    pages = ['facebook', 'twitter', 'instagram', 'linkedin', 'github']

function home(req, res){
  render.view('index.html', req, res)
  res.end()
}

function all(req, res){
  render.view('all.html', req, res)
  res.end()
}

function pageFunc(req_url, req, res){
  if (req.method.toLowerCase() === 'get'){
    render.view(req_url + '.html', req, res)
    res.end()
  }
  else if (req.method.toLowerCase() === 'post'){
    req.on('data', function(postBody){
      var query = querystring.parse(postBody.toString())
      if (req_url === 'linkedin'){
        res.writeHead(303, {'Location': 'https://www.' + req_url + '.com/in/' + query.username})
      }
      else{
      res.writeHead(303, {'Location': 'https://www.' + req_url + '.com/' + query.username})
      // res.writeHead(303, {'Location': '/' + req_url + '/' + query.username})
      }
      res.end()

    })
  }
}

function error404(req, res){
  render.view('404.html', req, res)
  res.end()
}

function routeHandler(req, res){
  var username,
      req_url = req.url.replace('/', '')

  pages.forEach(function(page){
    function changeValue(){
      if (req_url.match('/')){
        username = req_url.slice(req_url.indexOf('/'))
        req_url = req_url.slice(0, req_url.indexOf('/'))
      }
    }
    if (req_url.match(page)){
      changeValue()
    }
  })
  if (req_url === '') home(req, res)
  else if (req_url === 'all') all(req, res)
  else if (pages.indexOf(req_url) !== -1){
    if (typeof username === 'string'){
      render.post(username, req_url, res)
      res.end()
    }
    else{
      pageFunc(req_url, req, res)
    }
  }
  else if (req_url.match('assets'))
    render.include(req_url, res)
  else  error404(req, res)
}

module.exports.routeHandler = routeHandler
