var test = require('tape')
var SISEDB = require('../src')

var testData = require('./migrations')

test('Create', function (t) {
  var db = new SISEDB()
  t.ok(db, 'sise-db instantiated correctly')
  t.end()
})

test('Import', function (t) {
  var db = new SISEDB()
  db.import(testData)
  t.deepEqual(testData, db.export())
  t.end()
})

test('Sync: getInsurances', function (t) { // TODO
  t.ok(true, 'TODO')
  t.end()
})

test('Sync: getInsurance', function (t) { // TODO
  t.ok(true, 'TODO')
  t.end()
})

test('Sync: getUsers', function (t) { // TODO
  t.ok(true, 'TODO')
  t.end()
})

test('Sync: getUser', function (t) { // TODO
  t.ok(true, 'TODO')
  t.end()
})

test('Sync: putUser', function (t) { // TODO
  t.ok(true, 'TODO')
  t.end()
})

test('Sync: SLOW MONKEY', function (t) { // TODO
  t.ok(true, 'TODO')
  t.end()
})

test('Sync: CRAZY MONKEY', function (t) { // TODO
  t.ok(true, 'TODO')
  t.end()
})

test('Async: getInsurances', function (t) { // TODO
  t.ok(true, 'TODO')
  t.end()
})

test('Async: getInsurance', function (t) { // TODO
  t.ok(true, 'TODO')
  t.end()
})

test('Async: getUsers', function (t) { // TODO
  t.ok(true, 'TODO')
  t.end()
})

test('Async: getUser', function (t) { // TODO
  t.ok(true, 'TODO')
  t.end()
})

test('Async: putUser', function (t) { // TODO
  t.ok(true, 'TODO')
  t.end()
})

test('Async: SLOW MONKEY', function (t) { // TODO
  t.ok(true, 'TODO')
  t.end()
})

test('Async: CRAZY MONKEY', function (t) { // TODO
  t.ok(true, 'TODO')
  t.end()
})
