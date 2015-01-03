var gulp = require('gulp');
var gutil = require('gulp-util');
var del = require('del');
var fs = require('fs');
var shell = require('gulp-shell');

gulp.task('default', ['build']);

gulp.task('build', []);

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
    'bin/**/*'
    //'client/views/**/*',
    //'client/public/**/*',
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
