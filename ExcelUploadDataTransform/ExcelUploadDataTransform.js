export default {
  data() {
    var eventData = this.api.inputState.get('data');
    var hasError = false;
    var Axios = this.api.imports.Axios;
    console.log('the event data', eventData);

    ///////////////////////////////////////////////////////////////

    function getTransformedData() {
      return eventData.map(function (event) {
        var encodedAddress = encodeURI(event.venue_address);
        var transformedEventData = event;
        getGeocodedAddress(encodedAddress).then(function (geo) {
          transformedEventData.venue_lat = geo.results[0].geometry.location.lat;
          transformedEventData.venue_lon = geo.results[0].geometry.location.lng;
          return transformedEventData;
        }).catch(function (err) {
          hasError = true;
          this.api.output("error", err);
          return event;
        });
      });
    }

    function getGeocodedAddress(address) {
      var url = 'https://maps.googleapis.com/maps/api/geocode/json?address=';
      return Axios(url + address);
    }

    this.api.output("transformedData", getTransformedData());
    this.api.output("success", !hasError);
  }
};





export default {
  _init() {
    var _this = this;

    this.transformData = function () {

    }
  },
  _close() {
  },
  data() {
    var eventData = this.api.inputState.get('data');
    var hasError = false;
    console.log('the event data', eventData.val);

    ///////////////////////////////////////////////////////////////

    function getTransformedData() {
      return eventData.val.map(function (event) {
        var encodedAddress = encodeURI(event.venue_address);
        var transformedEventData = event;
        getGeocodedAddress(encodedAddress).then(function (geo) {
          transformedEventData.venue_lat = geo.results[0].geometry.location.lat;
          transformedEventData.venue_lon = geo.results[0].geometry.location.lng;
          return transformedEventData;
        }).catch(function (err) {
          hasError = true;
          _this.api.output("error", err);
          return event;
        });
      });
    }

    function getGeocodedAddress(address) {
      var url = 'https://maps.googleapis.com/maps/api/geocode/json?address=';
      return fetch(url + address, {
        method: 'get'
      });
    }

    _this.api.output("transformedData", getTransformedData());
    _this.api.output("success", !hasError);
  }
};







export default {
  _init() {
    var _this = this;

    this.transformData = function () {
      var eventData = _this.api.inputState.export().data;
      var axios = _this.api.imports.axios;
      var hasError = false;
      console.log('the event data', eventData);

      ///////////////////////////////////////////////////////////////

      function getTransformedData() {
        var goodData = [];
        var badData = [];

        eventData.forEach(function (event) {
          var encodedAddress = encodeURI(event.venue_address);
          var transformedEventData = event;

          getGeocodedAddress(encodedAddress).then(function (geo) {
            console.log('geo', geo);
            transformedEventData.venue_lat = geo.results[0].geometry.location.lat;
            transformedEventData.venue_lon = geo.results[0].geometry.location.lng;
            goodData.push(transformedEventData);
          }).catch(function (err) {
            console.log('error ', err);
            hasError = true;
            badData.push(event);
            _this.api.output("error", err.toString());
          });

        });
      }

      function getGeocodedAddress(address) {
        var url = 'https://maps.googleapis.com/maps/api/geocode/json?address=';
        var apiKey = '';
        return axios.get(`${url}${address}&key=${apiKey}`);
      }

      _this.api.output("transformedData", getTransformedData());
      _this.api.output("success", !hasError);
    };
  },
  _close() {
  },
  data() {
    this.transformData();
  }
};







