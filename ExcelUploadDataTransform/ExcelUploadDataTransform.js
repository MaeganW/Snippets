// LATEST - version with date parsing removed
export default {
  _init() {
    var _this = this;

    this.transformData = function () {
      var eventData = _this.api.inputState.export().data;
      var chivvySchema = _this.api.inputState.export().chivvySchema;
      var axios = _this.api.imports.axios;
      var hasError = false;
      getTransformedData();

      ///////////////////////////////////////////////////////////////

      function getTransformedData() {
        initiateAllPromises(eventData).then(function (res) {
          var goodData = fleshOutData(appendSourceInfo(res.goodData));
          var badData = res.badData;
          _this.api.output("hasError", hasError);
          _this.api.output("transformedData", (hasError) ? null : goodData);
          _this.api.output("goodData", res.goodData);
          _this.api.output("badData", res.badData);
        });
      }

      // initiate all of the promises
      function initiateAllPromises(arr) {
        return new Promise(function (resolve, reject) {
          var promisesArr = arr;
          var results = {};
          results.goodData = [];
          results.badData = [];

          var index = 0;
          function next() {
            if (index < promisesArr.length) {
              var currentEvent = promisesArr[index++];
              buildGeocodeGetRequest(currentEvent.venue_address).then(function (geo) {
                currentEvent.venue_lat = geo.data.results[0].geometry.location.lat;
                currentEvent.venue_lon = geo.data.results[0].geometry.location.lng;
                // capture the good data
                results.goodData.push(currentEvent);
                next();
              }).catch(function (err) {
                _this.api.output("errorMsg", err.toString());
                // capture the bad data
                results.badData.push(currentEvent);
                hasError = true;
                next();
              });
            } else {
              resolve(results);
            }
          }

          // initialize
          next();
        });
      }

      // add required source properties
      function appendSourceInfo(events) {
        return events.map(function (event) {
          event.source = 'upload';
          event.source_event_id = event.event_id;
          return event;
        });
      }

      // db expects the entire schema - this ensures that
      function fleshOutData(events) {
        return events.map(function (event) {
          chivvySchema.forEach(function (field) {
            if (!event[field]) {
              event[field] = null;
            }
          });
          return event;
        });
      }

      // build the get request
      function buildGeocodeGetRequest(address) {
        var encodedAddress = encodeURI(address);
        var url = 'https://maps.googleapis.com/maps/api/geocode/json?address=';
        var apiKey = '';
        return axios.get(`${url}${encodedAddress}&key=${apiKey}`);
      }
    };
  },
  _close() {
  },
  data() {
    this.transformData();
  }
};









// version with date parsing
export default {
  _init() {
    var _this = this;

    this.transformData = function () {
      var eventData = _this.api.inputState.export().data;
      var chivvySchema = _this.api.inputState.export().chivvySchema;
      var axios = _this.api.imports.axios;
      var hasError = false;
      getTransformedData();

      ///////////////////////////////////////////////////////////////

      function getTransformedData() {
        var fleshedOutData = fleshOutData(appendSourceInfo(parseDates(eventData)));

        initiateAllPromises(fleshedOutData).then(function (res) {
          _this.api.output("hasError", hasError);
          _this.api.output("transformedData", res);
          _this.api.output("goodData", res.goodData);
          _this.api.output("badData", res.badData);
        });
      }

      // initiate all of the promises
      function initiateAllPromises(arr) {
        return new Promise(function (resolve, reject) {
          var promisesArr = arr;
          var results = {};
          results.goodData = [];
          results.badData = [];

          var index = 0;
          function next() {
            if (index < promisesArr.length) {
              var currentEvent = promisesArr[index++];
              buildGeocodeGetRequest(currentEvent.venue_address).then(function (geo) {
                currentEvent.venue_lat = geo.data.results[0].geometry.location.lat;
                currentEvent.venue_lon = geo.data.results[0].geometry.location.lng;
                // capture the good data
                results.goodData.push(currentEvent);
                next();
              }).catch(function (err) {
                _this.api.output("errorMsg", err.toString());
                // capture the bad data
                results.badData.push(currentEvent);
                hasError = true;
                next();
              });
            } else {
              resolve(results);
            }
          }

          // initialize
          next();
        });
      }

      // add required source properties
      function appendSourceInfo(events) {
        return events.map(function (event) {
          event.source = 'upload';
          event.source_event_id = event.event_id;
          return event;
        });
      }

      // db expects the entire schema - this ensures that
      function fleshOutData(events) {
        return events.map(function (event) {
          chivvySchema.forEach(function (field) {
            if (!event[field]) {
              event[field] = null;
            }
          });
          return event;
        });
      }

      // format dates on the events
      function parseDates(events) {
        return events.map(function (event) {
          event.time_start = Date.parse(event.event_date); //relies on event date being required
          event.time_end = Date.parse(event.event_date); //relies on event date being required
          event.event_date = Date.parse(event.event_date); //relies on event date being required
          if (event.venue_start_time) {
            event.venue_start_time = Date.parse(event.venue_start_time);
          }
          if (event.venue_end_time) {
            event.venue_start_time = Date.parse(event.venue_start_time);
          }
          return event;
        });
      }

      // build the get request
      function buildGeocodeGetRequest(address) {
        var encodedAddress = encodeURI(address);
        var url = 'https://maps.googleapis.com/maps/api/geocode/json?address=';
        var apiKey = '';
        return axios.get(`${url}${encodedAddress}&key=${apiKey}`);
      }
    };
  },
  _close() {
  },
  data() {
    this.transformData();
  }
};
