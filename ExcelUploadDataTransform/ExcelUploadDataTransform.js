export default {
  _init() {
    var _this = this;

    this.transformData = function () {
      var eventData = _this.api.inputState.export().data;
      var axios = _this.api.imports.axios;
      var hasError = false;
      getTransformedData();

      ///////////////////////////////////////////////////////////////

      function getTransformedData() {
        initiateAllPromises(eventData).then(function (res) {
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
        events.map(function (event) {
          event.source = 'upload';
          event.source_event_id = event.event_id;
          return event;
        });
      }

      // format dates on the events
      // function parseDates(events) {
      //   return events.map(function (event) {
      //     event.time_start = event.
      //   });
      // }

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
