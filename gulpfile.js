'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var livereload = require('gulp-livereload');
var server = require( 'gulp-develop-server' );
var minimist = require('minimist');
var fs = require('fs');
var slug = require('slug');
var reserved = require('reserved-words');

var serverFiles = [
    './app.js',
    './controllers/*.js',
    './data/*.js',
    './gulpfile.js',
    './local-config.js',
    './socket.js',
    './locals.js',
    './routes.js'
];

var args = minimist(process.argv.slice(2));

gulp.task('default', ['sass', 'js', 'sass:watch', 'ejs:watch', 'js:watch']);
gulp.task('server', ['sass', 'js', 'server:start', 'sass:watch', 'ejs:watch', 'js:watch'], function() {
    function restart( file ) {
        server.changed( function( error ) {
            if( ! error ) livereload.changed( file.path );
        });
    }
    gulp.watch( serverFiles ).on( 'change', restart );
});

gulp.task('sass', function () {
  gulp.src('./public/scss/style.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./public/css'))
    .pipe(livereload());
});

gulp.task('sass:watch', function () {
  livereload.listen();
  gulp.watch('./public/scss/**/*.scss', ['sass']);
});

gulp.task('ejs', function () {
  gulp.src('./views/**/*.ejs')
    .pipe(livereload());
});

gulp.task('ejs:watch', function () {
  livereload.listen();
  gulp.watch('./views/**/*.ejs', ['ejs']);
});

gulp.task('js', function () {
  gulp.src(['./public/js/src/genuine/header.js', './public/js/src/*.js', './public/js/src/genuine/footer.js'])
    .pipe(concat('main.js'))
    .pipe(gulp.dest('./public/js'))
    .pipe(livereload());
});

gulp.task('js:watch', function () {
  livereload.listen();
  gulp.watch('./public/js/src/**/*.js', ['js']);
});

gulp.task( 'server:start', function() {
    server.listen( { path: './app.js' }, livereload.listen );
});

var generate = {
  controller : function(page, slug, partial, camelCaseName){
    var controllerCode = [
      'exports.'+camelCaseName+' = function(req, res) {',
      '  data.controller = "pages";',
      '  data.action = "'+camelCaseName+'";',
      '  res.render("pages/'+partial+'.ejs", {data:data});',
      '},',
    '/* GENUINE */'].join('\n');

    fs.readFile('./controllers/pages.js', 'utf8', function (err,data) {
      if (err) {
        return console.log(err);
      }
      var result = data.replace(/\/\* GENUINE \*\//g, controllerCode);

      fs.writeFile('./controllers/pages.js', result, 'utf8', function (err) {
         if (err) return console.log(err);
      });
    });
  }, // end controller
  route : function(page, slug, partial, camelCaseName){
    var routeCode = [
      'router.get(\'/'+slug+'\', pages.' + camelCaseName + ');',
      '/* GENUINE ROUTE */'].join('\n');

    fs.readFile('./routes.js', 'utf8', function (err,data) {
      if (err) {
        return console.log(err);
      }
      var result = data.replace(/\/\* GENUINE ROUTE \*\//g, routeCode);

      fs.writeFile('./routes.js', result, 'utf8', function (err) {
         if (err) return console.log(err);
      });
    });
  },
  data: function(page, slug, partial, camelCaseName){
    var dataCode = [
      '{',
      '"title": "' + page + '",',
      '"slug": "' + slug + '",',
      '"partial": "' + partial + '",',
      '"camel": "' + camelCaseName + '"',
      '},',
      '/* GENUINE DATA */'
    ].join('\n');

    fs.readFile('./data/pages.js', 'utf8', function (err, data) {
      if (err) {
        return console.log(err);
      }
      var result = data.replace(/\/\* GENUINE DATA \*\//g, dataCode);

      fs.writeFile('./data/pages.js', result, 'utf8', function (err) {
         if (err) return console.log(err);
      });
    });
  },
  view : function(page, slug, partial, camelCaseName){
    var viewCode = [
      '<h2>'+page+'</h2>',
      '<p>Add your content here</p>',
      ''].join('\n');
    fs.writeFileSync('./views/pages/elements/'+partial+'.ejs', viewCode);
  },
  script : function(page, slug, partial, camelCaseName){
    var scriptCode = [
      camelCaseName+': function() {',
      '  console.log("pages:'+camelCaseName+'");',
      '  // controller-wide code',
      '  },',
      '  /* GENUINE */'].join('\n');
    fs.readFile('./public/js/src/pages.js', 'utf8', function (err,data) {
      if (err) {
        return console.log(err);
      }
      var result = data.replace(/\/\* GENUINE \*\//g, scriptCode);

      fs.writeFile('./public/js/src/pages.js', result, 'utf8', function (err) {
         if (err) return console.log(err);
      });
    });
  }
};


gulp.task('add', function () {
  if(!args.page){
    console.log('The arg --page is missing. Please refer to the doc.');
    return;
  }
  if(!args.slug&&!args.partial){
    args.slug = slug(args.page).toLowerCase();
    args.partial = slug(args.page).toLowerCase();
  } else if(!args.slug&&args.partial){
    args.slug = slug(args.page).toLowerCase();
  } else if(args.slug&&!args.partial){
    args.partial = args.slug;
  }
  if(    reserved.check(args.page, '5')
  || reserved.check(args.slug, '5')
  || reserved.check(args.partial, '5')
  ){
    console.log('You used a reserved word. Please change the name.');
    return;
  }
  var camelCaseName = camelCasify(args.partial);

  console.log('Adding a new page.');
  console.log('Page >>', args.page);
  console.log('Slug >>', args.slug);
  console.log('Partial >>', args.partial);
  console.log('camelCaseName >>', camelCaseName);

  //generate.controller(args.page, args.slug, args.partial, camelCaseName);
  //generate.route(args.page, args.slug, args.partial, camelCaseName);
  generate.data(args.page, args.slug, args.partial, camelCaseName);
  generate.view(args.page, args.slug, args.partial, camelCaseName);
  generate.script(args.page, args.slug, args.partial, camelCaseName);

});

function camelCasify(name){
  var camelCaseName = name;
  var partialArr = name.split('-');
  var i = 1;
  if(partialArr.length != 1){
    camelCaseName = partialArr[0];
    for(i=1;i<partialArr.length;i++){
      camelCaseName += partialArr[i].charAt(0).toUpperCase() + partialArr[i].slice(1);
    }
  }
  return camelCaseName;
}
