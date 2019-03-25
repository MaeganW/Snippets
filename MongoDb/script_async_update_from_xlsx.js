#!/usr/bin/env node

'use strict';

var _ = require('lodash');
var XLSX = require('xlsx');
var async = require('async');
var mongo = require('mongodb');
var ObjectId = require('mongodb').ObjectID;
var mongoClient = mongo.MongoClient;
var db;
var moment = require('moment');

var Config = require('../config.js');
var url = Config.db;

mongoClient.connect(url, function (err, database) {
  if (err) {
    console.error('Mongo ecountered errors while trying to connect....');
    console.error(err);
    return;
  }

  console.log('Mongo successfully connected to [' + database.databaseName + '] database.');

  // database info
  db = database;
  var RequestGroups = db.collection('pcrequestgroups');
  var PCDisbursements = db.collection('pcrequestdisbursmentactions');

  // spreadsheet info
  var workbook = XLSX.readFile('fix_scripts/spreadsheets/HistoricalImport_for_state_groups_March_2019.xlsx');
  var wbData = XLSX.utils.sheet_to_json(workbook.Sheets[workbook.SheetNames[0]]);

  // misc variables
  var now = moment().toDate();

  async.eachSeries(
    wbData,
    function (row, rowCallback) {
      var expenditureId = row['Expenditure ID'];
      var disbursementId = row['Disbursement ID'];
      var pacName = row['PAC'];

      // console.log('========================================')
      if (disbursementId && pacName) {
        // request has disbursment id

        var query = {
          '_id': ObjectId(disbursementId),
        };

        getRequestId(query)
          .then(function (requestId) {
            updateStateGroupInfo(requestId, pacName)
              .then(function () {
                return rowCallback();
              })
              .catch(function (err) {
                return rowCallback();
              })
          })
          .catch(function (err) {
            return rowCallback();
          });

      } else if (expenditureId && pacName) {
        // request has expenditure id

        var query = {
          'compliance': {
            $elemMatch: {
              'expenditureId': expenditureId
            }
          }
        };

        getRequestId(query)
          .then(function (requestId) {
            updateStateGroupInfo(requestId, pacName)
              .then(function () {
                return rowCallback();
              })
              .catch(function (err) {
                return rowCallback();
              })
          })
          .catch(function (err) {
            return rowCallback();
          });

      } else {
        // request has neither an expenditure id nor a disbursement id
        return rowCallback();
      }
    },
    function (err) {
      if (err) {
        console.log('An error occured in updating request groups: ', err);
      }
      process.exit();
    }
  );

  // ==== mongo queries ====
  function updateStateGroupInfo(requestId, pacName) {
    return new Promise(function (resolve, reject) {
      var stateGroup = null;
      var id = ObjectId(requestId);

      if (pacName == 'CORP' || pacName == 'B-CORP' || pacName == 'CORP-C') {
        stateGroup = 'KII';
      } else if (pacName == 'FEDCHECKING') {
        stateGroup = 'PAC';
      }

      RequestGroups.update({
        requests: id
      }, {
          $set: {
            stateGroup: stateGroup,
            updatedAt: now
          }
        }, function (err, request) {
          console.log('==== query and update state group ====');

          if (err) {
            console.log('Error updating state group for request id: ', id)
            console.log('Error msg: ', err)
            return reject(err);
          }
          console.log('request group update success:', request)
          return resolve();
        });
    })
  }

  function getRequestId(query) {
    return new Promise(function (resolve, reject) {
      PCDisbursements.findOne(query, function (err, disbursal) {
        console.log('==== query request id ====');

        if (err || !disbursal) {
          console.log('Error occured fetching request id: ', disbursal)
          console.log('Errored Disbursal: ', query);
          return reject(err);
        } else {
          return resolve(disbursal.request);
        }
      })
    })
  }

});

