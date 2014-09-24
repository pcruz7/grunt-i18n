'use strict';

var grunt = require('grunt');

/*
  ======== A Handy Little Nodeunit Reference ========
  https://github.com/caolan/nodeunit

  Test methods:
    test.expect(numAssertions)
    test.done()
  Test assertions:
    test.ok(value, [message])
    test.equal(actual, expected, [message])
    test.notEqual(actual, expected, [message])
    test.deepEqual(actual, expected, [message])
    test.notDeepEqual(actual, expected, [message])
    test.strictEqual(actual, expected, [message])
    test.notStrictEqual(actual, expected, [message])
    test.throws(block, [error], [message])
    test.doesNotThrow(block, [error], [message])
    test.ifError(value)
*/

exports.i18n = {
  setUp: function(done) {
    // setup here if necessary
    done();
  },

  fromJsonRoot: function(test) {
    test.expect(1);

    var actual = grunt.file.read('tmp/i18n-root.properties');
    var expected = grunt.file.read('test/expected/from-json-root.properties');
    test.equal(actual, expected, 'should be converted to a normalized properties file');

    test.done();
  }
};
