var gulp = require('gulp');
var del = require('del');
var shell = require('gulp-shell');
var markdown = require('gulp-markdown');
var less = require('gulp-less');
var watch = require('gulp-watch');

gulp.task('default', ['build', 'watch']);

gulp.task('build', [
  'less',
  'markdown'
]);

gulp.task('watch', function(){
  watch([
    'client/styles/**/*.less',
    'README.md'
  ], function(){
    gulp.start('build');
  })
});

gulp.task('less', function(){
  return gulp.src('./client/styles/style.less')
    .pipe(less())
    .pipe(gulp.dest('./client/public'));
});

gulp.task('markdown', function(){
  return gulp.src('README.md')
    .pipe(markdown())
    .pipe(gulp.dest('client/public/docs'));
});

gulp.task('clean:dist', function(cb){
  del(['dist/**/*', '!dist/.git/**', '!dist/.gitignore'], { dot: true }, cb);
});

gulp.task('copy:dist', ['clean:dist', 'shrinkwrap'], function(){
  gulp.src([
    'package.json',
    'npm-shrinkwrap.json',
    //'.bowerrc',
    //'bower.json',
    'server/**/*',
    'bin/**/*',
    //'client/views/**/*',
    'client/public/**/*'
    //'!client/public/vendor/**', //work around for https://github.com/gulpjs/gulp/issues/165
    //'!client/public/sitemap.xml',
    //'common/**/*'
  ], { base: './' })
    .pipe(gulp.dest('./dist'));
});

gulp.task('shrinkwrap', shell.task([
  'npm shrinkwrap'
]));

gulp.task('build:dist', ['build', 'copy:dist'], function(){
  console.log('build:dist finished!');
});
