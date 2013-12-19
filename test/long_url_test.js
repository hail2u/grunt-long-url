'use strict';

var check = require('../tasks/lib/long_url').check;
var grunt = require('grunt');
var path = require('path');

var css;
var default_options;
var custom_options;

exports.long_url = {
  setUp: function (done) {
    css = path.join(__dirname, 'fixtures', 'long_url.css');

    done();
  },
  default_options: function (test) {
    test.expect(1);

    var actual = check(grunt.file.read(css), {
      warning: 1000,
      error: 2000
    });
    var expected = grunt.file.readJSON(path.join(__dirname, 'expected', 'default_options.json'));
    test.deepEqual(actual, expected, 'should extract and check URL.');

    test.done();
  },
  custom_options: function (test) {
    test.expect(1);

    var actual = check(grunt.file.read(css), {
      warning: 100,
      error: 1000
    });
    var expected = grunt.file.readJSON(path.join(__dirname, 'expected', 'custom_options.json'));
    test.deepEqual(actual, expected, 'should extract and check URL.');

    test.done();
  },
  warning_off: function (test) {
    test.expect(1);

    var actual = check(grunt.file.read(css), {
      warning: 0,
      error: 2000
    });
    var expected = grunt.file.readJSON(path.join(__dirname, 'expected', 'warning_off.json'));
    test.deepEqual(actual, expected, 'should extract and check URL.');

    test.done();
  }
};
