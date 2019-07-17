import fs from "fs";
import del from "del";
import gulp from "gulp";
import debug from "gulp-debug";
import plumber from "gulp-plumber";
import notifier from "node-notifier";
import { obj as through } from "through2";
import pug from "gulp-pug";
import gulpLoadPlugins from "gulp-load-plugins";
import newer from "gulp-newer";
import cached from "gulp-cached";
import gulpIf from "gulp-if";
import sass from "gulp-sass";
import stylus from "gulp-stylus";
import merge from "merge2";
import autoprefixer from "gulp-autoprefixer";
import sourcemaps from "gulp-sourcemaps";
import remember from "gulp-remember";
import concat from "gulp-concat";
import { obj as combine } from "stream-combiner2";
import cleanCSS from "gulp-clean-css";
import rev from "gulp-rev";
import inject from "gulp-inject";
import path from "path";
import webpack from "webpack";
import gulplog from "gulplog";
import imagemin from "gulp-imagemin";
import guetzli from "imagemin-guetzli";
import mozjpeg from "imagemin-mozjpeg";
import revReplace from "gulp-rev-replace";
import bs from "browser-sync";

const browserSync = bs.create();

const plugins = gulpLoadPlugins({
  rename: {
    "gulp-google-webfonts": "googleFonts",
  },
});

const paths = {
  build: {
    root: "./dist/",
    fontsDir: "./dist/fonts/",
    cssDir: "./dist/css/",
    html: "./dist/*.html",
    cssProd: "./dist/css/*.css",
    cssDev: "./dist/css/all.css",
    jsDir: "./dist/js/",
    jsProd: "./dist/js/*.js",
    jsDev: "./dist/js/bundle.js",
    imgDir: "./dist/img/",
    manifestDir: "./tmp/manifest/",
    manifest: "./tmp/manifest/rev-images.json",
  },
  src: {
    pug: "./src/templates/pages/*.pug",
    vendorDir: "./src/vendor/",
    stylus: "./src/styles/*.styl",
    webpackEntry: "./src/js/entry.js",
    jsDir: "./src/js/",
    imgDir: "./src/img/*.*",
  },
  watch: {
    pug: "./src/templates/**/*.pug",
    styles: "./src/styles/**/*.*",
    browserSync: "./dist/**/*.*",
  },
  googleFonts: {
    list: "./src/fonts/fonts.list",
    fontsDir: "./src/vendor/googleFonts/fonts/",
    woff: "./src/vendor/googleFonts/fonts/**/*.woff",
    cssDir: "./src/vendor/googleFonts/styles/",
    css: "./src/vendor/googleFonts/styles/fonts.css",
  },
  bootstrap: {
    src: {
      scssDir: "./node_modules/bootstrap/scss/",
      scss: "node_modules/bootstrap/scss/**/*.*",
      jsDir: "./node_modules/bootstrap/js/src/",
      js: "node_modules/bootstrap/js/src/**/*.*",
    },
    customSrc: {
      root: "./src/vendor/bootstrap/",
      scssDir: "./src/vendor/bootstrap/scss/",
      jsDir: "./src/vendor/bootstrap/js/src/",
    },
    scssEntryFile: "./src/styles/bootstrap/bootstrap.scss",
  },
  nodeModules: {
    root: "./node_modules/",
  },
};

const GOOGLE_FONTS_ENABLED = true;
const BOOTSTRAP_ENABLED = true;
const BOOTSTRAP_CUSTOM_SOURCE = true;
const IMAGE_ENCODER_GUETZLI = false;
const IMAGE_COMPRESSION_RATE = 84;

const isDevelopment = !process.env.NODE_ENV || process.env.NODE_ENV === "development";

const isProduction = !isDevelopment;

const checkDirExist = (location, callback) => {
  fs.access(location, fs.constants.F_OK, callback);
};

const errorHandler = taskName => plumber({
  errorHandler: error => notifier.notify({
    title: `[${taskName}] Error : `,
    message: error.message,
  }),
});

const pathFileNameToPugFile = () => through((file, enc, callback) => {
  const newFile = file;
  newFile.data = Object.assign(file.data || {}, { location: file.stem });
  callback(null, newFile);
});

const printFileName = taskname => debug({ title: `[${taskname}] Add : ` });

function cleanBuildDir(finishTask) {
  if (isProduction) return del(paths.build.root);
  finishTask();
}

