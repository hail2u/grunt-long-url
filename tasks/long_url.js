/*
 * grunt-long-url
 * https://github.com/hail2u/grunt-long-url
 *
 * Copyright (c) 2013 Kyo Nagashima
 * Licensed under the MIT license.
 */

'use strict';

var async = require('async');
var check = require('./lib/long_url').check;
var grunt = require('grunt');

module.exports = function (grunt) {
  var taskName = 'long_url';
  var taskDescription = 'Warn long URL in CSS files.';

  grunt.registerMultiTask(taskName, taskDescription, function () {
    var done = this.async();
    var options = this.options({
      warning: 1000,
      error: 2000
    });

    async.forEach(this.filesSrc, function (file, next) {
      if (!grunt.file.exists(file)) {
        grunt.log.warn('Source file "' + file + '" not found.');

        return next();
      }

      grunt.log.write('Checking URLs in ' + file + '.');
      var result = check(grunt.file.read(file), options);

      if (result.errors > 0) {
        grunt.log.error();
      } else {
        grunt.log.ok();
      }

      result.urls.forEach(function (url) {
        if (url.result === 'Error' || url.result === 'Warning') {
          grunt.log.error(url.length + ' characters URL found in `' +
            url.selector + '`');
        }
      });

      if (result.errors > 0) {
        grunt.fail.warn('Don\'t use long URL in CSS!');
      }

      grunt.log.ok('Long URL not found.');
      next();
    }, function (err) {
      done(err);
    });
  });
};
