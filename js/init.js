(function($){
  $(function(){

    $('.sidenav').sidenav();

  }); // end of document ready
})(jQuery); // end of jQuery name space

$(document).ready(function(){
  $('.parallax').parallax();
});

$(document).ready(function(){
  $('.scrollspy').scrollSpy();
});

$(document).ready(function(){
  var carousel_interval = 2000;
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
});
$(document).ready(function(){
  var carousel_interval = 2000;
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
});
$(document).ready(function(){
  $('.collapsible').collapsible();
});

// $('#carousel-next').click(function () {
//   $('#introCarousel').carousel('next');
// });

// $('#carousel-prev').click(function(){
//   $('#introCarousel').carousel('prev');
// });