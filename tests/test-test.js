'use strict';

var path = require('path');
var assert = require('yeoman-generator').assert;
var helpers = require('yeoman-generator').test;

describe('Newpackage:test', function () {
  before(function (done) {
    helpers.run(path.join(__dirname, '../test'))
      .withArguments(['sometest'])
      .on('end', done);
  });

  it('creates the test file', function () {
    assert.file([
      'tests/testthat/test-sometest.R'
    ]);
  });
});
