'use strict';

var path = require('path');
var fs = require('fs');
var mkdirp = require('mkdirp');

var generators = require('yeoman-generator');
var slug = require('slug');
var _ = require('lodash');

var filter = require('gulp-filter');

module.exports = generators.Base.extend({
    constructor: function () {
        generators.Base.apply(this, arguments);
    },

    prompting: function () {
        var done = this.async();

        this.prompt([{
            type: 'input',
            name: 'title',
            message: 'Your talk title',
            default: 'Lorem ipsum'
        }, {
            type: 'input',
            name: 'author',
            message: 'Author',
            default: 'Someone',
            store: true
        }, {
            type: 'confirm',
            name: 'hasCode',
            message: 'Use syntax highlighting for code samples',
            default: true,
            store: true
        }, {
            type: 'list',
            name: 'html',
            message: 'HTML templating',
            choices: [
                { name: 'None (raw HTML)', value: 'html' },
                { name: 'Jade', value: 'jade' }
            ],
            default: 'html',
            store: true
        }, {
            type: 'list',
            name: 'css',
            message: 'CSS processing',
            choices: [
                { name: 'None (raw CSS)', value: 'css' },
                { name: 'Sass', value: 'sass' },
                { name: 'Less', value: 'less' }
            ],
            default: 'css',
            store: true
        }], function (answers) {
            this.answers = answers;
            done();
        }.bind(this));
    },

    writing: function () {
        let data = { slug: slug };
        _.extend(data, this.answers);

        // create empty folders
        mkdirp.sync(path.join(this.destinationPath(), 'src', 'fonts'));
        mkdirp.sync(path.join(this.destinationPath(), 'src', 'images'));

        // template files
        [
            'package.json',
            'gulpfile.js',
            'src/main.js',
            'src/index.jade',
            `src/styles.${this.answers.css === 'less' ? 'less' : 'sass'}`
        ].map(function (filename) {
            this.fs.copyTpl(
                this.templatePath(filename),
                this.destinationPath(filename),
                data);
        }.bind(this));

        // process jade template to ouput a HTML file if needed
        if (this.answers.html === 'html') {
            let jadeFilter = filter(['**/*.jade'], {restore: true});
            this.registerTransformStream(jadeFilter);
            this.registerTransformStream(require('gulp-jade')({pretty: true}));
            this.registerTransformStream(jadeFilter.restore);
        }
        // process Sass template to ouput a CSS file if needed
        if (this.answers.css === 'css') {
            let sassFilter = filter(['**/*.sass'], {restore: true});
            this.registerTransformStream(sassFilter);
            this.registerTransformStream(require('gulp-sass')({indentWidth: 4}));
            this.registerTransformStream(sassFilter.restore);
        }
    },

    install: function () {
        this.installDependencies({bower: false});
    }
});
