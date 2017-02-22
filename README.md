![OpenProst - The future is liquid](assets/openprost-banner.png)

# About OpenProst

[![Build Status](https://travis-ci.org/dasantonym/open-prost.svg?branch=master)](https://travis-ci.org/dasantonym/open-prost) [![Codacy Badge](https://api.codacy.com/project/badge/Grade/09ecf464b75643af81af07128a1e453e)](https://www.codacy.com/app/dasantonym/open-prost) [![Greenkeeper badge](https://badges.greenkeeper.io/dasantonym/open-prost.svg)](https://greenkeeper.io/) 

This project uses [Feathers](http://feathersjs.com) as backend with [Vue](https://vuejs.org) and [Element UI](http://element.eleme.io) as the frontend.

The source code is written in ES6 JavaScript, using [Babel](https://babeljs.io) to transpile to ES5 and [WebPack](https://webpack.github.io) as the build system for the frontend code.

## Build

To transpile the server code run `npm run babel`. To build the frontend execute `npm run build`. When releasing a version run `npm run release` (builds server, frontend, lints and runs tests).

## Test

Tests are incomplete (i know...) but you can run `npm test` to run whatever is there. Use `npm run jshint` to lint the code for errors.

## Stability

Unstable: Expect patches and features, possible api changes.

## License

Copyright (c) 2017

Licensed under the [MIT license](LICENSE).
