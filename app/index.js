'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var path = require('path');
var ini = require('iniparser');

module.exports = yeoman.generators.Base.extend({
  init: function () {
    this.argument('name', { type: String, required: false });
    this.makedir = this.name === undefined ? false : true; // mkdir if name supplied
    this.appname = this.name || path.basename(process.cwd());
    this.appname = this._.camelize(this._.slugify(this._.humanize(this.appname)));
    this.pkg = require('../package.json');
  },

  prompting: function () {
    var done = this.async();
    // get some info about the user
    var getUserHome = function () {
      return process.env.HOME || process.env.HOMEPATH || process.env.USERPROFILE;
    }
    var gitconfig = ini.parseSync(getUserHome() + '/.gitconfig');
    this.username = gitconfig.user.name.split(" ")[0] || "Hadley";
    this.userlastname = gitconfig.user.name.split(" ")[1] || "Wickham";
    this.useremail = gitconfig.user.email || "no@email.com";

    // Have Yeoman greet the user.
    this.log(yosay(
      'Hello ' + chalk.yellow(this.username) +
      '! I\'m sure this package will be better than your previous one.' +
      ' Keep trying!'
    ));

    var prompts = [
      {
        name: 'packageName',
        message: 'What will the name of your package be?',
        default: this.appname
      },
      {
        name: 'authorName',
        message: 'What is your first name?',
        default: this.username
      },
      {
        name: 'authorLastName',
        message: 'What is your last name?',
        default: this.userlastname
      },
      {
        name: 'authorEmail',
        message: 'What is your email?',
        default: this.useremail
      },
      {
        name: 'github',
        message: 'Last but not least, what is your github username?',
        default: 'hadley'
      }
      ];

    this.prompt(prompts, function (props) {
      this.packageName = props.packageName;
      this.authorName = props.authorName;
      this.authorLastName = props.authorLastName;
      this.authorEmail = props.authorEmail;
      this.authorGithub = props.github;

      done();
    }.bind(this));
  },

  writing: {
    makedir: function () {
      if (this.makedir) {
        this.mkdir(this.packageName);
        this.pathPrefix = this.packageName + '/';
      } else {
        this.pathPrefix = '';
      }
    },

    projectfiles: function () {
      var asIs = [
        'NEWS.md',
        'NAMESPACE',
        '.travis.yml',
        'tests/testthat/test-pending.R',
        'R/pending.R'
        ],
        yoman = this;

      this.fs.copyTpl(
        this.templatePath('README.md'),
        this.destinationPath(this.pathPrefix + 'README.md'),
        {packageName: this.packageName}
      );

      this.fs.copyTpl(
        this.templatePath('R/package.name-package.R'),
        this.destinationPath(this.pathPrefix + 'R/'+this.packageName+'-package.R'),
        {packageName: this.packageName}
      );

      this.fs.copyTpl(
        this.templatePath('man/package.name.Rd'),
        this.destinationPath(this.pathPrefix + 'man/'+this.packageName+'.Rd'),
        {packageName: this.packageName}
      );

      this.fs.copyTpl(
        this.templatePath('tests/test-all.R'),
        this.destinationPath(this.pathPrefix + 'tests/test-all.R'),
        {packageName: this.packageName}
      );

      this.fs.copyTpl(
        this.templatePath('DESCRIPTION'),
        this.destinationPath(this.pathPrefix + 'DESCRIPTION'),
        {
          packageName: this.packageName,
          authorName: this.authorName,
          authorLastName: this.authorLastName,
          authorEmail: this.authorEmail,
          authorGithub: this.authorGithub
        }
      );

      this._.each(asIs, function (filename) {
        yoman.fs.copy(
          yoman.templatePath(filename),
          yoman.destinationPath(yoman.pathPrefix + filename)
        );
      });
    }
  }
});
