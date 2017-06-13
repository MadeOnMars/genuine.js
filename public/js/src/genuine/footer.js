
};

global.UTIL = {
  exec: function( controller, action ) {
    var ns = GENUINE,
        action = ( action === undefined ) ? "init" : action;

    if ( controller !== "" && ns[controller] && typeof ns[controller][action] == "function" ) {
      ns[controller][action]();
    }
  },

  init: function() {
    var body = document.body,
        controller = body.getAttribute( "data-controller" ),
        action = body.getAttribute( "data-action" );

    UTIL.exec( "common" );
    UTIL.exec( controller );
    UTIL.exec( controller, action );

    // This code below deals with responsivity
    $(window).resize(function(){
      onResizeFunctions.common($(this).width(),$(this).height());
      if(typeof(onResizeFunctions[action]) == 'function'){
          onResizeFunctions[action]($(this).width(),$(this).height());
      }
    });
  }
};

$( document ).ready( UTIL.init );

var socket = io.connect();

var responsiveSizes = config.responsiveSizes;

var images = $('img');
var responsiveImages = [];
if(images && images.length > 0){
  images.each(function(){
    if($(this).attr('data-sizes')){
        responsiveImages.push($(this));
    }
  });
}

var onResizeFunctions = {
  common : function(w,h){

    for(var i=0; i < responsiveSizes.length - 1; i++){
      if(w > responsiveSizes[i]){
        break;
      }
    }
    for(var j=0; j < responsiveImages.length; j++){
      if(responsiveImages[j].attr('data-src') || responsiveImages[j].attr('src')){
        var responsiveImagesSizes = JSON.parse(responsiveImages[j].attr('data-sizes'));
        var responsiveImagesSize = responsiveImagesSizes[i];
        var filePath = responsiveImages[j].attr('data-src') || responsiveImages[j].attr('src');
        var filePathArr = filePath.split('.');
        if(filePathArr[filePathArr.length - 2].slice(-2) != '_'+responsiveImagesSize){
          // New size to deal width
          if(filePathArr[filePathArr.length - 2].slice(-2, -1) == '_'){
            filePathArr[filePathArr.length - 2] = filePathArr[filePathArr.length - 2].slice(0, -2);
          }

          filePathArr[filePathArr.length - 2] += '_'+responsiveImagesSize;
          filePath = filePathArr.join('.');
          responsiveImages[j].attr('data-src', filePath);
          responsiveImages[j].attr('src', filePath);
        }
      }
    }

    console.log('Common Responsive Resize', w, h);
  }
};

onResizeFunctions.common($(window).width(),$(window).height());
