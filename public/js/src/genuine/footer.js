
};

UTIL = {
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

var onResizeFunctions = {
  common : function(w,h){
    console.log('Common Responsive Resize', w, h);
  }
};
