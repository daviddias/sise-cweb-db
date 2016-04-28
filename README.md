SISE-DB
=======

[![](https://img.shields.io/badge/INESC-GSD-brightgreen.svg?style=flat-square)](http://www.gsd.inesc-id.pt/)
[![](https://img.shields.io/badge/TÉCNICO-LISBOA-blue.svg?style=flat-square)](http://tecnico.ulisboa.pt/)
[![](https://img.shields.io/badge/SISE-CWEB-brightgreen.svg?style=flat-square)](http://tecnico.ulisboa.pt/)

> In memory db (super simple) used for the CWEB course on the SISE Post Graduation at INESC-ID + IST.

# Installation

To install sise-db in your project folder, execute the following command (you need Node.js and npm installed)

```sh
> npm install sise-db --save
```

then

```JavaScript
var SISEDB = require('sise-db')
var db = new SISEDB()
```

# API

`sise-db` provides an API for DB migrations and a both Synchronous and Asynchronous API for data access and storage.

### DB Migrations

In order to 'warm up' our DB, we can load a previously exported DB.

#### Importing a DB

```JavaScript
var previousDB = {
  // ...  
}

db.import(previousDB)
```

#### Exporting a DB

```JavaScript
var exported = db.export()
```

### Synchronous API

#### getInsurances

```JavaScript
var insurances = db.getInsurances()
// insurances is an array with the types of insurance available
```

#### getInsurance

```JavaScript
var insurance = db.getInsurance(<type>)
// insurance is an object with the complete information about the Insurance
```

`type` must be a string

#### getUsers

```JavaScript
var users = db.getUsers()
// users is an array with all the NIF numbers of users that requested for Insurance quotes
```

#### getUser

```JavaScript
var user = db.getUser(<nif>)
// The user object, with all its information and the quotes it requested
```

`nif` must be a string

#### putUser

```JavaScript
db.putUser(<user>)
```

`user` is a user object. If a user information already existed, it replaces it

### Asynchronous API

#### getInsurances

```JavaScript
db.getInsurances(function (err, insurances) {
 // `insurances` is an array with the types of insurance available
})
```

#### getInsurance

```JavaScript
db.getInsurance(<type>, function (err, insurance) {
  // `insurance` is an object with the complete information about the Insurance
})
```

`type` must be a string

#### getUsers

```JavaScript
var users = cb.getUsers()
// users is an array with all the NIF numbers of users that requested for Insurance quotes
```

#### getUser

```JavaScript
var user = db.getUser(<nif>)
// The user object, with all its information and the quotes it requested
```

`nif` must be a string

#### putUser

```JavaScript
db.putUser(<user>)
```

`user` is a user object. If a user information already existed, it replaces it

# Notes

If you are brave enough to read the code, you will see how siseSB couldn't be more simpler and really lacking important features like data validation that could compromise the DB. That was left to be done intentionally, so that users of siseDB have to handle the data with care. If are a student of the SISE CWEB course and are able to successfuly make a PR to siseDB that improves the quality of the DB, you get bonus extra points! Consider it a challenge :D
