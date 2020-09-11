(function($){
  $(function(){

    $('.sidenav').sidenav();

  }); // end of document ready
})(jQuery); // end of jQuery name space

$(".dropdown-trigger").dropdown();

$('.post-wrapper').slick({
  slidesToShow: 3,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 2000,
});