var gulp = require('gulp'),
  nodemon = require('gulp-nodemon'),
  plumber = require('gulp-plumber'),
  livereload = require('gulp-livereload'),
  sass = require('gulp-ruby-sass'),
  sourceMaps = require('gulp-sourcemaps'),
  babel = require('gulp-babel'),
  concat = require('gulp-concat'),
  uglify = require('gulp-uglify'),
  rename = require('gulp-rename');

const vendor_folder = './public/components/';

const vendor_js = [
    vendor_folder + 'jquery/dist/jquery.min.js',
    vendor_folder + 'bootstrap-sass/assets/javascripts/bootstrap.min.js'
];

gulp.task('sass', () => {
  return sass('./public/css/')
    .pipe(gulp.dest('./public/css'))
    .pipe(livereload());
});

gulp.task('js', () => {
    return gulp.src("src/**/*.js") //get all js files under the src
        .pipe(sourceMaps.init()) //initialize source mapping
        .pipe(babel()) //transpile
        .pipe(sourceMaps.write(".")) //write source maps
        .pipe(gulp.dest("dist")); //pipe to the destination folder
});

gulp.task('views', () => {
    return gulp.src("src/app/views/**")
        .pipe(gulp.dest('dist/app/views'));
});

gulp.task('vendor', () => {
    return gulp.src(vendor_js)
        .pipe(concat('vendor.js'))
        .pipe(gulp.dest('./public/js'))
        .pipe(rename('vendor.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('./public/js'));
});


gulp.task('watch', () => {
  gulp.watch('./public/css/*.scss', ['sass']);
  gulp.watch('./src/**/*.js', ['js']);
  gulp.watch('./src/views/**/*.handlebars', ['views']);
  gulp.watch('./src/views/*.handlebars', ['views']);
});

gulp.task('develop', ['js', 'sass', 'views'], () => {
  livereload.listen();
  nodemon({
    script: 'dist/app.js',
    ext: 'js coffee handlebars',
    stdout: false
  }).on('readable', function () {
    this.stdout.on('data', function (chunk) {
      if(/^Express server listening on port/.test(chunk)){
        livereload.changed(__dirname);
      }
    });
    this.stdout.pipe(process.stdout);
    this.stderr.pipe(process.stderr);
  });
});

gulp.task('default', [
  'sass',
  'js',
  'views',
  'develop',
  'watch'
]);
