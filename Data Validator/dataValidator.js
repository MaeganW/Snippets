// This is a shallow check before going through ExcelUploadDataTransform and DateParser

export default {
  _init() {
    const _this = this;

    this.checkData = function () {
      const eventData = _this.api.inputState.export().data;
      let hasError = false;
      let errorMsg = null;
      checkForErrors(eventData);

      ///////////////////////////////////////////////////////////////

      function checkForErrors(eventData) {
        let validData = [];

        eventData.forEach(event => {

        })
        _this.api.output("errorMsg", hasError ? errorMsg : null);
        _this.api.output("data", (!hasError) ? eventData : null);
      }
    }
  },
  _close() {
  },
  data() {
    this.checkData();
  }
};