$(document).ready(function(){
  $('.scrollspy').scrollSpy();
});

$(document).ready(function(){
  var carousel_interval = 10000;
  $('#introCarousel').carousel();
  $('#introCarousel').carousel({
    fullWidth: true,
    indicators: true
  });
  var int;
  function run(){
      int = setInterval(function()
      { 
          $('#introCarousel').carousel('next');
      }, carousel_interval);
  }
  function stop(){
    clearInterval(int);
  }
  $('#introCarousel').on( 'mousedown', function(e) {
    stop();
  });
  $('#introCarousel').on( 'mouseup', function(e) {
    run();
  });

  // $('#introCarousel').click(stop);
  run();
  // $('#introCarousel').hover(stop, run);
  $('.moveNextCarousel').click(function (e) {
    e.preventDefault();
    e.stopPropagation();
    $('#introCarousel').carousel('next');
  });
  $('.movePrevCarousel').click(function (e) {
    e.preventDefault();
    e.stopPropagation();
    $('#introCarousel').carousel('prev');
  });
});
$(document).ready(function(){
  var carousel_interval = 5000;
  $('#moduleCarousel').carousel();
  var int;
  function run(){
      int = setInterval(function()
      { 
          $('#moduleCarousel').carousel('next');
      }, carousel_interval);
  }
  function stop(){
    clearInterval(int);
  }
  run();
  $('#moduleCarousel').on( 'mousedown', function(e) {
    stop();
  });
  $('#moduleCarousel').on( 'mouseup', function(e) {
    run();
  });
  $('.nextModule').click(function (e) {
    $('#moduleCarousel').carousel('next');
  });
  $('.prevModule').click(function (e) {
    $('#moduleCarousel').carousel('prev');
  });
});

