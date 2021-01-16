"use strict";

var gulp = require("gulp");
var plumber = require("gulp-plumber");
var sourcemap = require("gulp-sourcemaps");
var sass = require("gulp-sass");
var postcss = require("gulp-postcss");
var autoprefixer = require("autoprefixer");
var server = require("browser-sync").create();
var csso = require("gulp-csso");
var rename = require("gulp-rename");
var imagemin = require("gulp-imagemin");
var webp = require("gulp-webp");
var svgstore = require("gulp-svgstore");
var posthtml = require("gulp-posthtml");
var include = require("posthtml-include");
// var concat = require("gulp-concat");
var del = require("del");
var gulp = require("gulp");
var rollup = require("gulp-better-rollup");
var resolve = require("rollup-plugin-node-resolve");
var commonjs = require("rollup-plugin-commonjs");
var babel = require("gulp-babel");

gulp.task("css", function () {
  return gulp
    .src("source/sass/style.scss")
    .pipe(plumber())
    .pipe(sourcemap.init())
    .pipe(sass())
    .pipe(postcss([autoprefixer()]))
    .pipe(csso())
    .pipe(rename("style.min.css"))
    .pipe(sourcemap.write("."))
    .pipe(gulp.dest("build/css"))
    .pipe(server.stream());
});

gulp.task("server", function () {
  server.init({
    server: "build/",
    notify: false,
    open: true,
    cors: true,
    ui: false,
  });

  gulp.watch("source/sass/**/*.{scss,sass}", gulp.series("css"));
  gulp.watch("source/img/icon-*.svg", gulp.series("sprite", "html", "refresh"));
  gulp.watch("source/*.html", gulp.series("html", "refresh"));
  gulp.watch(
    ["source/js/main.js", "source/js/components/**/*.js"],
    gulp.series("js-main", "refresh")
  );
  gulp.watch("source/js/vendor.js", gulp.series("js-vendor", "refresh"));
});

gulp.task("refresh", function (done) {
  server.reload();
  done();
});

gulp.task("images", function () {
  return gulp
    .src("source/img/**/*.{png,jpg,svg}")
    .pipe(
      imagemin([
        imagemin.optipng({ optimizationLevel: 3 }),
        imagemin.jpegtran({ progressive: true }),
        imagemin.svgo(),
      ])
    )

    .pipe(gulp.dest("source/img"));
});

gulp.task("webp", function () {
  return gulp
    .src("source/img/**/*.{png,jpg}")
    .pipe(webp({ quality: 90 }))
    .pipe(gulp.dest("source/img"));
});

gulp.task("sprite", function () {
  return gulp
    .src("source/img/{icon-*,logo-*,htmlacademy*}.svg")
    .pipe(svgstore({ inlineSvg: true }))
    .pipe(rename("sprite_auto.svg"))
    .pipe(gulp.dest("build/img"));
});

gulp.task("html", function () {
  return gulp
    .src("source/*.html")
    .pipe(posthtml([include()]))
    .pipe(gulp.dest("build"));
});

gulp.task("copy", function () {
  return gulp
    .src(["source/fonts/**/*.{woff,woff2}", "source/img/**", "source//*.ico"], {
      base: "source",
    })
    .pipe(gulp.dest("build"));
});

gulp.task("js-main", () => {
  return gulp
    .src("source/js/main.js")
    .pipe(sourcemap.init())
    .pipe(rollup({}, "iife"))
    .pipe(babel({
      presets: ['@babel/env']
    }))
    .pipe(sourcemap.write(""))
    .pipe(gulp.dest("build/js"));
});

gulp.task("js-vendor", () => {
  return gulp
    .src("source/js/vendor.js")
    .pipe(sourcemap.init())
    .pipe(rollup({ plugins: [resolve(), commonjs()] }, "iife"))
    .pipe(sourcemap.write(""))
    .pipe(gulp.dest("build/js"));
});

gulp.task("clean", function () {
  return del("build");
});

gulp.task(
  "build",
  gulp.series("clean", "copy", "css", "sprite", "html", "js-main", "js-vendor")
);

gulp.task("start", gulp.series("build", "server"));
