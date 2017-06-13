const $ = require('jquery');
const Swiper = require('swiper');
const jQueryBridget = require('jquery-bridget');
const Masonry = require('masonry-layout');

// make Masonry a jQuery plugin
jQueryBridget( 'masonry', Masonry, $ );

const pages = {
  init: () => {
    console.log("pages:init");
    // controller-wide code
  },
  legalNotice: () => {
    console.log("pages:legalNotice");
    // controller-wide code
  },
  /* GENUINE */
  index: () => {
    console.log("pages:index");
    // action-specific code

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
};

module.exports = pages;
