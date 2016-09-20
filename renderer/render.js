var content,
    fs = require('fs')
    views = './views/'


function include(req_url, res){
  contents = contents = fs.readFileSync(views + req_url)
  var lastDot = req_url.lastIndexOf('.'),
      mimetype = lastDot == -1 ? 'text/plain' : {
        '.html' : 'text/html',
        '.ico' : 'image/x-icon',
        '.jpg' : 'image/jpeg',
        '.png' : 'image/png',
        '.mp4' : 'video/mp4',
        '.css' : 'text/css',
        '.js' : 'text/javascript'
      }[ req_url.substr(lastDot) ];
  res.setHeader('Content-type', mimetype)
  res.end(contents)
}

function post(username, req_url, res){
  contents = fs.readFileSync(views + 'page.html', 'utf8')
  contents = contents.replace('{{ link }}', 'https://www.' + req_url + '.com' + username)
  res.setHeader('X-Frame-Options', 'allowall')
  res.write(contents)
}

function view(filename, req, res){
  contents = fs.readFileSync(views + filename, 'utf8')
  res.setHeader('Content-type', 'text/html')
  res.write(contents)
}

module.exports.view = view
module.exports.include = include
module.exports.post = post