export default {
  _init() {
    var _this = this;

    this.transformData = function () {
      var eventData = _this.api.inputState.export().data;
      var hasError = false;
      console.log('the event data', eventData);

      ///////////////////////////////////////////////////////////////

      function getTransformedData() {
        var goodData = [];
        var badData = [];
        var length = eventData.length;
        var tracker = 0;

        eventData.forEach(function (event) {
          var encodedAddress = encodeURI(event.venue_address);
          var transformedEventData = event;

          getGeocodedAddress(encodedAddress).then(function (geo) {
            console.log('geo', geo);
            transformedEventData.venue_lat = geo.results[0].geometry.location.lat;
            transformedEventData.venue_lon = geo.results[0].geometry.location.lng;
            goodData.push(transformedEventData);
            tracker++;
          }).catch(function (err) {
            console.log('error ', err);
            hasError = true;
            badData.push(event);
            tracker++;
            _this.api.output("error", err.toString());
          });

          setInterval(function check() {

          })
        });
      }

      function getGeocodedAddress(address) {
        var url = 'https://maps.googleapis.com/maps/api/geocode/json?address=';
        var apiKey = '';
        return fetch(`${url}${address}&key=${apiKey}`, {
          method: 'get'
        });
      }

      _this.api.output("transformedData", getTransformedData());
      _this.api.output("success", !hasError);
    };
  },
  _close() {
  },
  data() {
    this.transformData();
  }
};





// (function(){
//   function getGeocodedAddress(address) {
//     var url = 'https://maps.googleapis.com/maps/api/geocode/json?address=';
//     return fetch(url + address, {
//       method: 'get'
//     });
//   }

//   getGeocodedAddress(encodedAddress).then(function (geo) {
//     transformedEventData.venue_lat = geo.results[0].geometry.location.lat;
//     transformedEventData.venue_lon = geo.results[0].geometry.location.lng;
//     return transformedEventData;
//   }).catch(function (err) {
//     hasError = true;
//     this.api.output("error", err);
//     return event;
//   });
// }())









// eventData.forEach(function (event) {
//   var encodedAddress = encodeURI(event.venue_address);
//   var transformedEventData = event;

//   getGeocodedAddress(encodedAddress).then(function (geo) {
//     console.log('geo', geo);
//     transformedEventData.venue_lat = geo.results[0].geometry.location.lat;
//     transformedEventData.venue_lon = geo.results[0].geometry.location.lng;
//     goodData.push(transformedEventData);
//   }).catch(function (err) {
//     console.log('error ', err);
//     hasError = true;
//     badData.push(event);
//     _this.api.output("error", err.toString());
//   });

// });









export default {
  _init() {
    var _this = this;

    this.transformData = function () {
      var eventData = _this.api.inputState.export().data;
      var axios = _this.api.imports.axios;
      var hasError = false;
      console.log('the event data', eventData);

      ///////////////////////////////////////////////////////////////

      function getTransformedData() {
        var goodData = [];
        var badData = [];
        var eventsArrayWithPromises = eventData.map(function (event) {
          event.promise = buildGeocodeGetRequest(event.venue_address)
          return event;
        })
        var chunkedPromises = chunkArray(eventsArrayWithPromises, 10);
        var fullDataCount = eventData.length;  // events count
        var fullChunkCount = chunkedPromises.length;  // event clusters count

        initiateAllPromises(chunkedPromises);
      }

      // initiate all of the promise batches
      function initiateAllPromises(promisesArr) {
        console.log('How many promise clusters?', arr.length);

        return promisesArr.reduce(function (p, item) {
          return p.then(function (results) {
            return getInfoForEveryInnerArgument(item).then(function (data) {
              results.push(data);
              return results;
            })
          });
        }, Promise.resolve([]));

      }

      // run all of the inner promises
      function getInfoForEveryInnerArgument(InnerArray) {
        const CPTPromises = _.map(InnerArray, (argument) => argument.promise);
        return Promise.all(CPTPromises)
          .then((results) => {
            return doSomethingWithResults(results);
          });
      }

      // chunk the events array
      function chunkArray(myArray, chunk_size) {
        var results = [];
        while (myArray.length) {
          results.push(myArray.splice(0, chunk_size));
        }
        return results;
      }

      // build the get request
      function buildGeocodeGetRequest(address) {
        var encodedAddress = encodeURI(address);
        var url = 'https://maps.googleapis.com/maps/api/geocode/json?address=';
        var apiKey = '';
        return axios.get(`${url}${encodedAddress}&key=${apiKey}`);
      }

      _this.api.output("transformedData", getTransformedData());
      _this.api.output("success", !hasError);
    };
  },
  _close() {
  },
  data() {
    this.transformData();
  }
};











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
        })
      }

      // format dates on the events
      // function parseDates(events){
      //   return events.map(function(event){
      //     return Date.parse(event.)
      //   })
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
