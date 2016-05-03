var test = require('tape')
var SISEDB = require('../src')

var testData = require('./migrations')
var db

test('Create', function (t) {
  var db = new SISEDB()
  t.ok(db, 'sise-db instantiated correctly')
  t.end()
})

test('Import', function (t) {
  db = new SISEDB()
  db.import(testData)
  t.deepEqual(testData, db.export())
  t.end()
})

test('Sync: getInsurances', function (t) {
  var expected = [
    'base',
    'devices',
    'fire',
    'burglar',
    'naturalDisaster'
  ]

  var res = db.getInsurances()
  t.deepEqual(res, expected)
  t.end()
})

test('Sync: getInsurance', function (t) {
  var expected = {
    costPerYear: 10000,
    description: 'Covers problems related with construction',
    discountPerYear: 1,
    maxDiscount: 10
  }

  var res = db.getInsurance('base')
  t.deepEqual(res, expected)
  t.end()
})

test('Sync: getUsers', function (t) {
  var expected = [ '111222333', '123456789' ]

  var res = db.getUsers()
  t.deepEqual(res, expected)
  t.end()
})

test('Sync: getUser', function (t) {
  var expected = {
    address: 'Av. Já Fostes',
    dateOfBirth: 'Mon Mar 10 1986 14:51:53 GMT+0100 (WEST)',
    name: 'Roberto Desleal',
    nif: '111222333', quotes: []
  }
  var res = db.getUser('111222333')
  t.deepEqual(res, expected)
  t.end()
})

test('Sync: putUser', function (t) {
  var user = {
    address: 'Av. dos Prazeres e mais',
    dateOfBirth: 'Mon Mar 15 1956 14:51:53 GMT+0100 (WEST)',
    name: 'Maria Bonita',
    nif: '111222666', quotes: []
  }

  db.putUser(user)
  var res = db.getUser('111222666')
  t.deepEqual(res, user)
  t.end()
})

test('Sync: SLOW MONKEY', function (t) {
  // TODO
  console.log('TODO')
  t.ok(true, 'TODO')
  t.end()
})

test('Sync: CRAZY MONKEY', function (t) {
  process.env.CRAZY_MONKEY = 'enabled'

  try {
    db.getInsurance('base')
    t.fail()
  } catch (err) {
    t.ok(Boolean(err), 'db failed as expected')
    process.env.CRAZY_MONKEY = 'disabled'
    t.end()
  }
})

test('Async: getInsurances', function (t) {
  var expected = [
    'base',
    'devices',
    'fire',
    'burglar',
    'naturalDisaster'
  ]

  db.getInsurances(function (err, res) {
    t.ifErr(err)
    t.deepEqual(res, expected)
    t.end()
  })
})

test('Async: getInsurance', function (t) {
  var expected = {
    costPerYear: 10000,
    description: 'Covers problems related with construction',
    discountPerYear: 1,
    maxDiscount: 10
  }

  db.getInsurance('base', function (err, res) {
    t.ifErr(err)
    t.deepEqual(res, expected)
    t.end()
  })
})

test('Async: getUsers', function (t) {
  var expected = [ '111222333', '111222666', '123456789' ]

  db.getUsers(function (err, res) {
    t.ifErr(err)
    t.deepEqual(res, expected)
    t.end()
  })
})

test('Async: getUser', function (t) {
  var expected = {
    address: 'Av. Já Fostes',
    dateOfBirth: 'Mon Mar 10 1986 14:51:53 GMT+0100 (WEST)',
    name: 'Roberto Desleal',
    nif: '111222333', quotes: []
  }
  db.getUser('111222333', function (err, res) {
    t.ifErr(err)
    t.deepEqual(res, expected)
    t.end()
  })
})

test('Async: putUser', function (t) {
  var user = {
    address: 'Av. Streaaams',
    dateOfBirth: 'Mon Mar 12 1756 14:51:53 GMT+0100 (WEST)',
    name: 'Mr Callbacks',
    nif: '666666666', quotes: []
  }

  db.putUser(user, function (err) {
    t.ifErr(err)
    var res = db.getUser('666666666')
    t.deepEqual(res, user)
    t.end()
  })
})

test('Async: SLOW MONKEY', function (t) {
  var timeS = new Date()
  process.env.SLOW_MONKEY = 'enabled'

  db.getInsurance('base', function (err, res) {
    t.ifErr(err)
    var timeE = new Date()
    var diff = timeE - timeS
    t.ok(diff > 1000, 'service was slow')
    process.env.SLOW_MONKEY = 'disabled'
    t.end()
  })
})

test('Async: CRAZY MONKEY', function (t) {
  process.env.CRAZY_MONKEY = 'enabled'

  db.getInsurance('base', function (err, res) {
    t.ok(Boolean(err), 'db failed as expected')
    process.env.CRAZY_MONKEY = 'disabled'
    t.end()
  })
})
