'use strict';

module.exports = function (grunt) {

  var Reader = function () {};

  Reader.prototype = {
    propertyTask: function (data) {
      var propRoot = data.props.rootProp,
          langs    = data.props.languages,
          files    = data.props.files;

      files.forEach(function (file) {
        var convert, content, result, json = {};
        grunt.file.expand(file.src).forEach(function (file) {
          content = grunt.file.read(file).split(/\n|\r/g);
          content.forEach(function (prop) {
            if (prop !== '') {
              convert = convertPropertyToJson(prop);
              json    = extend(json, convert);
            }
          });
        });

        if (file.isRoot) {
          json = { root: json };
          langs.forEach(function (lang) {
            json[lang] = true;
          });
        }

        result = "define(" + JSON.stringify(json, null, 4) + ");";
        writeToFile(result, file.dest + ".js");
      });
    }
  };

  function convertPropertyToJson(property) {
    var split = property.split('='),
        propertyName = split[0],
        obj          = {},
        propertyValue, parts, length, i, prop;

    split.shift();
    propertyValue = split.join('=');
    parts         = propertyName.split('.');
    length        = parts.length;

    obj[parts[length - 1]] = propertyValue;
    for (i = length - 2; i >= 0; i--) {
      prop = {};
      prop[parts[i]] = obj;
      obj = prop;
    }

    return obj;
  }

  function extend(target, src) {
    var array = Array.isArray(src);
    var dst = array && [] || {};

    if (array) {
      target = target || [];
      dst = dst.concat(target);
      src.forEach(function(e, i) {
        if (typeof dst[i] === 'undefined') {
          dst[i] = e;
        } else if (typeof e === 'object') {
          dst[i] = extend(target[i], e);
        } else {
          if (target.indexOf(e) === -1) {
            dst.push(e);
          }
        }
      });
    } else {
      if (target && typeof target === 'object') {
        Object.keys(target).forEach(function (key) {
          dst[key] = target[key];
        });
      }
      Object.keys(src).forEach(function (key) {
        if (typeof src[key] !== 'object' || !src[key]) {
          dst[key] = src[key];
        }
        else {
          if (!target[key]) {
            dst[key] = src[key];
          } else {
            dst[key] = extend(target[key], src[key]);
          }
        }
      });
    }

    return dst;
  }

  function writeToFile (content, file) {
    grunt.log.writeln("Writing to " + file);
    grunt.file.write(file, content);
  }

  return Reader;
};
