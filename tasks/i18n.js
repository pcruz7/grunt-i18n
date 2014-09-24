/*
 * grunt-i18n
 * https://github.com/pcruz/grunt-i18n
 *
 * Copyright (c) 2014 pcruz
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  var JsonTask = require('./lib/json-reader.js')(grunt),
      PropsTask = require('./lib/props-reader.js')(grunt);

  grunt.registerMultiTask('i18n', 'Plugin to convert RequireJS\' i18n plugin strings from JSON to .properties files and vice-versa.', function() {
    if (this.data.hasOwnProperty('json')) {
      new JsonTask().jsonTask(this.data);
    } else {
      new PropsTask().propertyTask(this.data);
    }
  });
};
