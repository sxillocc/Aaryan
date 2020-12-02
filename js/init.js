(function($){
  $(function(){

    $('.sidenav').sidenav();

  }); // end of document ready
})(jQuery); // end of jQuery name space

$(".dropdown-trigger").dropdown();

$(document).ready(function(){
  $('.modal').modal();
});
$(document).ready(function(){
  $('.datepicker').datepicker({
    minDate: new Date(1955,1,1),
    maxDate: new Date(2011,1,1),
    defaultDate: new Date(2000,1,1)
  });
});