function convertPugToHtml() {
  return gulp
    .src(paths.src.pug, {
      since: gulp.lastRun(convertPugToHtml),
    })
    .pipe(errorHandler("ConvertPugToHtml"))
    .pipe(pathFileNameToPugFile())
    .pipe(
      pug({
        pretty: true,
        self: true,
      }),
    )
    .pipe(printFileName("ConvertPugToHtml"))
    .pipe(gulp.dest(paths.build.root));
}

function downloadGoogleFonts() {
  return new Promise(resolve => {
    gulp
      .src(paths.googleFonts.list)
      .pipe(errorHandler("DownloadGoogleFonts"))
      .pipe(
        plugins.googleFonts({
          fontsDir: paths.googleFonts.fontsDir,
          cssDir: paths.googleFonts.cssDir,
          cssFilename: "fonts.css",
          relativePaths: true,
        }),
      )
      .pipe(printFileName("DownloadGoogleFonts"))
      .pipe(gulp.dest("./"))
      .on("end", resolve);
  });
}

function copyGoogleFonts(finishTask) {
  if (GOOGLE_FONTS_ENABLED) {
    checkDirExist(paths.googleFonts.fontsDir, noDir => {
      const copyToDest = () => {
        gulp
          .src(paths.googleFonts.woff)
          .pipe(newer(paths.build.fontsDir))
          .pipe(printFileName("CopyGoogleFonts"))
          .pipe(gulp.dest(paths.build.fontsDir))
          .on("end", finishTask);
      };

      if (noDir) {
        downloadGoogleFonts().then(() => {
          copyToDest();
        });
      } else copyToDest();
    });
  } else finishTask();
}

const getGoogleFontsCss = () => gulp.src(paths.googleFonts.css).pipe(cached("styles"));

function copyBootstrapSource(finishTask) {
  if (BOOTSTRAP_ENABLED && BOOTSTRAP_CUSTOM_SOURCE) {
    checkDirExist(paths.bootstrap.customSrc.root, noDir => {
      if (noDir) {
        gulp
          .src([paths.bootstrap.src.scss, paths.bootstrap.src.js], {
            base: paths.nodeModules.root,
          })
          .pipe(errorHandler("CopyBootstrapSource"))
          .pipe(printFileName("CopyBootstrapSource"))
          .pipe(gulp.dest(paths.src.vendorDir))
          .on("end", finishTask);
      } else finishTask();
    });
  } else finishTask();
}

const convertBootstrapScssToCss = () => gulp
  .src(paths.bootstrap.scssEntryFile)
  .pipe(
    gulpIf(
      BOOTSTRAP_CUSTOM_SOURCE,
      sass({ includePaths: paths.bootstrap.customSrc.scssDir }),
      sass({ includePaths: paths.bootstrap.src.scssDir }),
    ),
  );

const convertStylusFilesToCss = () => gulp
  .src(paths.src.stylus)
  .pipe(cached("styles"))
  .pipe(stylus());

function mergeStyles() {
  const merged = merge();

  if (GOOGLE_FONTS_ENABLED) merged.add(getGoogleFontsCss());
  if (BOOTSTRAP_ENABLED) merged.add(convertBootstrapScssToCss());
  merged.add(convertStylusFilesToCss());

  return merged
    .pipe(errorHandler("MergeStyles"))
    .pipe(printFileName("MergeStyles"))
    .pipe(
      gulpIf(
        isProduction,
        autoprefixer(),
        sourcemaps.init(),
      ),
    )
    .pipe(remember("styles"))
    .pipe(concat("all.css"))
    .pipe(
      gulpIf(
        isProduction,
        combine(cleanCSS({ compatibility: "ie8" }), rev()),
        sourcemaps.write(),
      ),
    )
    .pipe(gulp.dest(paths.build.cssDir));
}

function injectStylesToHtml() {
  const target = gulp.src(paths.build.html);
  const source = gulp.src(
    gulpIf(isProduction, paths.build.cssProd, paths.build.cssDev),
    {
      read: false,
    },
  );

  return target
    .pipe(errorHandler("InjectStylesToHtml"))
    .pipe(inject(source, { relative: true, removeTags: true, quiet: true }))
    .pipe(gulp.dest(paths.build.root));
}

