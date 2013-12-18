# grunt-long-url

> Warn long URL in CSS files.


## Getting Started

This plugin requires Grunt `~0.4.2`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-long-url --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-long-url');
```

## The "long_url" task

### Overview

In your project's Gruntfile, add a section named `long_url` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  long_url: {
    options: {
      // Task-specific options go here.
    },
    your_target: {
      // Target-specific file lists and/or options go here.
    },
  },
});
```

### Options

#### options.warning

Type: `Number`
Default value: `1000`

A threshold number for warning. If you set this variable to `0`, task checks only errors.


#### options.error

Type: `Number`
Default value: `2000`

A threshold number for error.


### Usage Examples

#### Default Options

In this example, the default options are used to check URLs in CSS files under `src/css/` and their sub-directories. So if a CSS file has a URL more than *1000* characters, Grunt will show warning but continue. And if a CSS file has a long URL more than *2000* characters, Grunt will show error and abort.

```js
grunt.initConfig({
  long_url: {
    default_options: {
      src: ['src/css**/*.css']
    }
  },
});
```

This plugin is read-only task, so you don't need to specify `dest` like [`grunt-contrib-jshint`](https://github.com/gruntjs/grunt-contrib-jshint).


#### Custom Options

In this example, custom options are used to change threshold number for warning and error. So if a CSS file has a URL more than *500* characters, Grunt would show warning but continue. And if a CSS file has a long URL more than *1000* characters, Grunt would show error and abort.

```js
grunt.initConfig({
  long_url: {
    custom_options: {
      options: {
        warning: 500,
        error: 1000
      },
      src: ['src/css/**/*.css']
    }
  },
});
```

#### Turn off Warnings

In this example, custom options are used to turn off warnings. So Grunt will not show any warnings. But if a CSS file has a long URL more than 2000 characters, Grunt will show error and abort same as default.

```js
grunt.initConfig({
  long_url: {
    custom_options: {
      options: {
        warning: 0
      },
      src: ['src/css/**/*.css']
    }
  },
});
```

## Contributing

In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History

  - 2013-12-18  v0.1.0 Initial release
