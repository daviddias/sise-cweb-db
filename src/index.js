var fib = require('fib')

module.exports = SISEDB

function SISEDB () {
  var self = this

  self.db = {}

  self.import = function (db) {
    self.db = db
  }

  self.export = function () {
    return self.db
  }

  self.getInsurances = function (callback) {
    var insurances = Object.keys(self.db.insurances).map(function (id) {
      return { id: id, name: self.db.insurances[id].name }
    })
    if (callback) {
      process.nextTick(function () {
        callback(null, insurances)
      })
    } else {
      return insurances
    }
  }

  self.getInsurance = function (type, callback) {
    if (callback) {
      process.nextTick(function () {
        if (process.env.CRAZY_MONKEY === 'enabled') {
          return callback(new Error('db failed'))
        }
        if (process.env.SLOW_MONKEY === 'enabled') {
          return setTimeout(function () {
            callback(null, self.db.insurances[type])
          }, 10000)
        }
        callback(null, self.db.insurances[type])
      })
    } else {
      if (process.env.SLOW_MONKEY === 'enabled') {
        var num = fib(50000000)
        for (var i = 0; i < 2000000000; i++) {
          num--
        }
        process.env.FIB = num
      }
      if (process.env.CRAZY_MONKEY === 'enabled') {
        throw new Error('db failed')
      }

      return self.db.insurances[type]
    }
  }

  self.getProperties = function (callback) {
    if (callback) {
      process.nextTick(function () {
        callback(null, self.db.properties)
      })
    } else {
      return self.db.properties
    }
  }

  self.getUsers = function (callback) {
    if (callback) {
      process.nextTick(function () {
        callback(null, Object.keys(self.db.users))
      })
    } else {
      return Object.keys(self.db.users)
    }
  }

  self.getUser = function (nif, callback) {
    if (callback) {
      process.nextTick(function () {
        if (process.env.SLOW_MONKEY === 'enabled') {
          return setTimeout(function () {
            callback(null, self.db.users[nif])
          }, 10000)
        }
        callback(null, self.db.users[nif])
      })
    } else {
      if (process.env.SLOW_MONKEY === 'enabled') {
        // TODO calc first 100 of fib and set it to a env
      }
      return self.db.users[nif]
    }
  }

  self.putUser = function (user, callback) {
    if (callback) {
      process.nextTick(function () {
        if (process.env.SLOW_MONKEY === 'enabled') {
          return setTimeout(function () {
            self.db.users[user.nif] = user
            callback()
          }, 10000)
        }

        self.db.users[user.nif] = user
        callback()
      })
    } else {
      self.db.users[user.nif] = user
    }
  }
}
