'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var path = require('path');
var ini = require('ini');
var fs = require('fs');

module.exports = yeoman.generators.Base.extend({
  init: function () {
    this.argument('name', { type: String, required: false });
    this.appname = this.name || path.basename(process.cwd());
    this.appname = this._.camelize(this._.slugify(this._.humanize(this.appname)));
    this.pkg = require('../package.json');
  },

  getAuthorDefaults: function () {
    var done = this.async();
    var getUserHome = function () {
      return process.env.HOME || process.env.HOMEPATH || process.env.USERPROFILE;
    }
    var gitconfig = ini.parse(fs.readFileSync(getUserHome() + '/.gitconfig'));
    this.log(gitconfig.user.name);
    done();
  },

  prompting: function () {
    var done = this.async();

    // Have Yeoman greet the user.
    this.log(yosay(
      'I\'m sure this package will be better than your previous one! Keep trying!'
    ));

    var prompts = [
      {
        name: 'packageName',
        message: 'What will the name of your package be?',
        default: this.name ? this.name : "RRRRrrrrrRR"
      },
      {
        name: 'authorName',
        message: 'What is your first name?',
        default: this.name ? this.name : "RRRRrrrrrRR"
      }
      ];

    this.prompt(prompts, function (props) {
      this.packageName = props.packageName;

      done();
    }.bind(this));
  },

  writing: {
    app: function () {
    },

    projectfiles: function () {
      var asIs = [
        'NEWS.md',
        'NAMESPACE',
        '.travis.yml'
        ],
        yoman = this;

      this.fs.copyTpl(
        this.templatePath('README.md'),
        this.destinationPath('README.md'),
        {title: this.packageName}
      );

      this._.each(asIs, function(filename){
        yoman.fs.copy(
          yoman.templatePath(filename),
          yoman.destinationPath(filename)
        );
      });
    }
  }
});
