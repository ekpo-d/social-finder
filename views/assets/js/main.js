$(document).ready(function(){
  var interval,
      icons = [ '.facebook', '.twitter', '.instagram', '.linkedin', '.github'],
      colors = [ '#3b5998', '#36b9ff', '#bc39a8', '#007bb6', '#201e1f'],
      counter = 0

    icons.forEach(function(icon){
      $(icon).on('mouseenter', function(){
        $('.icon-container svg path').css('fill', 'white')
        $(icon + ' svg path').css('fill', '' + colors[icons.indexOf(icon)])
      })
    })

  function intervalFunc(){
    interval = setInterval(function(){
      if (counter !== 5){
        $('.links svg path').css('fill', 'white')
        $(icons[counter] + ' svg path').css('fill', '' + colors[counter])
        counter++
      }
      else{
        counter = 0
      }
    }, 2000)
  }

  $('.links').on('mouseleave', function(){
    intervalFunc()
  })
  $('.links').on('mouseenter', function(){
    clearInterval(interval)
  })
  intervalFunc()
})
