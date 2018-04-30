# Party Planner

## Prerequisites

The following should be installed and available on the path:

* Node 8+
* npm 5+

The following DB should be available (a connection string can be supplied via a environment variables):

* mongodb
* https://developer.edamam.com/ API application ID and key

## Setup

1. Clone the repository: `git clone https://github.com/sjones6/party-planner`
2. copy the `.env.example` file to `.env` and fill in the empty values
3. Install dependencies: `npm i`
4. Start the development server: `npm start` (includes bundling of client-side assets)
5. Once server starts, open up the project in a browser: `localhost:9090`

You should be taken to the login screen where you can register and then sign-in.

Note: for the API keys, a free developer-tier account can be created here: https://developer.edamam.com/.

## Frameworks

* Server: Express
* Auth: passport
* Client: Vue 2

## Tooling

* Prettier: code formatting
* Istanbul: code coverage
* Mocha: test runner
* Karma: browser testing
* webpack: bundler
* husky: git hooks

## Other

### Testing

Client: [no tests implemented yet] Configured Karma for browser-testing and Mocha as a test runner. Assertions provided via Chai. Spies, stubs, and mocks via sinon.

Server: code is covered by integration tests, facilitated by supertest.

### Internationalization

The build is setup for internationalization. Translations can be placed in the `lang/` directory, and follow the precedent set by `lang/es-es.js`. Additional language can then be added to the `./i18n.conf.js` file.

### VSCode

A couple configurations are provided in `.vscode/launch.json` to run server unit tests and the development server.

### Webpack 4

Webpack has been configured to use tree-shaking and module concatenation. These should help lead to the smallest possible bundle size and fastest initialization on the client.

`npm run analyze` will build a production bundle and show a visual display of the bundled code.