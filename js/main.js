$(document).ready(function(){
  $('.parallax').parallax();
});

$(document).ready(function(){
  $('.scrollspy').scrollSpy();
});

$(document).ready(function(){
  var carousel_interval = 20000;
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
  $('#introCarousel').hover(stop, run);
  $('.moveNextCarousel').click(function (e) {
    // print("next");
    e.preventDefault();
    e.stopPropagation();
    $('#introCarousel').carousel('next');
  });
  $('.movePrevCarousel').click(function (e) {
    // print("next");
    e.preventDefault();
    e.stopPropagation();
    $('#introCarousel').carousel('prev');
  });
});
$(document).ready(function(){
  var carousel_interval = 10000000;
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
  $('#moduleCarousel').hover(stop, run);
  $('.nextModule').click(function (e) {
    // print("next");
    e.preventDefault();
    e.stopPropagation();
    $('#moduleCarousel').carousel('next');
  });
  $('.prevModule').click(function (e) {
    // print("next");
    e.preventDefault();
    e.stopPropagation();
    $('#moduleCarousel').carousel('prev');
  });
});
$(document).ready(function(){
  $('.collapsible').collapsible();
});
$(document).ready(function(){
  $('.fixed-action-btn').floatingActionButton();
});
$(document).ready(function(){
  $('.modal').modal();
});