const webpackConfig = {
  entry: {
    app: paths.src.webpackEntry,
  },
  output: {
    path: path.resolve(__dirname, paths.build.jsDir),
    filename: isProduction ? "[hash].bundle.js" : "bundle.js",
  },
  mode: isDevelopment ? "development" : "production",
  devtool: isDevelopment ? "cheap-module-inline-source-map" : "none",
  optimization: {
    noEmitOnErrors: true,
  },
  watch: isDevelopment,
  resolve: {
    alias: {
      "@bootstrap": BOOTSTRAP_CUSTOM_SOURCE
        ? path.resolve(__dirname, paths.bootstrap.customSrc.jsDir)
        : path.resolve(__dirname, paths.bootstrap.src.jsDir),
    },
  },
  plugins: [
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery",
      "window.jQuery": "jquery",
    }),
    {
      apply: compiler => {
        compiler.hooks.done.tapAsync(
          "InvokeCallbackOnCompilationEnd",
          (params, finishPluginExecution) => {
            injectBundleToHtml();
            finishPluginExecution();
          },
        );
      },
    },
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        include: path.resolve(__dirname, paths.src.jsDir),
        loader: "babel-loader",
      },
    ],
  },
};

const webpackErrorCallback = gulpFinishTask => (err, stats) => {
  let error = err;
  if (!error) [error] = stats.toJson().errors;

  if (error) {
    notifier.notify({
      title: "[Webpack] Error : ",
      message: error,
    });

    gulplog.error(error);
  } else {
    gulplog.info(
      stats.toString({
        colors: true,
      }),
    );
  }

  if (!webpackConfig.watch && error) gulpFinishTask(error);
  else gulpFinishTask();
};

function buildJsBundle(gulpFinishTask) {
  webpack(webpackConfig, webpackErrorCallback(gulpFinishTask));
}

function injectBundleToHtml() {
  const target = gulp.src(paths.build.html);
  const source = gulp.src(
    gulpIf(isProduction, paths.build.jsProd, paths.build.jsDev),
    {
      read: false,
    },
  );

  return target
    .pipe(errorHandler("InjectBundleToHtml"))
    .pipe(inject(source, { relative: true, removeTags: true, quiet: true }))
    .pipe(gulp.dest(paths.build.root));
}

function copyImages() {
  return gulp
    .src(paths.src.imgDir, { since: gulp.lastRun(copyImages) })
    .pipe(errorHandler("CopyImages"))
    .pipe(gulpIf(isDevelopment, newer(paths.build.imgDir)))
    .pipe(
      gulpIf(
        isProduction && IMAGE_ENCODER_GUETZLI,
        imagemin([
          guetzli({
            quality: IMAGE_COMPRESSION_RATE,
          }),
        ]),
      ),
    )
    .pipe(
      gulpIf(
        isProduction && !IMAGE_ENCODER_GUETZLI,
        imagemin([
          mozjpeg({
            quality: IMAGE_COMPRESSION_RATE,
          }),
        ]),
      ),
    )
    .pipe(gulpIf(isProduction, rev()))
    .pipe(printFileName("CopyImages"))
    .pipe(gulp.dest(paths.build.imgDir))
    .pipe(
      gulpIf(
        isProduction,
        combine(
          rev.manifest("rev-images.json"),
          gulp.dest(paths.build.manifestDir),
        ),
      ),
    );
}

function revReplaceImages(finishTask) {
  if (isProduction) {
    return merge(
      gulp
        .src(paths.build.cssProd)
        .pipe(revReplace({ manifest: gulp.src(paths.build.manifest) }))
        .pipe(gulp.dest(paths.build.cssDir))
        .pipe(printFileName("RevReplaceImages")),
      gulp
        .src(paths.build.html)
        .pipe(revReplace({ manifest: gulp.src(paths.build.manifest) }))
        .pipe(gulp.dest(paths.build.root))
        .pipe(printFileName("RevReplaceImages")),
    ).on("end", finishTask);
  }
  finishTask();
}

function watchForChanges(finishTask) {
  if (isDevelopment) {
    gulp.watch(
      paths.watch.pug,
      gulp.series(
        convertPugToHtml,
        injectStylesToHtml,
        injectBundleToHtml,
      ),
    );
    gulp
      .watch(
        paths.watch.styles,
        mergeStyles,
      )
      .on("unlink", filepath => {
        remember.forget("styles", path.resolve(filepath));
      });
    browserSync.watch(paths.watch.browserSync).on("change", browserSync.reload);
  } else finishTask();
}

function initBrowserSync(finishTask) {
  if (isDevelopment) {
    browserSync.init({
      port: 8080,
      server: {
        baseDir: paths.build.root,
      },
    });
  } else finishTask();
}

const build = gulp.series(
  cleanBuildDir,
  convertPugToHtml,
  copyGoogleFonts,
  copyBootstrapSource,
  mergeStyles,
  injectStylesToHtml,
  copyImages,
  revReplaceImages,
  gulp.parallel(watchForChanges, buildJsBundle, initBrowserSync),
);

export { build };
export { build as default };
