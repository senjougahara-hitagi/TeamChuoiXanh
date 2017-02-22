var gulp = require('gulp');
var gulpLoadPlugins = require('gulp-load-plugins');
var browserSync = require('browser-sync');
var del = require('del');
var wiredep = require('wiredep').stream;
var runSequence = require('run-sequence');

var $ = gulpLoadPlugins();
var reload = browserSync.reload;

var dev = true;

// autoprefixer
gulp.task('styles', () => {
  return gulp.src('client/styles/*.css')
    .pipe($.sourcemaps.init())
    .pipe($.autoprefixer({browsers: ['> 1%', 'last 2 versions', 'Firefox ESR']}))
    .pipe($.sourcemaps.write())
    .pipe(gulp.dest('.tmp/styles'))
    .pipe(reload({stream: true}));
});

// Lint Javascript
function lint(files, options) {
  return gulp.src(files)
    .pipe($.eslint({ fix: true }))
    .pipe(reload({stream: true, once: true}))
    .pipe($.eslint.format())
    .pipe($.if(!browserSync.active, $.eslint.failAfterError()));
}

gulp.task('lint:client', () => {
  return lint('client/scripts/**/*.js')
    .pipe(gulp.dest('client/scripts'));
});

gulp.task('lint:server', () => {
  return lint('server/**/*.js')
    .pipe(gulp.dest('server'));
});

gulp.task('html', ['styles'], () => {
  return gulp.src('client/*.html')
    .pipe($.useref({searchPath: ['.tmp', 'client', '.']}))
    .pipe($.if('*.js', $.uglify()))
    .pipe($.if('*.css', $.cssnano({safe: true, autoprefixer: false})))
    .pipe($.if('*.html', $.htmlmin({collapseWhitespace: true})))
    .pipe(gulp.dest('dist/client'));
});

// minify images
gulp.task('images', () => {
  return gulp.src('client/images/**/*')
    .pipe($.cache($.imagemin()))
    .pipe(gulp.dest('dist/client/images'));
});

// copy fonts
gulp.task('fonts', () => {
  return gulp.src(require('main-bower-files')('**/*.{eot,svg,ttf,woff,woff2}', function (err) {})
    .concat('client/fonts/**/*'))
    .pipe($.if(dev, gulp.dest('.tmp/fonts'), gulp.dest('dist/client/fonts')));
});

// copy client folder
gulp.task('extras', () => {
  return gulp.src([
    'client/*',
    '!client/*.html'
  ], {
    dot: true
  }).pipe(gulp.dest('dist/client'));
});

gulp.task('clean', del.bind(null, ['.tmp', 'dist']));

// Run in development mode
gulp.task('serve', () => {
  process.env.NODE_ENV = process.env.NODE_ENV || 'development';
  runSequence(['clean', 'wiredep'], ['lint:client', 'lint:server'], ['styles', 'fonts'], 'nodemon', () => {
    browserSync({
      proxy: "localhost:8888",
      notify: false,
      port: 9000,
      files: ['.tmp', 'client', 'server']
    });

    gulp.watch([
      'client/*.html',
      'client/scripts/**/*.js',
      'client/images/**/*',
      '.tmp/fonts/**/*'
    ]).on('change', reload);

    gulp.watch('client/styles/**/*.css', ['styles']);
    gulp.watch('client/fonts/**/*', ['fonts']);
    gulp.watch('bower.json', ['wiredep', 'fonts']);
  });
});

// Run in production mode
gulp.task('serve:dist', ['default'], () => {
  process.env.NODE_ENV = process.env.NODE_ENV || 'production';
  return $.nodemon({
		script: 'dist/server/app.js'
	}).on('start', function () {
		if (!started) {
			cb();
			started = true;
		}
	});
});

gulp.task('nodemon', function (cb) {
	var started = false;

	return $.nodemon({
		script: 'server/app.js'
	}).on('start', function () {
		// to avoid nodemon being started multiple times
		if (!started) {
			cb();
			started = true;
		}
	});
});

// inject bower components
gulp.task('wiredep', () => {
  gulp.src('client/*.html')
    .pipe(wiredep({
      exclude: ['bootstrap.js'],
      ignorePath: /^(\.\.\/)*\.\./
    }))
    .pipe(gulp.dest('client'));
});

gulp.task('build:client', ['lint:client', 'lint:server', 'html', 'images', 'fonts', 'extras'], () => {
  return gulp.src('dist/client/**/*').pipe($.size({title: 'build Client', gzip: true}));
});

// build
gulp.task('default', () => {
  return new Promise(resolve => {
    dev = false;
    runSequence(['clean', 'wiredep'], ['build:client', 'build:server'], resolve);
  });
});

gulp.task('build:server', () => {
    return gulp.src([
        'server/**/*.*',
        'package.json',
        'bower.json',
        '.bowerrc'
    ], {cwdbase: true})
        .pipe(gulp.dest("dist"));
});
