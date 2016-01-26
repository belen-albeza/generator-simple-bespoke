# generator-simple-bespoke

[Yeoman](http://yeoman.io/) generator for a simple [Bespoke.js](http://markdalgleish.com/projects/bespoke.js/) setup.

Bespoke.js is a module to create **HTML 5 slideshows**. It's design is extremely modular, and functionality is usually achieved via plugins. There is an official generator for Yeoman, but I'm not very happy with its setup, so I decided to roll out my own.

Yeoman is a **scaffolding** tool. It will produce templates for different types of projects, which you can configure.

The slideshow template that is generated features the following:

## Installation

Install Yeoman if you don't have it in your system. The generated template uses [Gulp](http://gulpjs.com/) to run tasks (build Browserify, publish the slideshow in Github pages) so you will need to install it as well.

```
npm -g install yo gulp
```

Install the generator:

```
npm install generator-simple-bespoke
```

To build the slideshow, publish it on Github, etc. you will need [Gulp](http://gulpjs.com/) as a task runner:

```
npm install -g gulp
```

## Usage

### Generate the template

Now create an empty directory for your slideshow project, and run Yeoman inside it:

```
mkdir slides
cd slides
yo simple-bespoke
```

You will be asked the title of your talk, whether you need syntax highlighting code, etc.

### Making the slideshow

You can create a release in a `dist` directory, ready to be consumed (or deployed via `rsync` to a server):

```
gulp dist
```

While you are writing the presentation, it is usually more convenient to have Gulp automatically rebuild the assets as you are modifying them. You can use the `dev` task to do this. This will also reload your browser automatically.

```
gulp dev
```

To clean up the `dist` folder and development build files, run:

```
gulp clean
```

### About themes

I find that Bespoke.js theme plugins are hard to work with. The way the work is by analysing a stylesheet and then applying those styles, inline, with JavaScript, to elements of the DOM.

This has several disadvantages, such as ruining the CSS cascade and making the theme extremely hard to customise.

This generator does not use that theme system. Instead, a simple stylesheet is provided with barebones functionality (so you can have an actual slideshow). You can add your own styles to this stylesheet.

## License

`generator-simple-bespoke` is released under the MIT license. Read `LICENSE` for details.
