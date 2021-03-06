'use strict'

const INTEGER = 1989
const FLOAT = 19.89
const NUMBER = 198.9

const tap = require('tap')

const CtrlEnv = require('../ctrl-env')

function assertClean(t, assertions) {
  t.equals(assertions.warnings.length, 0)
  t.equals(assertions.errors.length, 0)
}

// Positives
tap.test('should throw missing required var', (t) => {
  const ctrlEnv = new CtrlEnv([
    ['MISSING_REQUIRED_VAR'],
  ], {
    prefix: 'PREFIXED',
  })

  t.throws(ctrlEnv.assert)

  t.end()
})

tap.test('should warn missing optional var', (t) => {
  const ctrlEnv = new CtrlEnv([
    ['MISSING_OPTIONAL_VAR', {required: false}],
  ], {
    prefix: 'PREFIXED',
  })

  const assertions = ctrlEnv.assert()
  t.equals(assertions.warnings.length, 1)
  t.equals(assertions.errors.length, 0)

  t.end()
})

tap.test('should throw invalid required var', (t) => {
  const ctrlEnv = new CtrlEnv([
    ['INVALID_REQUIRED_VAR', {values: ['sparks fly b-side']}],
  ], {
    prefix: 'PREFIXED',
  })

  t.ok(process.env.INVALID_REQUIRED_VAR)
  t.throws(ctrlEnv.assert)

  t.end()
})

tap.test('should throw invalid optional var', (t) => {
  const ctrlEnv = new CtrlEnv([
    ['INVALID_OPTIONAL_VAR', {values: ['sparks fly b-side']}],
  ], {
    prefix: 'PREFIXED',
  })

  t.ok(process.env.INVALID_OPTIONAL_VAR)
  t.throws(ctrlEnv.assert)

  t.end()
})

tap.test('should throw invalid integer var', (t) => {
  const ctrlEnv = new CtrlEnv([
    ['INVALID_INTEGER_VAR', {type: 'integer'}],
  ], {
    prefix: 'PREFIXED',
  })

  t.ok(process.env.INVALID_INTEGER_VAR)
  t.throws(ctrlEnv.assert)

  t.end()
})

tap.test('should throw invalid float var', (t) => {
  const ctrlEnv = new CtrlEnv([
    ['INVALID_FLOAT_VAR', {type: 'float'}],
  ], {
    prefix: 'PREFIXED',
  })

  t.ok(process.env.INVALID_FLOAT_VAR)
  t.throws(ctrlEnv.assert)

  t.end()
})

tap.test('should throw invalid number var', (t) => {
  const ctrlEnv = new CtrlEnv([
    ['INVALID_NUMBER_VAR', {type: 'number'}],
  ], {
    prefix: 'PREFIXED',
  })

  t.ok(process.env.INVALID_NUMBER_VAR)
  t.throws(ctrlEnv.assert)

  t.end()
})

tap.test('should throw overwrite getter', (t) => {
  const ctrlEnv = new CtrlEnv([
    ['REQUIRED_VAR'],
  ], {
    prefix: 'PREFIXED',
  })

  const assertions = ctrlEnv.assert()
  t.equals(assertions.warnings.length, 0)
  t.equals(assertions.errors.length, 0)

  t.throws(() => {
    ctrlEnv.REQUIRED_VAR = 'blah'
  })

  t.end()
})

// Negatives
tap.test('should pass required var', (t) => {
  const ctrlEnv = new CtrlEnv([
    ['REQUIRED_VAR'],
  ], {
    prefix: 'PREFIXED',
  })

  const assertions = ctrlEnv.assert()
  t.equals(assertions.warnings.length, 0)
  t.equals(assertions.errors.length, 0)

  t.equals(ctrlEnv.REQUIRED_VAR, 'taylor swift b-side')

  t.end()
})

tap.test('should pass optional var', (t) => {
  const ctrlEnv = new CtrlEnv([
    ['OPTIONAL_VAR', {required: false}],
  ], {
    prefix: 'PREFIXED',
  })

  const assertions = ctrlEnv.assert()
  t.equals(assertions.warnings.length, 0)
  t.equals(assertions.errors.length, 0)

  t.equals(ctrlEnv.OPTIONAL_VAR, '1989 b-side')

  t.end()
})

