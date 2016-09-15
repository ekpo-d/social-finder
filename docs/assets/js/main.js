$(document).ready(function(){
  var interval,
      icons = ['.facebook', '.twitter', '.instagram', '.linkedin', '.github'],
      colors = ['#3b5998', '#36b9ff', '#bc39a8', '#007bb6', '#201e1f'],
      counter = 0, zIndex = 0, clicked = false

    icons.forEach(function(icon){
      $(icon).on('mouseenter', function(){
        $('.icon-container svg path').css('fill', 'white')
        $(icon + ' svg path').css('fill', '' + colors[icons.indexOf(icon)])
      })

      $(icon).on('click', function(){
        $(icon + ' svg path').css('fill', 'white')
        $('.drop').removeClass('animated fadeInDown')
        $('.drop').css('z-index', zIndex).addClass('animated fadeOutUp')

        $('.icon-container svg path').css('fill', 'white')
        $(icon + ' svg path').css('fill', '' + colors[icons.indexOf(icon)])
        $(icon + 'Input').removeClass('animated fadeOutUp')
        $(icon + 'Input').css('z-index', zIndex).addClass('animated fadeInDown')
      })
    })
    $('.b-round').click(function(){
      console.log('clicked')
      if ($('.all').css('display') === 'none'){
        $('.b-round').css('background-color', 'white')
        $('.b-round').css('color', 'black')
        $('.all').slideDown()
      }
      else{
        $('.b-round').css('background-color', 'transparent')
        $('.b-round').css('color', 'white')
        $('.all').slideUp()
      }
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
