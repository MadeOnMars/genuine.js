common: {
    init: function() {
      console.log('common:init');
      // application-wide code
      if($('.socialShare')){
        var url = window.location.href;
        $('.socialShare .sharer').each(function(){
          $(this).attr('data-url', url);
        });
      }
      $( '.shareBtn' ).click(function() {
        $('.socialShare').toggleClass( 'open' );
      });
      $( '.navbtn, .overlay' ).click(function() {
        $( 'body' ).toggleClass( 'navigation' );
      });
      $( '.overlay, .navoverlay' ).click(function() {
        $( '.header nav ul li' ).removeClass( 'open' );
        $( '.header nav' ).removeClass( 'dropopen' );
      });
      if ($('.header nav ul li .dropdown').length > 0) {
        $('.header nav ul li .dropdown').parent().click(function() {
          $(this).addClass( 'open' );
          $('.header nav').addClass( 'dropopen' );
        });
      }
      $( '.modalbtn' ).click(function() {
        $('.modal').toggleClass( 'open' );
      });
      $( '.modaloverlay, .modalclose' ).click(function() {
        $('.modal').removeClass( 'open' );
      });
      $('.toggleTitle').click(function() {
        $(this).addClass('open');
        $(this).next('.toggleContent').show('slow');
        $('.toggleTitle').not(this).removeClass('open');
        $('.toggleTitle').not(this).next('.toggleContent').hide('slow');
        //$('.polyfill').objectFitPolyfill();
      });
      //$('.polyfill').objectFitPolyfill();
    }
  },
