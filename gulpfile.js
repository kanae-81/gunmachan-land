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

// typescript
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
  gulp.watch('./src/**/*.ts', gulp.series('test:ts', 'demo:js'));
});

// 以下demo用タスク
const demoPath = {
  src: './demo/src',
  dist: './demo/dist',
};

const ejsPath = `${demoPath.src}/**/*.ejs`;
gulp.task('demo:ejs', function () {
  return gulp
    .src([ejsPath, `!${demoPath.src}/**/_*.ejs`])
    .pipe(plumber())
    .pipe(ejs())
    .pipe(rename({ extname: '.html' }))
    .pipe(gulp.dest(demoPath.dist));
});
gulp.task('watch:ejs', () => {
  return gulp.watch(ejsPath, gulp.task('demo:ejs'));
});

const scssPath = `${demoPath.src}/assettes/scss/**/*.scss`;
gulp.task('demo:sass', function () {
  return gulp
    .src([scssPath, `!${demoPath.src}/assettes/scss/**/_*.scss`])
    .pipe(sass({ outputStyle: 'expanded' }))
    .pipe(gulp.dest(`${demoPath.dist}/assettes/css`));
});
gulp.task('watch:sass', () => {
  return gulp.watch(scssPath, gulp.task('demo:sass'));
});

const imagePath = `${demoPath}/assettes/images/*.+(jpg|jpeg|png|gif|svg)`;
gulp.task('demo:image', function () {
  const srcGlob = imagePath;
  const dstGlob = `${demoPath}/assettes/images`;
  return gulp.src([srcGlob]).pipe(gulp.dest(dstGlob));
});
gulp.task('watch:image', () => {
  return gulp.watch(imagePath, gulp.task('demo:image'));
});

gulp.task('demo:js', function (done) {
  webpackStream(webpackConfig, webpack).pipe(
    gulp.dest(`${demoPath.dist}/assettes/js`)
  );
  done();
});
gulp.task('watch:js', () => {
  return gulp.watch(`${demoPath.src}/assettes/js/*.js`, gulp.task('demo:js'));
});

gulp.task('server', function () {
  return gulp.src(demoPath.dist).pipe(
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
  gulp.series('test:ts', 'demo:sass', 'demo:ejs', 'demo:js', 'demo:image')
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
