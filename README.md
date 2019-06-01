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
