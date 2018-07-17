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
          parsedData = sortData(parseDates(eventData));
        }

        _this.api.output("hasError", hasError);
        _this.api.output("transformedData", (!hasError && parsedData) ? parsedData.goodData : null);
        _this.api.output("loading", false);
        _this.api.output("goodData", parsedData ? parsedData.goodData : null);
        _this.api.output("badData", parsedData ? parsedData.badData : null);
      }

      // format dates on the events
      function parseDates(events) {
        let badData = [];
        let goodData = [];
        let badDataUnedited = [];

        events.forEach(event => {
          if (!checkValidDates(event)) {
            return badData.push(event);
          }

          event.time_start = Date.parse(event.event_date); //relies on event date being required
          event.time_end = Date.parse(event.event_date); //relies on event date being required
          event.event_date = Date.parse(event.event_date); //relies on event date being required

          if (event.venue_start_time && validateTime(event.venue_start_time)) {
            event.venue_start_time = Date.parse(event.venue_start_time);
          } else {
            event.venue_start_time = Date.parse(event.event_date);
          }

          if (event.venue_end_time && validateTime(event.venue_end_time)) {
            event.venue_end_time = Date.parse(event.venue_end_time);
          } else {
            event.venue_end_time = Date.parse(event.event_date);
          }

          return goodData.push(event);
        });
      }

      // returns a boolean - checks if date parsing returns valid data
      function validateTime(prop) {
        const parsedDate = Date.parse(prop);
        if (typeof parsedDate !== 'number' || Object.is(parsedDate, NaN)) {
          hasError = true;
          return false;
        }
        return true;
      }

      // check valid dates
      function checkValidDates(event) {
        const timeProps = [
          'venue_end_time',
          'venue_start_time',
          'time_end',
          'time_start',
          'event_date'
        ];

        if (timeProps.some(prop => Object.is(event[prop], NaN) || typeof event[prop] !== "number")) {
          hasError = true;
          return false;
        } else {
          return true;
        };
      }

      // sort out the good data from the bad
      function sortData(events) {
        let badData = [];
        let goodData = [];

        events.forEach(event => {
          const timeProps = [
            'venue_end_time',
            'venue_start_time',
            'time_end',
            'time_start',
            'event_date'
          ];

          if (timeProps.some(prop => Object.is(event[prop], NaN) || typeof event[prop] !== "number")) {
            hasError = true;
            badData.push(event);
          } else {
            goodData.push(event);
          }
        });

        return {
          badData,
          goodData
        };
      }
    };
  },
  _close() {
  },
  data() {
    this.transformData();
  }
};








// For the date parsing component

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
          parsedData = sortData(parseDates(eventData));
        }

        _this.api.output("hasError", hasError);
        _this.api.output("transformedData", (!hasError && parsedData) ? parsedData.goodData : null);
        _this.api.output("loading", false);
        _this.api.output("goodData", parsedData ? parsedData.goodData : null);
        _this.api.output("badData", parsedData ? parsedData.badData : null);
      }

      // format dates on the events
      function parseDates(events) {
        return events.map(event => {
          event.time_start = Date.parse(event.event_date); //relies on event date being required
          event.time_end = Date.parse(event.event_date); //relies on event date being required
          event.event_date = Date.parse(event.event_date); //relies on event date being required

          if (event.venue_start_time) {
            event.venue_start_time = Date.parse(event.venue_start_time);
          } else {
            event.venue_start_time = Date.parse(event.event_date);
          }

          if (event.venue_end_time) {
            event.venue_end_time = Date.parse(event.venue_end_time);
          } else {
            event.venue_end_time = Date.parse(event.event_date);
          }

          return event;
        });
      }

      // sort out the good data from the bad
      function sortData(events) {
        let badData = [];
        let goodData = [];

        events.forEach(event => {
          const timeProps = [
            'venue_end_time',
            'venue_start_time',
            'time_end',
            'time_start',
            'event_date'
          ];

          if (timeProps.some(prop => Object.is(event[prop], NaN) || typeof event[prop] !== "number")) {
            hasError = true;
            badData.push(event);
          } else {
            goodData.push(event);
          }
        });

        return {
          badData,
          goodData
        };
      }
    };
  },
  _close() {
  },
  data() {
    this.transformData();
  }
};