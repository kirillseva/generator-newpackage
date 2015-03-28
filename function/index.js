'use strict';
var yeoman = require('yeoman-generator');

module.exports = yeoman.generators.Base.extend({
  initializing: function () {
    this.argument('name', {
      required: true,
      type: String,
      desc: 'The function name'
    });
  },

  writing: function () {
    this.fs.copyTpl(
      this.templatePath('somefunction.R'),
      this.destinationPath('R/' + this.name + '.R'),
      {functionName: this.name}
    );
  }
});
