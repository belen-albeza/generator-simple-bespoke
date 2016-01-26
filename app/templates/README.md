# <%= title %>

"<%= title %>" talk by <%= author %>.

Generated with [generator-simple-bespoke](https://github.com/belen-albeza/generator-simple-bespoke).

## Requirements

- Gulp client `npm install -g gulp`

## Usage

Download or clone the repository, then install dependencies:

```
npm install
```

To build the project in a `dist` folder:

```
gulp dist
```

To start development mode, with automatic asset rebuilding and browser reloading:

```
gulp dev
```

<% if (isGithubDeploy) { %>To deploy to Github pages:

```
gulp deploy
```
<% } %>
