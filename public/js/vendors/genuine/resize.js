const $ = require('jquery');

const resize = {
  init: (w, h) => {
    console.log('Common Responsive Resize', w, h);
    const responsiveImages = $('img[data-sizes]');
    const responsiveSizes = config.responsiveSizes;

    for (var i = 0; i < responsiveSizes.length - 1; i++) {
      if(w > responsiveSizes[i]){
        break;
      }
    }
    responsiveImages.each(function() {
      if ($(this).attr('data-src') || $(this).attr('src')) {
        var responsiveImagesSizes = JSON.parse($(this).attr('data-sizes'));
        var responsiveImagesSize = responsiveImagesSizes[i];
        var filePath = $(this).attr('data-src') || $(this).attr('src');
        var filePathArr = filePath.split('.');
        if(filePathArr[filePathArr.length - 2].slice(-2) != '_'+responsiveImagesSize){
          // New size to deal width
          if(filePathArr[filePathArr.length - 2].slice(-2, -1) == '_'){
            filePathArr[filePathArr.length - 2] = filePathArr[filePathArr.length - 2].slice(0, -2);
          }

          filePathArr[filePathArr.length - 2] += '_'+responsiveImagesSize;
          filePath = filePathArr.join('.');
          $(this).attr('data-src', filePath);
          $(this).attr('src', filePath);
        }
      }
    })
  }
}

module.exports = resize;
