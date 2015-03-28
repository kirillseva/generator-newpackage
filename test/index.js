'use strict';
var yeoman = require('yeoman-generator');

module.exports = yeoman.generators.Base.extend({
  initializing: function () {
    this.argument('name', {
      required: true,
      type: String,
      desc: 'The test name'
    });
  },

  writing: function () {
    this.fs.copyTpl(
      this.templatePath('test.R'),
      this.destinationPath('tests/testthat/test-' + this.name + '.R'),
      {testName: this.name}
    );
  }
});
