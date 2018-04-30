# Party Planner

## Prerequisites

The following should be installed and available on the path:

* Node 8+
* npm 5+

The following DB should be available (a connection string can be supplied via a environment variables):

* mongodb

## Setup

1. Clone the repository: `git clone https://github.com/sjones6/party-planner`
2. copy the `.env.example` file to `.env` and fill in the empty values
3. Install dependencies: `npm i`
4. Start the development server: `npm start` (includes bundling of client-side assets)
5. Once server starts, open up the project in a browser: `localhost:9090`

You should be taken to the login screen where you can register and then sign-in.

## Frameworks

* Server: Express
* Client: Vue 2

## Testing

Testing uses Karma for browser-testing and Mocha as a test runner. Assertions provided via Chai. Spies, stubs, and mocks via sinon.

Server code is covered by integration tests, facilitated by supertest.

## Tooling

* Prettier: code formatting
* Istanbul: code coverage
* Mocha: test runner
* Karma: browser testing
* webpack: bundler
* husky: git hooks

## Internationalization

The build is setup for internationalization. Translations can be placed in the `lang/` directory, and follow the precedent set by `lang/es-es.js`. Additional language can then be added to the `./i18n.conf.js` file.