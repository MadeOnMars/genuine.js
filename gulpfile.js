'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var livereload = require('gulp-livereload');
var server = require( 'gulp-develop-server' );
var minimist = require('minimist');
var fs = require('fs');

var knownOptions = {
  string: ['route', 'controller']
};

var serverFiles = [
    './app.js',
    './controllers/*.js',
    './routes.js'
];

var options = minimist(process.argv.slice(2), knownOptions);

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
  controller : function(name){
    var controllerCode = [
      'var data = {};',
      'exports.index = function(req, res) {',
      '  data.controller = \''+name+'\';',
      '  data.action = \'index\';',
      '  res.render(\''+name+'\', {data:data});',
      '}',
      ''].join('\n');

    fs.writeFileSync('./controllers/'+name+'.js', controllerCode);
  }, // end controller
  route : function(name){
    var includeCode = [
      ', '+name+' = require(\'./controllers/'+name+'\')',
      '/* GENUINE INCLUDE */'].join('\n');

    var routeCode = [
      'router.get(\'/'+name+'\', '+name+'.index);',
      '/* GENUINE ROUTE */'].join('\n');

    fs.readFile('./routes.js', 'utf8', function (err,data) {
      if (err) {
        return console.log(err);
      }
      var result = data.replace(/\/\* GENUINE INCLUDE \*\//g, includeCode);
      result = result.replace(/\/\* GENUINE ROUTE \*\//g, routeCode);

      fs.writeFile('./routes.js', result, 'utf8', function (err) {
         if (err) return console.log(err);
      });
    });
  },
  view : function(name){
    var viewCode = [
      '<% layout(\'layout\') -%>',
      '<h1>'+name+'</h1>',
      ''].join('\n');
      fs.writeFileSync('./views/'+name+'.ejs', viewCode);
  },
  script : function(name){
    var scriptCode = [
      ''+name+': {',
      '  init: function() {',
      '    console.log("'+name+':init");',
      '    // controller-wide code',
      '  },',
      '',
      '  index: function() {',
      '    console.log("'+name+':index");',
      '    // action-specific code',
      '  }',
      '},',
      ''].join('\n');

    fs.writeFileSync('./public/js/src/'+name+'.js', scriptCode);
  }
};


gulp.task('add', function () {
  console.log('Generating : ' + options.route);
  //TODO Verifying the route variable if it doesn't use a reserved string
  generate.controller(options.route);
  generate.route(options.route);
  generate.view(options.route);
  generate.script(options.route);
});
