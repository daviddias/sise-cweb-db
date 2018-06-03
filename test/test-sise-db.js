var test = require('tape')
var SISEDB = require('../src')

var testData = require('sise-cweb-data')
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
    { id: 'aaaa', name: 'Base' },
    { id: 'aaab', name: 'Electronic Devices' },
    { id: 'aaac', name: 'Fire Hazards' },
    { id: 'aaad', name: 'Theft' },
    { id: 'aaae', name: 'Natural Disasters' }
  ]

  var res = db.getInsurances()
  t.deepEqual(res, expected)
  t.end()
})

test('Sync: getInsurance', function (t) {
  var expected = {
    name: 'Base',
    description: 'Covers problems related with construction'
  }

  var res = db.getInsurance('aaaa')
  t.deepEqual(res, expected)
  t.end()
})

test('Sync: getProperties', function (t) {
  var expected = [
    'Apartment T0',
    'Apartment T1',
    'Apartment T2',
    'Apartment T3',
    'Apartment T4',
    'Apartment T5',
    'Apartment T6',
    'Castle',
    'Cozy bridge'
  ]

  var res = db.getProperties()
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
    name: 'Roberto Desleal',
    nif: '111222333',
    email: 'arroz.com.salsichas@enlatados.com',
    quotes: []
  }
  var res = db.getUser('111222333')
  t.deepEqual(res, expected)
  t.end()
})

test('Sync: putUser', function (t) {
  var user = {
    name: 'Maria Bonita',
    email: 'muito-bom@portugalmail.com',
    nif: '111222666', quotes: []
  }

  db.putUser(user)
  var res = db.getUser('111222666')
  t.deepEqual(res, user)
  t.end()
})

test('Sync: SLOW MONKEY', function (t) {
  var timeS = new Date()
  process.env.SLOW_MONKEY = 'enabled'
  var insurance = db.getInsurance('aaaa')
  t.ok(insurance)
  var timeE = new Date()
  var diff = timeE - timeS
  t.ok(diff > 1000, 'service was slow')
  process.env.SLOW_MONKEY = 'disabled'
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
    { id: 'aaaa', name: 'Base' },
    { id: 'aaab', name: 'Electronic Devices' },
    { id: 'aaac', name: 'Fire Hazards' },
    { id: 'aaad', name: 'Theft' },
    { id: 'aaae', name: 'Natural Disasters' }
  ]

  db.getInsurances(function (err, res) {
    t.ifErr(err)
    t.deepEqual(res, expected)
    t.end()
  })
})

test('Async: getInsurance', function (t) {
  var expected = {
    name: 'Base',
    description: 'Covers problems related with construction'
  }

  db.getInsurance('aaaa', function (err, res) {
    t.ifErr(err)
    t.deepEqual(res, expected)
    t.end()
  })
})

test('Async: getProperties', function (t) {
  var expected = [
    'Apartment T0',
    'Apartment T1',
    'Apartment T2',
    'Apartment T3',
    'Apartment T4',
    'Apartment T5',
    'Apartment T6',
    'Castle',
    'Cozy bridge'
  ]

  db.getProperties(function (err, res) {
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
    name: 'Roberto Desleal',
    email: 'arroz.com.salsichas@enlatados.com',
    nif: '111222333',
    quotes: []
  }
  db.getUser('111222333', function (err, res) {
    t.ifErr(err)
    t.deepEqual(res, expected)
    t.end()
  })
})

test('Async: putUser', function (t) {
  var user = {
    name: 'Mr Callbacks',
    email: 'async@not-async.com',
    nif: '666666666',
    quotes: []
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
