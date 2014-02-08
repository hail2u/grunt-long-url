/* jshint node: true */
'use strict';

var grunt = require('grunt');
var parse = require('css-parse');

exports.check = function (css, options) {
  var unquote = function (str) {
    str = str.substring(4, str.length - 1);
    str = str.replace(/['"]/g, '');

    return str;
  };
  var result = {
    errors: 0,
    warnings: 0,
    urls: []
  };
  var rules = parse(css).stylesheet.rules;

  rules.forEach(function (rule) {
    if (rule.type !== 'rule') {
      return;
    }

    rule.declarations.forEach(function (declaration) {
      if (declaration.type !== 'declaration') {
        return;
      }

      var urls = declaration.value.match(/url\(['"]?.*?['"]?\)/g);

      if (!urls) {
        return;
      }

      urls.forEach(function (url) {
        url = unquote(url);

        var r = {
          "selector": rule.selectors[0],
          "result": "OK",
          "length": url.length,
          "url": url
        };

        if (r.length >= options.error) {
          result.errors++;
          r.result = "Error";
        } else if (options.warning !== 0 && r.length >= options.warning) {
          result.warnings++;
          r.result = "Warning";
        }

        result.urls.push(r);
      });
    });
  });

  return result;
};
