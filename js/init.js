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
  $('.carousel').carousel({
    indicators: true
  });
  window.setInterval(function(){$('.carousel').carousel('next')},3000)
});
$(document).ready(function(){
  $('.collapsible').collapsible();
});
$('.carousel.carousel-slider').carousel({
  fullWidth: true,
  indicators: true
});