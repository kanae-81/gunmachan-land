const gulp = require('gulp');
const typescript = require('gulp-typescript');
const tsProject = typescript.createProject('tsconfig.json');
const del = require('del');

gulp.task('clean', function () {
  return del(['dist/*']);
});

gulp.task('ts', () => {
  return gulp
    .src(['./src/**/*.ts', '!./src/**/__tests__/*.ts'])
    .pipe(tsProject())
    .js.pipe(gulp.dest('dist'));
});

gulp.task('watch', () => {
  gulp.watch('./src/**/*.ts', gulp.task('ts')).on('change', (cb) => {
    const yellow = '\u001b[33m';
    const reset = '\u001b[0m';

    console.log(`change file -> ${yellow}"${cb}"${reset}`);
  });
});

gulp.task('build', gulp.series('clean', 'ts'));
gulp.task('default', gulp.series('ts', 'watch'));
