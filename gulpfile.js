const gulp = require('gulp');
const typescript = require('gulp-typescript');
const tsProject = typescript.createProject('tsconfig.json');
const del = require('del');
const ejs = require('gulp-ejs');
const sass = require('gulp-sass')(require('sass'));
const plumber = require('gulp-plumber');
const rename = require('gulp-rename');
const webpackStream = require('webpack-stream');
const webpack = require('webpack');
const webpackConfig = require('./webpack.config');

const webserver = require('gulp-webserver');

gulp.task('clean', function () {
  return del(['dist/*']);
});

gulp.task('test:ts', () => {
  return gulp
    .src(['./src/**/*.ts', '!./src/**/__tests__/*.ts'])
    .pipe(tsProject())
    .js.pipe(gulp.dest('dist'));
});
gulp.task('watch:ts', () => {
  gulp.watch('./src/**/*.ts', gulp.task('test:ts')).on('change', (cb) => {
    const yellow = '\u001b[33m';
    const reset = '\u001b[0m';
    console.log(`change file -> ${yellow}"${cb}"${reset}`);
    gulp.task('test:js');
  });
});

const ejsPath = './test/src/**/*.ejs';
gulp.task('test:ejs', function () {
  return gulp
    .src([ejsPath, '!./test/src/**/_*.ejs'])
    .pipe(plumber())
    .pipe(ejs())
    .pipe(rename({ extname: '.html' }))
    .pipe(gulp.dest('test/dist/'));
});
gulp.task('watch:ejs', () => {
  return gulp.watch(ejsPath, gulp.task('test:ejs'));
});

const scssPath = './test/src/assettes/scss/**/*.scss';
gulp.task('test:sass', function () {
  return gulp
    .src([scssPath, '!./test/src/assettes/scss/**/_*.scss'])
    .pipe(sass({ outputStyle: 'expanded' }))
    .pipe(gulp.dest('./test/dist/assettes/css'));
});
gulp.task('watch:sass', () => {
  return gulp.watch(scssPath, gulp.task('test:sass'));
});

const imagePath = './test/src/assettes/images/*.+(jpg|jpeg|png|gif|svg)';
gulp.task('test:image', function () {
  const srcGlob = imagePath;
  const dstGlob = './test/dist/assettes/images';
  return gulp.src([srcGlob]).pipe(gulp.dest(dstGlob));
});
gulp.task('watch:image', () => {
  return gulp.watch(imagePath, gulp.task('test:image'));
});

gulp.task('test:js', function (done) {
  webpackStream(webpackConfig, webpack).pipe(
    gulp.dest('test/dist/assettes/js')
  );
  done();
});
gulp.task('watch:js', () => {
  return gulp.watch('./test/src/assettes/js/*.js', gulp.task('test:js'));
});

gulp.task('server', function () {
  return gulp.src('test/dist').pipe(
    webserver({
      livereload: true,
      open: true,
      port: 8000,
    })
  );
});

gulp.task('build', gulp.series('clean', 'test:ts'));

gulp.task(
  'test',
  gulp.series('test:ts', 'test:sass', 'test:ejs', 'test:js', 'test:image')
);
gulp.task(
  'watch',
  gulp.parallel(
    'watch:ts',
    'watch:sass',
    'watch:ejs',
    'watch:js',
    'watch:image'
  )
);

gulp.task('dev', gulp.series('test', 'server', 'watch'));
