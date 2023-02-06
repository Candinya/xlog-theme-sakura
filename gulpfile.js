const { src, dest, parallel, watch } = require('gulp');
const sass = require('gulp-dart-sass');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const postcss = require('gulp-postcss');

sass.compiler = require('sass');

const configs = {
  autoprefixer: {},
  cssnano: {},
  terser: {
    output: {
      comments: /^!/
    },
    ie8: true,
    safari10: true
  }
};

function buildSass(cb) {
  src('src/index.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(postcss([
      autoprefixer(configs.autoprefixer),
      cssnano(configs.cssnano)
    ]))
    .pipe(dest('dist/'))
  cb();
}

const build = parallel(buildSass);

function build_watch(cb) {
  watch('src/**/*.scss', buildSass);
}

exports.default = build;
exports.build = build;
exports.watch = build_watch;
