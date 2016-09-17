var Profile = require("./profile.js")
var renderer = require('./renderer.js')
var querystring = require('querystring')

var commonHeaders = {'Content-Type': 'text/html'}

// handle the http route  / (get and post)
function home(req, res){
  //if url == '/' && get
  if (req.url === '/'){
    if (req.method.toLowerCase() === 'get'){
    //show search
    res.writeHead(200, commonHeaders)
    renderer.view('header', {}, res)
    renderer.view('search', {}, res)
    renderer.view('footer', {}, res)
    res.end()
    }
    else{
      //if url == '/' && post

      //get the post data from the body
      req.on('data', function(postBody){
        //extract the username
        var query = querystring.parse(postBody.toString())
        //redirect to /:username
        res.writeHead(303, {'Location': '/' + query.username})
        res.end()
      })
    }
  }
}

// handle http route get /: username eg /chalkers
function user(req, res){
  //if url == '/...'
  var username = req.url.replace('/', '')
  if (username.length > 0){
    res.writeHead(200, commonHeaders)
    renderer.view('header', {}, res)

      //get json from treehouse
    var studentProfile = new Profile(username);
      // on 'end'
      studentProfile.on("end", function (profileJSON){
        //show Profile

        //store the values we need
        var values = {
          avatarUrl: profileJSON.gravatar_url,
          username: profileJSON.profile_name,
          badges: profileJSON.badges.length,
          javascriptPoints: profileJSON.points.JavaScript
        }
        // Simple response
        renderer.view('profile', values, res)
        renderer.view('footer', values, res)
        res.end()
      });

      //on 'error'
      studentProfile.on("error", function(error){
        //show error
        renderer.view('error', {errorMessage: error.message}, res)
        renderer.view('search', {}, res)
        renderer.view('footer', {}, res)
        res.end()
      });

        }
      }

module.exports.home = home
module.exports.user = user
