$(document).ready(function(){
  $('.scrollspy').scrollSpy();
});

$(document).ready(function(){
  var carousel_interval = 1000000;
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
  $('#introCarousel').on("tap",function(event) {
    if (event.originalEvent !== undefined && _.touchObject.swipeLength > 4 && event.cancelable) { event.preventDefault(); }
  //   if (e.type === 'mousedown') {
  //     e.preventDefault();
  //   }
  });
  // $('#introCarousel').on( 'mousedown', function(e) {
  //   stop();
  // });
  // $('#introCarousel').on( 'mouseup', function(e) {
  //   run();
  // });

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
  $('#moduleCarousel').on("tap",function(e) {
    if (e.type === 'mousedown') {
      e.preventDefault();
    }
    if (e.type === 'mouseup') {
      e.preventDefault();
    }
  });
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

