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
    if (callback) {
      process.nextTick(function () {
        callback(null, Object.keys(self.db.insurances))
      })
    } else {
      return Object.keys(self.db.insurances)
    }
  }

  self.getInsurance = function (type, callback) {
    if (callback) {
      process.nextTick(function () {
        if (process.env.CRAZY_MONKEY) {
          return callback(new Error('db failed'))
        }
        if (process.env.SLOW_MONKEY) {
          return setTimeout(function () {
            callback(null, self.db.insurances[type])
          }, 1500)
        }
        callback(null, self.db.insurances[type])
      })
    } else {
      if (process.env.SLOW_MONKEY) {
        // TODO calc first 100 of fib and set it to a env
      }
      return self.db.insurances[type]
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
        if (process.env.SLOW_MONKEY) {
          return setTimeout(function () {
            callback(null, self.db.users[nif])
          }, 1500)
        }
      })
    } else {
      if (process.env.SLOW_MONKEY) {
        // TODO calc first 100 of fib and set it to a env
      }
      return self.db.users[nif]
    }
  }

  self.putUser = function (user, callback) {
    if (callback) {
      process.nextTick(function () {
        self.db.users[user.nif] = user
        callback()
      })
    } else {
      self.db.users[user.nif] = user
    }
  }
}
