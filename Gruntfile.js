/*
 * grunt-i18n
 * https://github.com/pcruz/grunt-i18n
 *
 * Copyright (c) 2014 pcruz
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

    clean: {
      tests: ['tmp']
    },

    // Configuration to be run (and then tested).
    i18n: {
      main: {
        json: {
          rootJson: 'base',
          files: [
            { src: 'test/fixtures/i18n.js', dest: 'tmp/i18n', split: false }
          ]
        }
      },

      prop: {
        props: {
          rootProp: 'base',
          languages: ['pt-pt', 'es-es'],
          files: [
            { src: 'test/fixtures/properties/', dest: 'tmp/i18n', root: true }
          ]
        }
      }
    },

    // Unit tests.
    nodeunit: {
      tests: ['test/*_test.js']
    }
  });

  grunt.loadTasks('tasks');

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-nodeunit');

  grunt.registerTask('test', ['jshint', 'clean', 'test-json', 'test-prop']);
  grunt.registerTask('test-prop', ['i18n:prop', 'nodeunit']);
  grunt.registerTask('test-json', ['i18n', 'nodeunit']);

  grunt.registerTask('default', ['test']);
};
