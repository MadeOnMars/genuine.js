pages: {
  init: function() {
    console.log("pages:init");
    // controller-wide code
  },
  legalNotice: function() {
    console.log("pages:legalNotice");
    // controller-wide code
  },
  /* GENUINE */
  index: function() {
    console.log("pages:index");
    // action-specific code

    onResizeFunctions.index = function(w,h){
      console.log('Do something specific for this page on resize', w, h);
    }

    var mySwiper1 = new Swiper ('.slidehome', {
      direction: 'horizontal',
      loop: false,
      effect: 'slide',
      speed: 800,
      autoplay: 6000,
      pagination: '.slidehome .swiper-pagination',
      paginationClickable: true,
      prevButton: '.slidehome .swiper-button-prev',
      nextButton: '.slidehome .swiper-button-next',
      autoplayDisableOnInteraction: false,
      preventClicks: false,
      preventClicksPropagation: false,
      touchEventsTarget: 'container'
    });

    var $grid = $('.grid').masonry({
      itemSelector: '.grid-item',
      columnWidth: '.grid-sizer',
      percentPosition: true
    });
  }
},
