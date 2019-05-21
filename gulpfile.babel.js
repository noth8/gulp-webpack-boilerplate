import fs from "fs";
import del from "del";
import gulp from "gulp";
import debug from "gulp-debug";
import plumber from "gulp-plumber";
import notifier from "node-notifier";
import { obj as through } from "through2";
import pug from "gulp-pug";

const paths = {
  build: {
    root: "./dist/",
  },
  src: {
    pug: "./src/templates/pages/*.pug",
  },
};

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

const build = gulp.series(
  cleanBuildDir,
  convertPugToHtml,
);

export { build };
export { build as default };
