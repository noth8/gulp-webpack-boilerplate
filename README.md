**Gulp Webpack Boilerplate** 

<br/>
<br/>

![header](../assets/header.png?raw=true)

<br/>
<br/>

## :tada: Overview
<br/>

A modern JavaScript starter toolkit for web-development using Gulp task runner and Webpack bundler. 
  
Ideal for fast building static HTML sites or templates. It speeds up the proccess of delevelopment, 
testing and deploy in a front-end project. Also it can be extended in a simple way when project 
require some extra functionality provided by thirdparty packages.
  
All the tasks are done via Gulp. Webpack is just used for Javascript (especially for ES6 
Import/Export as Gulp can't do it in a proper way) and not for rest because it's a little bit 
overhed to translate all static assets and styles through js using Webpack.

<br />
<br />
<br />

## :link: Demo of projects using this boilerplate 
<br/>

- [Supreme site repo](https://github.com/noth8/supreme-site)
- [Downhill site repo](https://github.com/noth8/downhill-site)
- [Maxgold site repo](https://github.com/noth8/maxgold-site)

<br />
<br />
<br />

## :wrench: Features
<br/>

| Feature         | Description                                                                                                                                                                          |
| --------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Javascript      | Full support of javascript latest features using Babel loader and Webpack. Also, there is a lot of code optimization while building in production mode.                              |
| HTML            | Pug templates provide an opportunity to make a better structure and code readability and then compiling it to HTML.                                                                  |
| Styles          | Stylus support with compiling to css and doing minification with concatenation.                                                                                                      |
| Autoprefixier   | Parse CSS and add vendor prefixes(-wbkit, -moz, -o, -ms) to rules in production build.                                                                                               |
| Sourcemaps      | Css and js source maps in development mode.                                                                                                                                          |
| Bootstrap       | You can specify what part of Bootstrap do you need and then compile it to get the low size files.                                                                                    |
| Live Reload     | Automatic reloading of the browser on code modification and cross-platform syncing of all actions between connected devices. This depends on Gulp-watch, Webpack-watch, BrowserSync. |
| Google Fonts    | Auto-downloads Google fonts specified in fonts list then generates css with them and finally moves them to the build dir.                                                            |
| Images          | Compressing images to desired quality and size through Mozjpeg or Guetzli.                                                                                                           |
| Hashed names    | File names contain smart hashes in production mode. Hash will change on file modifications. This helps to avoid browser long term caching.                                           |
| Code linting    | Eslint checks js code according to AirBnb rules and notify if something wrong.                                                                                                       |
| Code formatting | Prettier auto-formats js code that doesn't satisfy Eslint styles rules.                                                                                                              |
| Cached files    | Gulp tasks configured to process only new files in development mode.                                                                                                                 |
| Error notifier  | You get a desktop notification when errors occur.                                                                                                                                    |

<br />
<br />
<br />

## :department_store: Project Structure
<br/>

```
├── dist/                          # Static version of the website
│   ├── css/                       # Folder for concatenated css file
│   ├── fonts/                     # All fonts files
│   ├── img/                       # Images
│   ├── js/                        # Folder for bundle js file
│   └── index.html                 # Can be any page and more than one
├── src/                           # Source files
│   ├── fonts/                     # Fonts
│   │   └── fonts.list             # Google Fonts config
│   ├── img/                       # Site images
│   ├── js/                        # Javascript files
│   │   ├── bootstrap.js           # Uncomment module that you need
│   │   ├── entry.js               # Webpack entry point
│   │   └── main.js                # All user scripts
│   ├── styles/                    # Styles
│   │   ├── bootstrap/             # Bootstrap sass config
│   │   │   ├── bootstrap.scss     # Uncomment module that you need
│   │   │   └── _variables.scss    # Change what you want
│   │   └── main.styl              # Main stylesheet file
│   ├── templates/                 # Site templates (Pug)
│   │   ├── pages/                 # Pug only looks for this dir
│   │   │   └── index.pug          # You can create any amount of pages in this dir
│   │   ├── navigation.pug         # Site navigation
│   │   ├── header.pug             # Site header
│   │   ├── footer.pug             # Site footer
│   │   └── layout.pug             # Main layout
│   └── vendor/                    # Appears if CUSTOM_SOURCE options specified or fonts enabled.
│       ├── bootstrap/             # Change source files to whatever you want
│       └── googleFonts/           # Storage for downloaded fonts
├── temp/                          # Temporary folder
│   └── manifest/                  # Manifests for the production build
│       └── rev-images.json        # Hashed images names
├── .babelrc                       # Babel presets for latest js features
├── .eslintrc.js                   # ESLint config
├── .gitignore                     # List of files ignored by git
├── .prettierrc                    # Prettier formatter config
├── gulpfile.babel.js              # Gulpfile config and tasks
├── license                        # Project license
├── package.json                   # Node.js dependencies and scripts
└── readme.md                      # Description of the project
```

<br />
<br />
<br />

## :construction: Prerequisites
<br/>

#### You must have :
- Node.js
- Yarn or Npm
- Gulp

<br />

#### or install : 

1. Install Node Version Manager with these commands:
   - ```sudo apt update```
   - ```sudo apt install build-essential ; sudo apt install libssl-dev```
   - ```curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.34.0/install.sh | bash```
   - ```source ~/.bashrc```
<br/>

2. Install latest Node.js :
   - ```nvm install node```
   - ```nvm use node```
<br/>

3. Install Yarn or Npm : 
   - ```sudo apt install yarn```
  or
   - ```nvm install --latest-npm```
<br/>

4. Optionally, also install Gulp globally if you want to launch tasks without ```yarn run``` or ```npm start```: 
    - ```yarn add global```
    or
    - ```npm install --global gulp``` 

<br />
<br />
<br />

## :hammer: Installation
<br/>

1. Go to the directory where you want ```cd somedirectory```
2. Clone this repo to your computer ```git clone https://github.com/noth8/gulp-webpack-boilerplate.git```
3. Go to cloned repo ```cd gulp-webpack-boilerplate```
4. Install all packages with ```yarn install``` or ```npm install```


<br />
<br />
<br />

## :red_circle: Launch

<br/>

###### Yarn Commands

| name            | Description               |
| --------------- | ------------------------- |
| `yarn run dev`  | Build in development mode |
| `yarn dev`      | Same as `yarn run dev`    |
| `yarn run prod` | Build in production mode  |
| `yarn prod`     | Same as `yarn run prod`   |

###### Npm Commands 


| name           | Description               |
| -------------- | ------------------------- |
| `npm run dev`  | Build in development mode |
| `npm run prod` | Build in production mode  |

<br/>

###### _Look at 'Packages list' section for more information about used plugins in dev or prod mode._

<br />
<br />
<br />

## :electric_plug: Config options in ```gulpfile.babel.js``` 
<br/>

| name                      | default         | true                                                                                                                                                             | false                                                                                       |
| ------------------------- | --------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------- |
| GOOGLE_FONTS_ENABLED      | true            | Gulp downloads fonts listed in ```fonts.list``` and copies them to dist dir.                                                                                     | -                                                                                           |
| BOOTSTRAP_ENABLED         | true            | Specify what you need in : ```bootstrap.js```,  ```bootstrap.scss```, ```_variables.scss``` and webpack will take it from bootstrap source and add it to bundle. | You can also use default bootstrap by specifying ```import 'bootstrap'``` in ```entry.js``` |
| BOOTSTRAP_CUSTOM_SOURCE   | true            | Give you a copy of bootstrap source if you want to make some changes directly.                                                                                   | Using bootstrap from `node_modules/`                                                        |
| AUTOPREFIXER_BROWSER_LIST | last 2 versions | browsers versions that automatically gets properties specific to them (```-ms```, ```-moz```, ```-webkit```)                                                     | -                                                                                           |
| IMAGE_ENCODER_GUETZLI     | false           | Uses Guetzli encoder for build in production mode.                                                                                                               | Uses MozJPEG encoder for build in production mode.                                          |
| IMAGE_COMPRESSION_RATE    | 84              | Compression quality, in range 0 (worst) to 100 (perfect).                                                                                                        | -                                                                                           |

<br />
<br />
<br />

## :mag: Packages list
<br/>

**General** :
- [gulp](https://github.com/gulpjs/gulp) - The streaming build system.
   

      Purpose : automated development process by running tasks.
- [webpack](https://github.com/webpack/webpack) - is a bundler for javascript. Packs many modules into one or a few bundled assets.
 

      Purpose : proper js bundling what gulp doesn't do.
- [bootstrap](https://github.com/twbs/bootstrap) - is an open source framework for developing with HTML, CSS, and JS.
 

      Purpose : responsive grid on web and mobile.
- [jquery](https://github.com/jquery/jquery) - is a JavaScript library designed to simplify HTML DOM tree traversal and manipulation.
 

      Purpose : for custom code and also for bootstrap dependency.
- [popper.js](https://github.com/FezVrasta/popper.js/) - A popper is an element on the screen which "pops out" from the natural flow of your application.
 

      Purpose : bootstrap dependency.
- [gulp-google-webfonts](https://github.com/battlesnake/gulp-google-webfonts) - a plugin to download Google webfonts and generate a stylesheet for them.
 

      Purpose : automate the process of using google webfonts just specifying them in one file(fonts.list).
- [gulp-load-plugins](https://github.com/jackfranklin/gulp-load-plugins) - loads gulp plugins from package dependencies and attaches them to the specified object.
 

      Purpose : imports google-webfonts when they are needed (alternative to "require" with lazy loading).
- [gulp-if](https://github.com/robrich/gulp-if) - a ternary plugin: conditionally control the flow of vinyl objects.
 

      Purpose : helps to run plugins according to development or production mode specified.
- [gulp-plumber](https://github.com/floatdrop/gulp-plumber) - prevents pipe breaking caused by errors from gulp plugins.
 

      Purpose : catch errors and send them to the node-notifier.
- [gulplog](https://github.com/gulpjs/gulplog) - logger for gulp and gulp plugins
   

      Purpose : pass to webpack errorHandler and print info if errors occur. 
- [node-notifier](https://github.com/mikaelbr/node-notifier) - a Node.js module for sending notifications on native Mac, Windows, and Linux.
 

      Purpose : displays errors with platform-native notifications.
- [gulp-pug](https://github.com/gulp-community/gulp-pug) - is a plugin for compiling Pug templates.
 

      Purpose : translate pug files into html.
- [through2](https://github.com/rvagg/through2) - is a tiny wrapper around Node.js streams. Allows writing gulp plugin.
 

      Purpose : pass file name from stream to pug  for navigation based on location.
- [gulp-sass](https://github.com/dlmanning/gulp-sass) - is a wrapper around node-sass.
 

      Purpose : compiles .scss files into css.
- [node-sass](https://github.com/sass/node-sass) - is a library that provides a binding for Node.js to LibSass.
 

      Purpose : it's needed for gulp-sass.
- [gulp-stylus](https://github.com/stylus/stylus/) - is a wrapper around stylus.
 

      Purpose : compiles .styl files into css.
- [stylus](https://github.com/stylus/stylus) - providing an efficient and dynamic way to generate CSS
 

      Purpose : it's needed for gulp-stylus.
- [merge2](https://github.com/teambition/merge2) - Merge multiple streams into one stream in sequence or parallel.
 

      Purpose : for skipping Bootstrap and Google fonts from merging when they are disabled.
- [gulp-inject](https://github.com/klei/gulp-inject) - ф javascript, stylesheet, and web component injection plugin.
 

      Purpose : injects css and js files into html files by replacing  special tags specified in pug files.
- [gulp-concat](https://github.com/gulp-community/gulp-concat) - Streaming concatenation middleware for gulp
 

      Purpose : merge css files into one.
- [stream-combiner2](https://github.com/substack/stream-combiner2) - Turn a pipeline into a single stream.
 

      Purpose : less code for better readability.
- [@babel/core](https://github.com/babel/babel/tree/master/packages/babel-core) - the core functionality of Babel. 
 

      Purpose : babel-loader dependency.
- [@babel/register](https://github.com/babel/babel/tree/master/packages/babel-register) - is a require hook, that will bind node’s require method and automatically transpile the file on the fly. 
 

      Purpose : gulp.babel.js for es6 features.
- [@babel/preset-env](https://github.com/babel/babel/tree/master/packages/babel-preset-env) - is a smart preset that allows you to use the latest JavaScript without needing to micromanage which syntax transforms (and optionally, browser polyfills) are needed by your target environment(s). This Needs for webpack babel-loader. 
 

      Purpose : babel-loader configuration.
- [babel-loader](https://github.com/babel/babel-loader) - Babel loader for webpack
 

      Purpose : transforms Javascript code from new standards to previous for old browser support.
- [babel-eslint](https://github.com/babel/babel-eslint) - a wrapper for Babel's parser used for ESLint
 

      Purpose : custom parser specified in eslintrc.js
- [eslint](https://github.com/eslint/eslint) - ESLint is an open source JavaScript linting utility.
   

      Purpose : static javascript code analysis using specified rules.
- [eslint-config-airbnb-base](https://github.com/airbnb/javascript) - base(without react) AirBnb list of rules.
 

      Purpose : just because of the most popular and nice javascript style guide
- [eslint-plugin-import](https://github.com/benmosher/eslint-plugin-import) - ESLint plugin with rules that helps validate proper imports.
   

      Purpose : checks es6 imports.

<br />

**Production** :
- [del](https://github.com/sindresorhus/del) - delete files and folders using globs
 

      Purpose : deletes build dir before other tasks run.
- [gulp-autoprefixer](https://github.com/sindresorhus/gulp-autoprefixer) - PostCSS plugin to parse CSS and add vendor prefixes to CSS rules using values from [Can I Use](https://caniuse.com/). 
   

      Purpose : automatically adds browser's specific prefixes like '-moz', '-webkit-', '-ms'.
- [gulp-clean-css](https://github.com/scniro/gulp-clean-css) - clean-css is a fast and efficient CSS optimizer.
 

      Purpose : minify css files.
- [gulp-imagemin](https://github.com/sindresorhus/gulp-imagemin) - is an image compressor which is built around plugins like mozjpeg and others.
 

      Purpose : minifies jpeg images with mozjpeg vs guetzli.
- [imagemin-guetzli](https://github.com/imagemin/imagemin-guetzli) - imagemin plugin for [guetzli](https://github.com/google/guetzli).
 

      Purpose : Guetzli-generated images are typically 20-30% smaller than others.
- [imagemin-mozjpeg]() - Imagemin plugin for [mozjpeg](https://github.com/mozilla/mozjpeg)
 

      Purpose : Mozjpeg-generated images are larger than Guetzli-generated but Mozjpeg is much faster. 
- [gulp-rev](https://github.com/sindresorhus/gulp-rev) - appending content hash to filenames.
 

      Purpose : helps to get rid of browser long term caching.
- [gulp-rev-replace](https://github.com/jamesknelson/gulp-rev-replace) - rewrite occurrences of filenames which have been renamed by gulp-rev.
 

      Purpose : replaces names in links to the images specified in html and css files from original to hashed using manifest file generated by gulp-rev.
 
 <br />
 
**Development** : 
- [browser-sync](https://github.com/Browsersync/browser-sync) - keep multiple browsers & devices in sync.
 

      Purpose : automatically reloads content on each saves on all connected devices and also catches all actions occurred in one of them and relays to others.
- [gulp-sourcemaps](https://github.com/gulp-sourcemaps/gulp-sourcemaps) - provides sourcemap support for other plugins.
 

      Purpose : may show original css code locations before merging into one css.
- [gulp-cached](https://github.com/gulp-community/gulp-cached) - this keeps an in-memory cache of files (and their contents) that have passed through it.
 

      Purpose : caches styles between incremental builds.
- [gulp-remember](https://github.com/ahaurw01/gulp-remember) - is a plugin that remembers and recalls files passed through it.
 

      Purpose : passes files to gulp-concat that were thrown back by gulp-cashed.
- [gulp-newer](https://github.com/tschaub/gulp-newer) - a plugin for passing through only those source files that are newer than corresponding destination files.
 

      Purpose : processes the same fonts and images only once between incremental builds.
      
