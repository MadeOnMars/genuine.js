pages: {
  init: function() {
    console.log("pages:init");
    // controller-wide code
  },
/* GENUINE */
  index: function() {
    console.log("pages:index");
    // action-specific code

    onResizeFunctions.index = function(w,h){
      console.log('Do something specific for this page on resize', w, h);
    }

  }
},
