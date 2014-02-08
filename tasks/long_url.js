/* jshint node: true */
'use strict';

module.exports = function (grunt) {
  var taskName = 'long_url';
  var taskDescription = 'Warn long URL in CSS files.';

  grunt.registerMultiTask(taskName, taskDescription, function () {
    var async = require('async');
    var check = require('./lib/long_url').check;
    var grunt = require('grunt');

    var done = this.async();
    var options = this.options({
      warning: 1000,
      error: 2000
    });

    async.each(this.filesSrc, function (file, callback) {
      if (!grunt.file.exists(file)) {
        grunt.log.warn('Source file "' + file + '" not found.');

        return callback();
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
      callback();
    }, function (err) {
      done(err);
    });
  });
};
