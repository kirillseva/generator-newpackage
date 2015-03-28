'use strict';

var path = require('path');
var assert = require('yeoman-generator').assert;
var helpers = require('yeoman-generator').test;

describe('newpackage:function', function () {
  before(function (done) {
    helpers.run(path.join(__dirname, '../function'))
      .withArguments(['somefunction'])
      .on('end', done);
  });

  it('creates the function file', function () {
    assert.file([
      'R/somefunction.R'
    ]);
  });
});
