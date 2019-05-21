import del from "del";
import gulp from "gulp";


const paths = {
  build: {
    root: "./dist/",
  },
};

const isDevelopment = !process.env.NODE_ENV || process.env.NODE_ENV === "development";

const isProduction = !isDevelopment;

function cleanBuildDir(finishTask) {
  if (isProduction) return del(paths.build.root);
  finishTask();
}

const build = gulp.series(
  cleanBuildDir,
);

export { build };
export { build as default };
