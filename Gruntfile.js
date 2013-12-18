/*
 * grunt-long-url
 * https://github.com/hail2u/grunt-long-url
 *
 * Copyright (c) 2013 Kyo Nagashima
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {
  grunt.initConfig({
    jshint: {
      all: [
        'Gruntfile.js',
        'tasks/*.js',
        '<%= nodeunit.tests %>'
      ],
      options: {
        jshintrc: '.jshintrc'
      }
    },

    long_url: {
      main: {
        options: {
          warning: 1
        },
        src: ['test/fixtures/short_url.css']
      },
      default_options: {
        src: ['test/fixtures/long_url.css']
      },
      custom_options: {
        options: {
          warning: 500,
          error: 1000
        },
        files: {
          src: ['test/fixtures/long_url.css']
        }
      },
      warning_off: {
        options: {
          warning: 0,
        },
        files: {
          src: ['test/fixtures/long_url.css']
        }
      }
    },

    nodeunit: {
      tests: ['test/*_test.js']
    }
  });

  grunt.loadTasks('tasks');

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-nodeunit');

  grunt.registerTask('test', ['long_url:main', 'nodeunit']);

  grunt.registerTask('default', ['jshint', 'test']);
};
