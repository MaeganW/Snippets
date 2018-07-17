// LATEST
export default {
  _init() {
    const _this = this;

    this.transformData = function () {
      const eventData = _this.api.inputState.export().data;
      let hasError = false;
      getTransformedData();

      ///////////////////////////////////////////////////////////////

      function getTransformedData() {
        _this.api.output("loading", true);
        let parsedData = null;
        if (eventData) {
          parsedData = parseDates(eventData);
        }

        _this.api.output("hasError", hasError);
        _this.api.output("transformedData", (!hasError && parsedData) ? parsedData.goodData : null);
        _this.api.output("loading", false);
        _this.api.output("goodData", parsedData ? parsedData.goodData : null);
        _this.api.output("badData", parsedData ? parsedData.badData : null);
      }

      // format dates on the events
      function parseDates(events) {
        const timeProps = [
          'venue_end_time',
          'venue_start_time',
          'time_end',
          'time_start',
          'event_date'
        ];
        let badData = [];
        let goodData = [];

        events.forEach(event => {
          if (timeProps.some(prop => Object.is(event[prop], NaN) || typeof event[prop] !== "number")) {
            hasError = true;
            badData.push(event);
          } else {

            // this object will only contain times
            let timeObj = {};

            // ex. "7/4/2018"
            timeObj.time_start = Date.parse(event.time_start);
            timeObj.time_end = Date.parse(event.time_end);
            // returns 1530680400000

            // ex. "7/4/2018 6:00 PM"
            timeObj.venue_start_time = moment(event.venue_start_time).format();
            timeObj.venue_end_time = moment(event.venue_end_time).format();
            // returns "2018-07-04T18:00:00-05:00"

            // ex. 7/4/2018
            timeObj.event_date = moment(event.event_date).format('YYYY-MM-DD');
            // returns "2018-07-04"

            if (timeProps.some(prop => Object.is(timeObj[prop], NaN) || typeof timeObj[prop] !== "number")) {
              hasError = true;
              badData.push(event);
            } else {
              timeProps.forEach(prop => event[prop] = timeObj[prop])
              goodData.push(event);
            }
          }
        });

        return {
          goodData,
          badData
        }
      }
    };
  },
  _close() {
  },
  data() {
    this.transformData();
  }
};




// The following events have invalid dates/times. Please enter a valid date/time (ex: "7/4/2018" or "7/4/2018 6:00 PM").






// // Before cleanup

// export default {
//   _init() {
//     const _this = this;

//     this.transformData = function () {
//       const eventData = _this.api.inputState.export().data;
//       let hasError = false;
//       getTransformedData();

//       ///////////////////////////////////////////////////////////////

//       function getTransformedData() {
//         _this.api.output("loading", true);
//         let parsedData = null;
//         if (eventData) {
//           parsedData = sortData(parseDates(eventData));
//         }

//         _this.api.output("hasError", hasError);
//         _this.api.output("transformedData", (!hasError && parsedData) ? parsedData.goodData : null);
//         _this.api.output("loading", false);
//         _this.api.output("goodData", parsedData ? parsedData.goodData : null);
//         _this.api.output("badData", parsedData ? parsedData.badData : null);
//       }

//       // format dates on the events
//       function parseDates(events) {
//         let badData = [];
//         let goodData = [];
//         const timeProps = [
//           'venue_end_time',
//           'venue_start_time',
//           'time_end',
//           'time_start',
//           'event_date'
//         ];

//         events.forEach(event => {
//           if (timeProps.some(prop => Object.is(event[prop], NaN) || typeof event[prop] !== "number")) {
//             badData.push(event);
//           } else {
//             // this object will only contain times
//             let timeObj = {};

//             // ex. "7/4/2018"
//             timeObj.time_start = Date.parse(event.time_start);
//             timeObj.time_end = Date.parse(event.time_end);
//             // returns 1530680400000

//             // ex. "7/4/2018 6:00 PM"
//             timeObj.venue_start_time = moment(event.venue_start_time).format()
//             timeObj.venue_end_time = moment(event.venue_end_time).format()
//             // returns "2018-07-04T18:00:00-05:00"

//             // ex. 7/4/2018
//             timeObj.event_date = moment(event.event_date).format('YYYY-MM-DD');
//             // returns "2018-07-04"

