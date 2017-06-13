const gulp = require('gulp');
const merge = require('merge-stream');
const cleanCSS = require('gulp-clean-css');
const uglify = require('gulp-uglify');
const stripDebug = require('gulp-strip-debug');
const sass = require('gulp-sass');
const concat = require('gulp-concat');
const livereload = require('gulp-livereload');
const server = require( 'gulp-develop-server' );
const minimist = require('minimist');
const fs = require('fs');
const slug = require('slug');
const reserved = require('reserved-words');
const concatCss = require('gulp-concat-css');
const stripCssComments = require('gulp-strip-css-comments');
const browserify = require('browserify');
const source = require('vinyl-source-stream');
const streamify = require('gulp-streamify');

const serverFiles = [
    './app.js',
    './controllers/*.js',
    './data/*.js',
    './gulpfile.js',
    './local-config.js',
    './socket.js',
    './utils/*',
    './routes/**/*.js'
];

const args = minimist(process.argv.slice(2));

gulp.task('default', ['server']);
gulp.task('prod', ['minify-css', 'minify-js']);
gulp.task('server', ['sass', 'js', 'server:start', 'sass:watch', 'ejs:watch', 'js:watch'], function() {
  function restart(file) {
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

gulp.task('minify-css', function() {
  var sassStream,
        cssStream;
  sassStream = gulp.src('./public/scss/style.scss')
    .pipe(sass().on('error', sass.logError));

  cssStream = gulp.src('./public/css/vendors/*');

  merge(sassStream, cssStream)
    .pipe(concatCss('./style.css'))
    .pipe(stripCssComments())
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(gulp.dest('./public/css'));
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

gulp.task('js', function() {
  return browserify('./public/js/app.js')
    .bundle()
    .pipe(source('main.js'))
    .pipe(gulp.dest('./public/js/'))
    .pipe(livereload());
});

gulp.task('minify-js', function() {
  return browserify('./public/js/app.js')
    .transform("babelify", {presets: ["es2015"]})
    .bundle()
    .pipe(source('main.js'))
    .pipe(streamify(uglify()))
    .pipe(streamify(stripDebug()))
    .pipe(gulp.dest('./public/js'));
});

gulp.task('js:watch', function () {
  livereload.listen();
  gulp.watch(['./public/js/src/*.js', './public/js/vendors/genuine/*.js', './public/js/app.js'], ['js']);
});

gulp.task( 'server:start', function() {
    try {
      // Check if the local-config.js file exists
      // Otherwise it creates it
      stats = fs.lstatSync('./local-config.js');
    }
    catch (e) {
      console.log('Have you set your local-config.js ? Do a \n `cp local-config-sample.js local-config.js`');
    }
    server.listen( { path: './app.js' }, function(err){
        if(err){console.log('********************\nDo a \n`npm install`\n********************'); return;}
        livereload.listen;
    });
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

    fs.readFile('./routes/routes.js', 'utf8', function (err,data) {
      if (err) {
        return console.log(err);
      }
      var result = data.replace(/\/\* GENUINE ROUTE \*\//g, routeCode);

      fs.writeFile('./routes/routes.js', result, 'utf8', function (err) {
         if (err) return console.log(err);
      });
    });
  },
  routeType : function(type){
    var includeRender = [
      type + " = require('../controllers/"+type+"'),",
      "/* GENUINE INCLUDE */",
    ""].join('\n');
    var routesRender = [
      "router.get('/"+type+"', "+type+".index);",
      "router.get('/"+type+"/:slug', "+type+".elements);",
      "/* GENUINE ROUTE */",
    ""].join('\n');

    fs.readFile('./routes/routes.js', 'utf8', function (err,data) {
      if (err) {
        return console.log(err);
      }
      var result = data.replace(/\/\* GENUINE ROUTE \*\//g, routesRender);
      result = result.replace(/\/\* GENUINE INCLUDE \*\//g, includeRender);

      fs.writeFile('./routes/routes.js', result, 'utf8', function (err) {
         if (err) return console.log(err);
      });
    });
  },
  data: function(type, page, slug, partial, camelCaseName){
    var dataCode = [
      '{',
      '"title": "' + page + '",',
      '"slug": "' + slug + '",',
      '"partial": "' + partial + '",',
      '"camel": "' + camelCaseName + '"',
      '},',
      '/* GENUINE DATA */'
    ].join('\n');

    fs.readFile('./data/'+type+'.js', 'utf8', function (err, data) {
      if (err) {
        return console.log(err);
      }
      var result = data.replace(/\/\* GENUINE DATA \*\//g, dataCode);

      fs.writeFile('./data/'+type+'.js', result, 'utf8', function (err) {
         if (err) return console.log(err);
      });
    });
  },
  dataFile : function(type){
    var render = [
    'var '+type+' = [',
    '/* GENUINE DATA */',
    '];',
    'module.exports = '+type+';',
    ''].join('\n');
    fs.writeFileSync('./data/'+type+'.js', render);
  },
  controllerFile : function(type){
    var render = [
      "var data = {};",
      "var items = require('../data/"+type+"');",
      "var config = require('../local-config');",
      "var _ = require('lodash');",
      "var i18n = new (require('i18n-2'))({",
      "    locales: config.locales",
      "});",
      "",
      "data.controller = '"+type+"';",
      "",
      "exports.index = function(req, res) {",
      "  i18n.setLocale(req.lang);",
      "  delete data.title;",
      "  delete data.description;",
      "  data.action = 'index';",
      "  data.item = {};",
      "  data.item.partial = 'index';",
      "  res.render('"+type+"/"+type+"', {data:data});",
      "},",
      "exports.elements = function(req, res) {",
      "  i18n.setLocale(req.lang);",
      "  var item = _.find(items, {slug: req.params.slug});",
      "  if(item === undefined){",
      "    res.status(404).render('404', {data:data});",
      "    return;",
      "  }",
      "  data.action = item.camel || 'index';",
      "  data.item = item;",
      "  data.title = item.title;",
      "  data.url = req.url;",
      "  data.description = item.title + ' | ' + item.description;",
      "  res.render('"+type+"/"+type+"', {data:data});",
      "}",
    ""].join('\n');
    fs.writeFileSync('./controllers/'+type+'.js', render);
  },
  viewFiles : function(type){
    fs.mkdirSync('./views/' + type);
    fs.mkdirSync('./views/' + type + '/elements');
    var render = [
      "<% layout('layout') -%>",
      "<h1>"+type+"</h1>",
      "<%-partial('elements/'+data.item.partial)%>",
    ""].join('\n');
    fs.writeFileSync('./views/'+ type +'/'+ type +'.ejs', render);
  },
  scriptFile : function(type){
    var render = [
      type + ': {',
      '  init: function() {',
      '    console.log("'+type+':init");',
      '    // controller-wide code',
      '  },',
      '/* GENUINE */',
      '  index: function() {',
      '    console.log("'+type+':index");',
      '    // action-specific code',
      '  }',
      '},',
      ''].join('\n');
      fs.writeFileSync('./public/js/src/'+type+'.js', render);
  },
  viewElement : function(element, type){
    var render = [
      '<h2>'+element+'</h2>',
      '<p>Add your content here</p>',
      ''].join('\n');
    fs.writeFileSync('./views/'+type+'/elements/'+element+'.ejs', render);
  },
  view : function(type, page, slug, partial, camelCaseName){
    var viewCode = [
      '<h2>'+page+'</h2>',
      '<p>Add your content here</p>',
      ''].join('\n');
    fs.writeFileSync('./views/'+type+'/elements/'+partial+'.ejs', viewCode);
  },
  script : function(type, page, slug, partial, camelCaseName){
    var scriptCode = [
      camelCaseName+': function() {',
      '  console.log("'+type+':'+camelCaseName+'");',
      '  // controller-wide code',
      '  },',
      '  /* GENUINE */'].join('\n');
    fs.readFile('./public/js/src/'+type+'.js', 'utf8', function (err,data) {
      if (err) {
        return console.log(err);
      }
      var result = data.replace(/\/\* GENUINE \*\//g, scriptCode);

      fs.writeFile('./public/js/src/'+type+'.js', result, 'utf8', function (err) {
         if (err) return console.log(err);
      });
    });
  }
};

gulp.task('page', function () {
  if(!args.name){
    console.log('The arg --name is missing. Please refer to the doc.');
    return;
  }
  if(!args.slug&&!args.partial){
    args.slug = slug(args.name).toLowerCase();
    args.partial = slug(args.name).toLowerCase();
  } else if(!args.slug&&args.partial){
    args.slug = slug(args.name).toLowerCase();
  } else if(args.slug&&!args.partial){
    args.partial = args.slug;
  }
  if(    reserved.check(args.name, '5')
  || reserved.check(args.slug, '5')
  || reserved.check(args.partial, '5')
  ){
    console.log('You used a reserved word. Please change the name.');
    return;
  }
  var camelCaseName = camelCasify(args.partial);

  console.log('Adding a new page.');
  console.log('Page name >>', args.name);
  console.log('Slug >>', args.slug);
  console.log('Partial >>', args.partial);
  console.log('camelCaseName >>', camelCaseName);

  //generate.controller(args.page, args.slug, args.partial, camelCaseName);
  //generate.route(args.page, args.slug, args.partial, camelCaseName);
  generate.data('pages', args.name, args.slug, args.partial, camelCaseName);
  generate.view('pages', args.name, args.slug, args.partial, camelCaseName);
  generate.script('pages', args.name, args.slug, args.partial, camelCaseName);

});

gulp.task('generate', function () {
  if(!args.type){
    console.log('The arg --type is missing. Please refer to the doc.');
    return;
  }

  if(reserved.check(args.type, '5')){
    console.log('You used a reserved word. Please change the type name.');
    return;
  }

  console.log('Adding a new type.');
  console.log('Type >>', args.type);

  generate.dataFile(args.type);
  generate.controllerFile(args.type);
  generate.viewFiles(args.type);
  generate.scriptFile(args.type);
  generate.viewElement('index', args.type);
  generate.routeType(args.type);

});

gulp.task('add', function () {
  var type = args.type || 'page';
  if(!args.name){
    console.log('The arg --name is missing. Please refer to the doc.');
    return;
  }
  if(!args.slug&&!args.partial){
    args.slug = slug(args.name).toLowerCase();
    args.partial = slug(args.name).toLowerCase();
  } else if(!args.slug&&args.partial){
    args.slug = slug(args.name).toLowerCase();
  } else if(args.slug&&!args.partial){
    args.partial = args.slug;
  }
  if(    reserved.check(args.name, '5')
  || reserved.check(args.slug, '5')
  || reserved.check(args.partial, '5')
  ){
    console.log('You used a reserved word. Please change the name.');
    return;
  }
  var camelCaseName = camelCasify(args.partial);

  console.log('Adding a new element to ' + type);
  console.log('Page name >>', args.name);
  console.log('Slug >>', args.slug);
  console.log('Partial >>', args.partial);
  console.log('camelCaseName >>', camelCaseName);

  //generate.controller(args.page, args.slug, args.partial, camelCaseName);
  //generate.route(args.page, args.slug, args.partial, camelCaseName);
  generate.data(type, args.name, args.slug, args.partial, camelCaseName);
  generate.view(type, args.name, args.slug, args.partial, camelCaseName);
  generate.script(type, args.name, args.slug, args.partial, camelCaseName);

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