tap.test('should pass valid required var', (t) => {
  const ctrlEnv = new CtrlEnv([
    ['VALID_REQUIRED_VAR', {values: ['sparks fly b-side']}],
  ], {
    prefix: 'PREFIXED',
  })

  const assertions = ctrlEnv.assert()
  t.equals(assertions.warnings.length, 0)
  t.equals(assertions.errors.length, 0)

  t.equals(ctrlEnv.VALID_REQUIRED_VAR, 'sparks fly b-side')

  t.end()
})

tap.test('should pass valid optional var', (t) => {
  const ctrlEnv = new CtrlEnv([
    ['VALID_OPTIONAL_VAR', {values: ['enchanted b-side']}],
  ], {
    prefix: 'PREFIXED',
  })

  const assertions = ctrlEnv.assert()
  t.equals(assertions.warnings.length, 0)
  t.equals(assertions.errors.length, 0)

  t.equals(ctrlEnv.VALID_OPTIONAL_VAR, 'enchanted b-side')

  t.end()
})

tap.test('should get required var', (t) => {
  const ctrlEnv = new CtrlEnv([
    ['REQUIRED_VAR'],
  ], {
    prefix: 'PREFIXED',
  })

  const assertions = ctrlEnv.assert()
  t.equals(assertions.warnings.length, 0)
  t.equals(assertions.errors.length, 0)

  t.equals(ctrlEnv.REQUIRED_VAR, 'taylor swift b-side')

  t.end()
})

tap.test('should get valid integer var', (t) => {
  const ctrlEnv = new CtrlEnv([
    ['VALID_INTEGER_VAR', {type: 'integer'}],
  ], {
    prefix: 'PREFIXED',
  })

  assertClean(t, ctrlEnv.assert())
  t.equals(ctrlEnv.VALID_INTEGER_VAR, INTEGER)

  t.end()
})

tap.test('should get valid float var', (t) => {
  const ctrlEnv = new CtrlEnv([
    ['VALID_FLOAT_VAR', {type: 'float'}],
  ], {
    prefix: 'PREFIXED',
  })

  assertClean(t, ctrlEnv.assert())
  t.equals(ctrlEnv.VALID_FLOAT_VAR, FLOAT)

  t.end()
})

tap.test('should get valid number var', (t) => {
  const ctrlEnv = new CtrlEnv([
    ['VALID_NUMBER_VAR', {type: 'number'}],
  ], {
    prefix: 'PREFIXED',
  })

  assertClean(t, ctrlEnv.assert())
  t.equals(ctrlEnv.VALID_NUMBER_VAR, NUMBER)

  t.end()
})

tap.test('should get all vars', (t) => {
  const ctrlEnv = new CtrlEnv([
    ['REQUIRED_VAR'],
    ['OPTIONAL_VAR', {required: false}],
    ['VALID_REQUIRED_VAR', {values: ['sparks fly b-side']}],
    ['VALID_OPTIONAL_VAR', {values: ['enchanted b-side']}],
  ], {
    prefix: 'PREFIXED',
  })

  const assertions = ctrlEnv.assert()
  t.equals(assertions.warnings.length, 0)
  t.equals(assertions.errors.length, 0)

  t.deepEquals(ctrlEnv.all, {
    OPTIONAL_VAR: '1989 b-side',
    REQUIRED_VAR: 'taylor swift b-side',
    VALID_OPTIONAL_VAR: 'enchanted b-side',
    VALID_REQUIRED_VAR: 'sparks fly b-side',
  })

  t.end()
})

tap.test('should pass prefixless required var', (t) => {
  const ctrlEnv = new CtrlEnv([
    ['PREFIXLESS_REQUIRED_VAR', {prefixed: false}],
  ], {
    prefix: 'PREFIXED',
  })

  const assertions = ctrlEnv.assert()
  t.equals(assertions.warnings.length, 0)
  t.equals(assertions.errors.length, 0)

  t.equals(ctrlEnv.PREFIXLESS_REQUIRED_VAR, 'fearless')

  t.end()
})
