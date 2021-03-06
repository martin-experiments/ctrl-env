# ctrl-env

[![Build Status](https://travis-ci.org/martin-experiments/ctrl-env.svg?branch=master)](https://travis-ci.org/martin-experiments/ctrl-env)
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/7986492604f542938f19f4907a4e7f0c)](https://www.codacy.com/app/suitupalex/ctrl-env?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=martin-experiments/ctrl-env&amp;utm_campaign=Badge_Grade)
[![Codacy Badge](https://api.codacy.com/project/badge/Coverage/7986492604f542938f19f4907a4e7f0c)](https://www.codacy.com/app/suitupalex/ctrl-env?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=martin-experiments/ctrl-env&amp;utm_campaign=Badge_Coverage)

An alternative way to assert environment variables.

## Installation

[Yarn](https://yarnpkg.com) is recommended for installation.

```bash
$ yarn add ctrl-env
```

But you can still use npm:

```bash
$ npm install --save ctrl-env
```

## Usage

```javascript
// Example app.js:

const CtrlEnv = require('ctrl-env')

const ctrlEnv = new CtrlEnv([
  ['SECRET']
, ['PORT', {required: false}]
], {
  prefix: 'TWITTER_FEED'
})

ctrlEnv.assert()

// Some Twitter Feed and Server pseudo code:

http.on('/feed', (request, response) => {
  Twitter.getFeed({
    handle: '_experiments'
  , secret: ctrlEnv.SECRET
  }, (error, feed) => {
    if (error) {
      throw error
    }

    response.send(feed)
  })
})

http.listen(ctrlEnv.PORT)
```

```bash
$ TWITTER_FEED_SECRET='twitter_secret_key' TWITTER_FEED_PORT=8080 node app.js
$ # or
$ TWITTER_FEED_SECRET='twitter_secret_key' node app.js
```

### Methods v2

#### constructor(*Array* environmentVariables, *Object* options)

The constructor takes an array of environment variables to expect. The variables
themselves can be configured:

```javascript
const exampleEnvVars = [
  // Variable is required and can be any value:
  ['REQUIRED_VARIABLE']

  // Variable is optional and can be any value:
, ['OPTIONAL_VARIABLE', {required: false}]

  // Variable is required and can only be yes or no:
, ['LIMITED_VARIABLE', {values: ['yes', 'no']}]

  // Variable is required and can only be an integer:
, ['TYPED_VARIABLE', {type: 'integer'}]

  // Variable is optional and can only be yes or no:
, ['OPTIONAL_LIMITED_VARIABLE', {required: false, values: ['yes', 'no']}]

  // Variable is required but is not prefixed:
, ['NODE_ENV', {prefixed: false}]
]

const ctrlEnv = new CtrlEnv(exampleEnvVars)
```

The constructor also takes an optional `prefix` and `separator`. The `separator`
only determines what seperates the prefix and the variable name:

```javascript
// Variables must be labeled TEST_(VARIABLENAME):
new CtrlEnv(..., {prefix: 'TEST'})

// Variables must be labeled TEST___(VARIABLENAME)
new CtrlEnv(..., {prefix: 'TEST', separator: '___'})
```

#### ctrlEnv.assert()

This method actually reads the environment variables and asserts that they exist
or have the required values. Note: This method is synchronous.

#### *get* ctrlEnv.VARIABLE_NAME

To read the environment variable, simply use the variable name without the
prefix as a property of your `CtrlEnv` instance. This property is a proper
ES2015 getter that does not have a setter. It cannot be overwritten without
using `Object.defineProperty`.

#### *get* ctrlEnv.all

This returns an object with all asserted environment variables. This property is
a propert ES2015 getter that does not have a setter. It cannot be overwritten
without `Object.defineProperty`.

> Note: This deprecates #get() from v1.

## License

Copyright (c) 2017 Martin Experiments LLC

MIT (https://www.opensource.org/licenses/MIT)
