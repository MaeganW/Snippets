/// <reference path="../../../../../../typings/mocha/mocha.d.ts"/>

var assert = require('assert');
var mongoose = require('mongoose');
var RequestSchema = require('../../models/request');
var Request = mongoose.model('PCRequest');
var RequestStatuses = require('../../helpers/requestStatuses.js');



// ==== Test Cases ====

var requestBlank = {};

var requestInvalid = {
  foo: 'Foo!',
  bar: 'Bar!'
};

var requestA = {
  amountProposed: '$250'
}

var requestB = {
  amountProposed: 250,
  committeeType: null,
  electionDate: true,
  requestType: 'Super Duper'
}

var requestC = {
  amountProposed: '$250',
  committeeType: 'Amazing',
  electionDate: '2022',
  requestType: 'Super Duper'
}



// ==== Test PC Request Model ====

describe('Test PC Request Model Validation', function () {
  // Request being tested is set here - use test requests listed above
  var testRequest = requestC;

  // Fetches the schema available to the model
  var schema = [];
  Request.schema.eachPath(function (propName) {
    schema.push(Request.schema.path(propName));
  });

  // automatically pulls in required fields from schema
  var requiredFields = Request.schema.requiredPaths();

  // automatically creates an array of fields using default dates
  var defaultFieldsWithDates = [];
  schema.forEach(function (prop) {
    if (typeof prop.options.default === 'function' && typeof prop.options.default() === 'number' && new Date(prop.options.default()).getMonth()) {
      defaultFieldsWithDates.push(prop.path);
    }
  })

  // automatically creates an array of fields using simple value defaults
  var defaultFields = [];
  schema.forEach(function (prop) {
    if (prop.options.hasOwnProperty('default') && typeof prop.options.default !== 'function') {
      var obj = {
        name: prop.path,
        value: prop.options.default
      }
      defaultFields.push(obj);
    }
  });

  // Runs all of the validation tests for the required fields
  requiredFields.forEach(function (field) {
    runValidationTest(field, testRequest);
  });

  // Runs all of the test for fields with defaulted dates
  defaultFieldsWithDates.forEach(function (field) {
    runDefaultTestForDates(field, testRequest);
  });

  // Runs all of the tests for defaulted fields
  defaultFields.forEach(function (field) {
    runDefaultTest(field.name, field.value, testRequest);
  });

});



// ==== Utility Functions ====

function validationTest(err, request, field, callback) {
  if (err && err.errors[field]) {
    var err = new Error(err.errors[field].message);
    callback(err);
  } else {
    assert.notEqual(false, request[field]);
    callback();
  }
}

function runValidationTest(requiredField, testRequest) {
  it('should be valid if ' + requiredField.toUpperCase() + ' is valid', function (done) {
    var request = new Request(testRequest);
    request.validate(function (err) {
      validationTest(err, testRequest, requiredField, done);
    });
  });
}

function runDefaultTest(defaultedField, defaultValue, testRequest) {
  it('should default ' + defaultedField.toUpperCase() + ' to value ' + defaultValue, function (done) {
    var request = new Request(testRequest);

    request.validate(function (err) {
      if (err) {
        done(err);
        return;
      }
      if (testRequest.hasOwnProperty(defaultedField)) {
        var err = new Error('Request already has ' + defaultedField.toUpperCase() + ' therefore default is overwritten')
        done(err);
      } else {
        assert.equal(defaultValue, request[defaultedField]);
        done();
      }
    });
  });
}

function runDefaultTestForDates(defaultedField, testRequest) {
  it('should default ' + defaultedField.toUpperCase() + ' to a valid date', function (done) {
    var request = new Request(testRequest);

    request.validate(function (err) {
      if (err) {
        done(err);
        return;
      }
      if (testRequest.hasOwnProperty(defaultedField)) {
        var err = new Error('Request already has ' + defaultedField.toUpperCase() + ' therefore default is overwritten')
        done(err);
      } else {
        var convertedDate = new Date(request[defaultedField]);
        var constant = new Date();
        assert.equal(constant.getMonth(), convertedDate.getMonth());
        done();
      }
    });
  });
}