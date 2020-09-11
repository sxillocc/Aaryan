$(document).ready(function(){
  $('.scrollspy').scrollSpy();
});

$(document).ready(function(){
  var carousel_interval = 8000;
  $('#introCarousel').carousel();
  $('#introCarousel').carousel({
    fullWidth: true,
    indicators: true,
    onCycleTo: function (ele) {
      console.log(ele);
      console.log($(ele).index()); // the slide's index
      if($(ele).children().hasClass("i1")){
        var e = $(ele).children()[0];
        var req = $(e).children()[1];
        var req2 = $(e).children()[2];
        $(req).removeClass("visible");
        $(req).addClass("invisible");
        $(req2).addClass("slide-in-left");
        setTimeout(function() {
            $(req2).removeClass("slide-in-left");
        }, 2000);
        setTimeout(function(){
          $(req2).removeClass("invisible");
          $(req).addClass("visible");
          $(req).addClass("slide-in-left");
        }, 500);
        setTimeout(function(){
          $(req).removeClass("slide-in-left");
        }, 2000);
      }
    }
  });
  function run(){
      int = setInterval(function()
      { 
          $('#introCarousel').carousel('next');
      }, carousel_interval);
  }
  run();
  function stop(){
    clearInterval(int);
  }
  $('#moveNextCarousel').click(function (e) {
    e.preventDefault();
    e.stopPropagation();
    $('#introCarousel').carousel('next');
  });
  $('#movePrevCarousel').click(function (e) {
    e.preventDefault();
    e.stopPropagation();
    $('#introCarousel').carousel('prev');
  });
});


$(document).ready(function(){
  var carousel_interval = 8000;
  $('#moduleCarousel').carousel();
  function run(){
      int = setInterval(function()
      { 
          $('#moduleCarousel').carousel('next');
      }, carousel_interval);
  }
  run();
  function stop(){
    clearInterval(int);
  }
  $('#next-module').click(function (e) {
    e.preventDefault();
    e.stopPropagation();
    stop();
    $('#moduleCarousel').carousel('next');
    run();
  });
  $('#prev-module').click(function (e) {
    e.preventDefault();
    e.stopPropagation();
    stop();
    $('#moduleCarousel').carousel('prev');
    run();
  });
});