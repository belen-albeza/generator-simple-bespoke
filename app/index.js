'use strict';

var generators = require('yeoman-generator');
var slug = require('slug');
var _ = require('lodash');
var path = require('path');

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
            type: 'list',
            name: 'html',
            message: 'HTML templating',
            choices: [
                { name: 'None (raw HTML)', value: 'html' },
                { name: 'Jade', value: 'jade' }
            ],
            default: 'html',
            store: true
        }], function (answers) {
            this.answers = answers;
            done();
        }.bind(this));
    },

    writing: function () {
        let data = { "slug": slug };
        _.extend(data, this.answers);

        // template files
        [
            'package.json'
        ].map(function (filename) {
            this.fs.copyTpl(
                this.templatePath(filename),
                this.destinationPath(path.join('src', filename)),
                data);
        }.bind(this));
    }
});
