const gulp = require("gulp");
const debug = require("gulp-debug");
const fileinclude = require("gulp-file-include"); //to concat files(like html)
var sourcemaps = require("gulp-sourcemaps"); // to generate sourcemaps
var sass = require("gulp-sass")(require("sass")); // to build scss files
const minifyCSS = require("gulp-clean-css"); // to miniy css files
const browsersync = require("browser-sync").create();// to create live server
const imagemin = require("gulp-imagemin"); // to optimize images
const { series } = require('gulp'); // to create sequence of tasks
var gp_concat = require("gulp-concat"),// to merge files
  gp_rename = require("gulp-rename"),  // to rename files
  gp_uglify = require("gulp-uglify");  // to minify js files 


// copy other files & directories
function copyFilesAndFolders() {
  return gulp.src(['src/fonts/**/*', 'src/webfonts/**/*', 'src/videos/**/*'], { base: './src/' }).pipe(gulp.dest('dist/'));
}

// compile and concat all js files
  function jsOptimize() {
  return gulp
    .src([
      "src/js/bootstrap.bundle.min.js",
      "src/js/jquery-3.6.0.min.js",
      "src/js/slick.min.js",
      "src/js/select2.min.js",
      "src/js/custom.js",
    ])
    .pipe(sourcemaps.init())
    .pipe(gp_concat("concat.js"))
    .pipe(gp_rename("bundle.js"))
    .pipe(gp_uglify())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest("dist/js"));
}

// optimize images
function imageOptimize() {
  return gulp
    .src("src/images/**/*.*")
    .pipe(imagemin())
    .pipe(debug({ title: "image:" }))
    .pipe(gulp.dest("dist/images"));
}

// compile scss to css
function style() {
  // scss path
  return (
    gulp
      .src("src/scss/**/*.scss")
      .pipe(sourcemaps.init())
      // pass it thru sass compiler
      .pipe(sass())
      // generate sourcemaps
      .pipe(sourcemaps.write("."))
      // minify css 
      // .pipe(minifyCSS())
      // destination path
      .pipe(gulp.dest("dist/css"))
      // stream chnages to all browsers
      .pipe(browsersync.reload({ stream: true }))
  );
}

//  HTML file include
function htmlConcat() {
  return gulp
    .src(["src/**/*.html", "!src/template-parts/**/*.html"])
    .pipe(
      fileinclude({
        prefix: "@@",
        basepath: "@file",
      })
    )
    .pipe(gulp.dest("dist/"));
}

// live code watch
function watch() {
  browsersync.init({
    server: {
      baseDir: "dist/.",
    },
  });
  gulp.watch("src/scss/**/*.scss", style).on("change", browsersync.reload);
  gulp.watch("src/**/*.html", htmlConcat).on("change", browsersync.reload);
  gulp.watch("src/js/**/*.js",jsOptimize).on("change", browsersync.reload);
}

exports.style = style;
exports.watch = watch;
exports.htmlConcat = htmlConcat;
exports.jsOptimize = jsOptimize;
exports.imageOptimize = imageOptimize;
exports.copyFilesAndFolders = copyFilesAndFolders;

exports.build = series( style,jsOptimize, htmlConcat,imageOptimize,copyFilesAndFolders);