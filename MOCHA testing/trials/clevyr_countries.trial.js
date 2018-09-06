var assert = require('assert'),
  expect = require('expect.js'),
  path = ('path'),
  mongoose = require('mongoose'),
  CountrySchema = require('../models/countries.js'),
  Country = mongoose.model('countries'),
  UserSchema = require('../../../../core/users/server/models/user.js'),
  User = mongoose.model('User'),
  ClevyrCountries = require('../controllers/clevyr_countries');

// var user;
// var country;

// describe('Countries Model', function () {
//   describe('Model Country:', function () {
//     beforeEach(function (done) {
//       this.timeout(10000);
//       user = new User({

//       });
//       user.save(function () {
//         country = new Country({
//           name: 'Country Test Name',
//           abbreviation: 'CTN',
//           active: true
//         });
//         done();
//       });
//     });

//     describe('Method Save', function () {
//       it('should be able to save without problems', function (done) {
//         return country.save(function (err, data) {
//           expect(err).to.be(null);
//           expect(data.name).to.equal('Country Test Name');
//           expect(data.abbreviation).to.equal('CTN');
//           expect(data.active).to.equal(true);
//           done();
//         });
//       });
//       it('should be able to show an error when try to save without name', function (done) {
//         this.timeout(10000);
//         country.name = '';
//         return country.save(function (err) {
//           expect(err).to.not.be(undefined);
//           done();
//         });
//       });
//       it('should be able to show an error when try to save without abbreviation', function (done) {
//         this.timeout(10000);
//         country.abbreviation = '';
//         return country.save(function (err) {
//           expect(err).to.not.be(undefined);
//           done();
//         });
//       });
//       it('should be able to show an error when try to save without active', function (done) {
//         this.timeout(10000);
//         country.active = '';
//         return country.save(function (err) {
//           expect(err).to.not.be(undefined);
//           done();
//         });
//       });
//     });
//     describe('Method Update', function () {
//       it('should be able to update without problem', function (done) {
//         this.timeout(10000);

//         country.name = 'New Country Name';
//         country.abbreviation = 'NCN';
//         country.active = false;

//         return country.save(function (err, data) {
//           expect(err).to.be(null);
//           expect(data.name).to.equal('New Country Name');
//           expect(data.abbreviation).to.equal('NCN');
//           expect(data.active).to.equal(false);
//           done();
//         });
//       });
//     });
//     afterEach(function (done) {
//       this.timeout(10000);
//       country.remove(function () {
//         user.remove(done);
//       });
//     });
//   });
// });

// describe('Countries Model', function () {
//   it('should be invalid if name is empty', function (done) {
//     var country = new Country({ name: 'Canada' });
//     console.log('country', country)

//     country.save(function (error) {
//       assert.equal(error.errors['name'].message,
//         'Path `name` is required.');

//       error = cat.validateSync();
//       assert.equal(error.errors['name'].message,
//         'Path `name` is required.');
//     });
//   });
// });

// describe('Countries Model', function () {
//   it('should be invalid if name is empty', function (done) {
//     var country = new Country({ name: 'Canada' });
//     console.log('country', country)

//     country.validate(function (err) {
//       expect(err.errors.hello).to.exist;
//       done();
//     });
//   });
// });

// describe('Clevyr Countries', function () {
//   describe('clevyr countries server controller', function () {
//     it('should read the countries', function () {
//       var tmp;
//       ClevyrCountries.readCountries().then(function (success) {
//         tmp = success;
//       })
//       assert.equal('Array', typeof tmp);
//     });
//   });
// });

// describe('Math', function () {
//   describe('multiply', function () {
//     it('should equal 9 when multiplying 3*3', function () {
//       assert.equal(9, 3 * 3);
//     })
//   })
//   describe('subtract and multiply', function () {
//     it('should subtract and then multiply', function () {
//       assert.equal(-8, (3 - 4) * 8);
//     })
//   })
// });



  // ==== login user ====

  // it('should login test user', function (done) {
  //   console.log('5 - test user: ', user)
  //   this.timeout(10000);

  //   request.post(uri + '/api/login')
  //     .send({ login_credential: user.employee_id, password: user.hashed_password })
  //     .end(function (err, res) {
  //       expect(err).to.be(null);
  //       expect(res.status).to.equal(status.OK);
  //       done();
  //     });
  // });