//             if (timeProps.some(prop => Object.is(timeObj[prop], NaN) || typeof timeObj[prop] !== "number")) {
//               badData.push(event);
//             } else {
//               timeProps.forEach(prop => event[prop] = timeObj[prop])
//               goodData.push(event);
//             }
//           }
//         });
//       }

//       // returns a boolean - checks if date parsing returns valid data
//       function validateTime(prop) {
//         const parsedDate = Date.parse(prop);
//         if (typeof parsedDate !== 'number' || Object.is(parsedDate, NaN)) {
//           hasError = true;
//           return false;
//         }
//         return true;
//       }

//       // check valid dates
//       function checkValidDates(event) {
//         const timeProps = [
//           'venue_end_time',
//           'venue_start_time',
//           'time_end',
//           'time_start',
//           'event_date'
//         ];

//         if (timeProps.some(prop => Object.is(event[prop], NaN) || typeof event[prop] !== "number")) {
//           hasError = true;
//           return false;
//         } else {
//           return true;
//         };
//       }

//       // sort out the good data from the bad
//       function sortData(events) {
//         let badData = [];
//         let goodData = [];

//         events.forEach(event => {
//           const timeProps = [
//             'venue_end_time',
//             'venue_start_time',
//             'time_end',
//             'time_start',
//             'event_date'
//           ];

//           if (timeProps.some(prop => Object.is(event[prop], NaN) || typeof event[prop] !== "number")) {
//             hasError = true;
//             badData.push(event);
//           } else {
//             goodData.push(event);
//           }
//         });

//         return {
//           badData,
//           goodData
//         };
//       }
//     };
//   },
//   _close() {
//   },
//   data() {
//     this.transformData();
//   }
// };





// // {
// //   time_end: 1531883100000,
// //   time_start: 1531872300000,
// //   event_date: "2018-07-17",
// //   venue_end_time: "2018-07-18T03:05:00+00:00",
// //   venue_start_time: "2018-07-18T00:05:00+00:00",
// // }






// // For the date parsing component

// export default {
//   _init() {
//     const _this = this;

//     this.transformData = function () {
//       const eventData = _this.api.inputState.export().data;
//       let hasError = false;
//       getTransformedData();

//       ///////////////////////////////////////////////////////////////

//       function getTransformedData() {
//         _this.api.output("loading", true);
//         let parsedData = null;
//         if (eventData) {
//           parsedData = sortData(parseDates(eventData));
//         }

//         _this.api.output("hasError", hasError);
//         _this.api.output("transformedData", (!hasError && parsedData) ? parsedData.goodData : null);
//         _this.api.output("loading", false);
//         _this.api.output("goodData", parsedData ? parsedData.goodData : null);
//         _this.api.output("badData", parsedData ? parsedData.badData : null);
//       }

//       // format dates on the events
//       function parseDates(events) {
//         return events.map(event => {
//           event.time_start = Date.parse(event.event_date); //relies on event date being required
//           event.time_end = Date.parse(event.event_date); //relies on event date being required
//           event.event_date = Date.parse(event.event_date); //relies on event date being required

//           if (event.venue_start_time) {
//             event.venue_start_time = Date.parse(event.venue_start_time);
//           } else {
//             event.venue_start_time = Date.parse(event.event_date);
//           }

//           if (event.venue_end_time) {
//             event.venue_end_time = Date.parse(event.venue_end_time);
//           } else {
//             event.venue_end_time = Date.parse(event.event_date);
//           }

//           return event;
//         });
//       }

//       // sort out the good data from the bad
//       function sortData(events) {
//         let badData = [];
//         let goodData = [];

//         events.forEach(event => {
//           const timeProps = [
//             'venue_end_time',
//             'venue_start_time',
//             'time_end',
//             'time_start',
//             'event_date'
//           ];

//           if (timeProps.some(prop => Object.is(event[prop], NaN) || typeof event[prop] !== "number")) {
//             hasError = true;
//             badData.push(event);
//           } else {
//             goodData.push(event);
//           }
//         });

//         return {
//           badData,
//           goodData
//         };
//       }
//     };
//   },
//   _close() {
//   },
//   data() {
//     this.transformData();
//   }
// };