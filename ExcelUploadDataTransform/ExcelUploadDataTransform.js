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
      var hasError = false;
      console.log('the event data', eventData);

      ///////////////////////////////////////////////////////////////

      function getTransformedData() {
        return eventData.map(function (event) {
          var encodedAddress = encodeURI(event.venue_address);
          console.log('venue address', encodedAddress)
          var transformedEventData = event;
          getGeocodedAddress(encodedAddress).then(function (geo) {
            console.log('geo', geo);
            transformedEventData.venue_lat = geo.results[0].geometry.location.lat;
            transformedEventData.venue_lon = geo.results[0].geometry.location.lng;
            return transformedEventData;
          }).catch(function (err) {
            console.log('error ', err);
            hasError = true;
            _this.api.output("error", err.toString());
            return event;
          });
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
