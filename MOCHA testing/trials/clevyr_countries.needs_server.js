/// <reference path="../../../../../typings/mocha/mocha.d.ts"/>

// THIS FILE SHOULD BE REVISTED ONCE WE HAVE A TEST SERVER SPUN UP
// Add THIS to line 79 of passport.js
// if (user.employee_id === '20011111') {
//   user.resetPasswordExpires = 'Fri Sep 04 3000 14:50:52 GMT-0500 (CDT)';
// }

// var https = require('https');
// var request = https.request;

// var MeanUser = require('../../../../core/users/public/services/meanUser.js');
// var request = require('supertest');

var superagent = require('superagent');
var crypto = require('crypto');
var assert = require('assert');
var expect = require('expect.js');
var axios = require('axios');
var mean = require('meanio');
var status = require('http-status');
var mongoose = require('mongoose');
var CountrySchema = require('../models/countries.js');
var Country = mongoose.model('countries');
var UserSchema = require('../../../../core/users/server/models/user.js');
var User = mongoose.model('User');
var ClevyrCountries = require('../controllers/clevyr_countries');

var request = superagent.agent();



// ==== globals ====

var user;
var country;
var uri = mean.config.clean.app.url;


function makeSalt() {
  return crypto.randomBytes(16).toString('base64');
}

function hashPassword(password, salt) {
  if (!password || !salt) return '';
  var saltiest = new Buffer(salt, 'base64');

  // digest param is the fifth param - must be null or a string or it will fail
  // https://nodejs.org/api/all.html#crypto_crypto_pbkdf2_password_salt_iterations_keylen_digest_callback
  return crypto.pbkdf2Sync(password, saltiest, 10000, 64, null).toString('base64');
}

function authenticate(plainText) {
  return true;
}

function cleanupAfter(Collection, query, callback) {
  Collection.findOne(query).remove().exec(function (err) {
    if (err) {
      console.log(query + ' cleanupAfter FAIL');
      callback(err);
      return;
    }
    console.log(query + ' cleanupAfter SUCCESS');
    callback();
  });
}



// ==== Test Clevyr Countries using superagent ====

describe('Test Clevyr Countries Server Controller:', function () {
  before('BeforeEach - Create & Login User:', function (done) {
    var salt = makeSalt();
    var hashed_password = hashPassword('password', salt);

    // create test user
    user = new User({
      name: 'Admin TestUser',
      email: 'adminTestUser@test.com',
      username: 'adminTestUser',
      employee_id: '20011111',
      active: true,
      salt: salt,
      verified: true,
      hashed_password: hashed_password,
      // authenticate: function authenticate(plainText) {
      //   return true;
      // },
      roles: ['admin', 'Administrators']
    });

    // save test user
    user.save(function (err) {
      if (err) {
        console.log('Error saving user: ', err);
        return;
      }

      // login test user
      axios.post(uri + '/api/login', {
        login_credential: user.employee_id,
        password: 'password'
      }).then(function (res) {
        done();
      }).catch(function (err) {
        console.log('failed login:', err);
        done(err);
      })
    });
  });

  // ==== test Clevyr Countries Server Controller ====

  it('should show countries', function (done) {
    axios.get(uri + '/api/countries')
      .then(function (res) {
        if (res && res.data && res.data.constructor === Array) {
          console.log('show countries PASS')
          done();
        } else {
          var err = new Error('Show countries FAIL');
          done(err);
        }
      })
      .catch(function (err) {
        done(err);
      })
  })

  // ==== post new country ====

  it('should post a new country', function (done) {
    // test country
    country = {
      name: 'Eora',
      abbreviation: 'EO',
      status: 1
    };
    // post request
    axios.post(uri + '/api/countries', country)
      .then(function (res) {
        if (res && res.data && res.data.name === 'Eora') {
          // clean up the posted country
          var query = { name: 'Eora' };
          cleanupAfter(Country, query, done);
        } else {
          var err = new Error('New country is not Eora');
          done(err);
        }
      })
      .catch(function (err) {
        done(err);
      })
  });



  after('AfterAll - Clean Up User:', function (done) {
    // clean up the test user
    var query = { employee_id: user.employee_id };
    cleanupAfter(User, query, done);
  });
});



// ==== using supertest ====

// describe('Clevyr Countries', function () {
//   describe('clevyr countries server controller', function () {
//     it('should read the countries', function () {

//       var server;
//       beforeEach(function () {
//         server = require('../controllers/clevyr_countries');
//       });
//       afterEach(function () {
//         server.close();
//       });

//       request(server)
//         .get(uri + '/api/countries')
//         .expect('Content-Type', /json/)
//         .expect(200, done);
//     });
//     // ClevyrCountries.readCountries(request, response)
//     //   .then(function (res) {
//     //     console.log('response', res)
//     //     assert.equal('Array', typeof res);
//     //     done();
//     //   })
//     //   .catch(function (err) {
//     //     console.log('err', err);
//     //     assert.equal(err, err);
//     //     done();
//     //   })
//     // });
//   });
// });



// ==== test with axios ====

// describe('Clevyr Countries', function () {
//   describe('clevyr countries server controller', function () {
//     it('should post a new country', function () {
//       // ClevyrCountries.readCountries()  get
//       // ClevyrCountries.create()  post
//       var country = new Country({
//         name: 'KazMaegan',
//         abbreviation: 'KM',
//         status: 1
//       })

//       // console.log('country', country)
//       axios.post(uri + '/api/countries', { body: country })
//         .then(function (res) {
//           console.log('response', res)
//           assert.equal('Array', typeof res);
//           done();
//         })
//         .catch(function (err) {
//           console.log('err')
//           // console.log('err', err);
//           throw new Error('failed');
//           assert.fail();
//           done();
//         })
//     });
//   });
// });




  // ==== Unauthenticated User test ====
  // (DEBUG ONLY: passes only if user is unauthenticated)

  // it('should be an unauthorized test user', function (done) {
  //   this.timeout(10000);

  //   request.post(uri + '/api/login')
  //     .send({ login_credential: user.employee_id, password: user.hashed_password })
  //     .end(function (err, res) {
  //       expect(err.status).to.be(401);
  //       done();
  //     });
  // });