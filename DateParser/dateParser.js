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
        const parsedData = sortData(parseDates(eventData));

        _this.api.output("hasError", hasError);
        _this.api.output("transformedData", (hasError) ? null : parsedData.goodData);
        _this.api.output("goodData", parsedData.goodData);
        _this.api.output("badData", parsedData.badData);
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

          if (timeProps.some(prop => Object.isNan(event[prop]) || typeof event[prop] !== "number")) {
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