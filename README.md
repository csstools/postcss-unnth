# UnNth [![Build Status][ci-img]][ci]

<img align="right" width="135" height="95" src="http://postcss.github.io/postcss/logo-leftp.png" title="Philosopher’s stone, logo of PostCSS">

[UnNth] replaces `:nth-child` selectors with `:first-child` selectors. This can be useful when outputting CSS for older browsers like Internet Explorer 8.

```css
/* before */

.container > p:nth-child(4).specific > span {
   font-weight: bold;
}

/* after */

.container > :first-child + * + * + p.specific > span {
    font-weight: bold;
}
```

## Usage

Add [UnNth] to your build tool:

```bash
npm install postcss-unnth --save-dev
```

#### Node

```js
require('postcss-unnth')({ /* options */ }).process(YOUR_CSS);
```

#### PostCSS

Add [PostCSS] to your build tool:

```bash
npm install postcss --save-dev
```

Load [UnNth] as a PostCSS plugin:

```js
postcss([
    require('postcss-unnth')({ /* options */ })
]);
```

#### Gulp

Add [Gulp PostCSS] to your build tool:

```bash
npm install gulp-postcss --save-dev
```

Enable [UnNth] within your Gulpfile:

```js
var postcss = require('gulp-postcss');

gulp.task('css', function () {
    return gulp.src('./css/src/*.css').pipe(
        postcss([
            require('postcss-unnth')({ /* options */ })
        ])
    ).pipe(
        gulp.dest('./css')
    );
});
```

#### Grunt

Add [Grunt PostCSS] to your build tool:

```bash
npm install grunt-postcss --save-dev
```

Enable [UnNth] within your Gruntfile:

```js
grunt.loadNpmTasks('grunt-postcss');

grunt.initConfig({
    postcss: {
        options: {
            processors: [
                require('postcss-unnth')({ /* options */ })
            ]
        },
        dist: {
            src: 'css/*.css'
        }
    }
});
```

[ci]: https://travis-ci.org/jonathantneal/postcss-unnth
[ci-img]: https://travis-ci.org/jonathantneal/postcss-unnth.svg
[Gulp PostCSS]: https://github.com/postcss/gulp-postcss
[Grunt PostCSS]: https://github.com/nDmitry/grunt-postcss
[PostCSS]: https://github.com/postcss/postcss
[UnNth]: https://github.com/jonathantneal/postcss-unnth
