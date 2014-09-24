'use strict';

module.exports = function(grunt) {

  var Reader = function () {};

  Reader.prototype = {
    jsonTask: function (data) {
      var jsonRoot  = data.json.rootJson,
          jsonFiles = data.json.files,
          json, properties;

      jsonFiles.forEach(function (file) {
        if (!grunt.file.exists(file.src)) {
          grunt.log.warn('Source file "' + file.src + '" not found.');
          return false;
        }

        json = getJson(file);
        properties = convertJsonToProperties(jsonRoot, json);
        if (file.split) {
          for (var key in properties) {
            writeToFile(properties[key].join("\n"), file.folder + key + ".properties");
          }
        } else {
          var props = [];
          for (var prop in properties) {
            props = props.concat(properties[prop]);
          }
          writeToFile(props.join("\n"), file.dest + ".properties");
        }
      });
    }
  };

  function getJson (file) {
    var newlineRegex     = /\n|\r/g,
        whitespacesRegex = /\s{2,}/g,
        concatRegex      = /(".\+.")/g,
        jsonRegex        = /({.*})/g,
        jsonKeysRegex    = /([\w]+)(:)\s(?=[\{|\"|\d])/g,

        content  = grunt.file.read(file.src, { encondig: grunt.file.defaultEncoding }),
        filejson = content.replace(newlineRegex, '').replace(whitespacesRegex, ' ').replace(concatRegex, '').match(jsonRegex)[0],
        tmp      = filejson.replace(jsonKeysRegex, "\"$1\"$2");

    return JSON.parse(tmp);
  }

  function convertJsonToProperties (root, json) {
    var keys = Object.keys(json[root]),
        obj  = {};

    keys.forEach(function (key) {
      var values = [];
      getProperties(json[root][key], values);
      appendRoot(root + '.' + key, values);
      obj[key] = values;
    });

    return obj;
  }

  function getProperties (obj, values, append) {
    append = append || '';
    for (var property in obj) {
      if (typeof obj[property] === 'object'){
        getProperties(obj[property], values, append + property + '.');
      } else {
        values.push(append + property + '=' + obj[property]);
      }
    }
  }

  function appendRoot (property, values) {
    for (var i = 0; i < values.length; i++) {
      values[i] = property + '.' + values[i];
    }
  }

  function writeToFile (content, file) {
    grunt.log.writeln("Writing to " + file);
    grunt.file.write(file, content);
  }

  return Reader;
};
