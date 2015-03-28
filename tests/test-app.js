'use strict';

var path = require('path');
var assert = require('yeoman-generator').assert;
var helpers = require('yeoman-generator').test;
var os = require('os');

describe('newpackage:app', function () {
  before(function (done) {
    helpers.run(path.join(__dirname, '../app'))
      .inDir(path.join(os.tmpdir(), './temp-test'))
      .withPrompt({ 'packageName': 'testing' })
      .on('end', done);
  });

  it('creates files and interpolates names correctly', function () {
    assert.file([
      'DESCRIPTION',
      'NAMESPACE',
      'README.md',
      '.travis.yml',
      'R/testing-package.R'
    ]);
  });
});
