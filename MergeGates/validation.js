// extracting the required fields data
(function () {
  var requiredFields = [];
  data.forEach(function (schema) {
    if (schema.required) {
      requiredFields.push(schema.schemaName)
    }
    return;
  })
  return requiredFields
}())



  // validation - returns true or false
  (function () {
    var getValidationStatus = function () {
      return requiredFields.every(function (requiredField) {
        return mappedHeadings.mappedHeadings.find(function (heading) {
          return heading.group === requiredField
        })
      })
    }
    return !getValidationStatus();
  }())