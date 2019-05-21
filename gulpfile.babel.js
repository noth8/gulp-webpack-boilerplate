import fs from "fs";
import del from "del";
import gulp from "gulp";
import debug from "gulp-debug";
import plumber from "gulp-plumber";
import notifier from "node-notifier";


const paths = {
  build: {
    root: "./dist/",
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

const printFileName = taskname => debug({ title: `[${taskname}] Add : ` });

function cleanBuildDir(finishTask) {
  if (isProduction) return del(paths.build.root);
  finishTask();
}

const build = gulp.series(
  cleanBuildDir,
);

export { build };
export { build as default };
