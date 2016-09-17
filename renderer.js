var fs = require('fs')

function mergeValues(values, content){
  //circle over the keys
  for (var key in values){
    //replace all {{key}} with the value from the values object
    content = content.replace('{{' + key + '}}', values[key])
    }
    //return merged content
    return content
}

function view(template, values, res){
  //read from the template file
  var fileContents = fs.readFileSync('./views/' + template + '.html', {encoding: 'utf8'})
  //insert values in the content
  fileContents = mergeValues(values, fileContents)
  //write out to the response
  res.write(fileContents)
}
module.exports.view = view
