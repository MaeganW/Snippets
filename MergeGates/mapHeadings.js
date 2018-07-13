
// Function for matching schema & headings - version with remembered user mappings

(function () {
  // map the excel headings with the correct groups
  function getExcelHeadingsWithGroups(headings) {
    return headings.map(function (heading) {
      return {
        "name": heading.name,
        "group": applyCorrectGroup(heading.name)
      }
    })
  }

  // check if user has previous mappings before proceeding
  function applyCorrectGroup(excelHeading) {
    if (userMappings && userMappings.length !== 0 && userMappings !== null) {
      return matchOldGroup(excelHeading, userMappings)
    } else {
      return matchNewGroup(excelHeading);
    }
  }

  // if no previous mappings, create new
  function matchNewGroup(excelHeading) {
    var initialCharacters = excelHeading.substring(0, 7);
    var foundGroup = chivvySchema.find(function (group) {
      return group.schemaName.match(initialCharacters);
    });
    if (foundGroup && foundGroup !== null) {
      return foundGroup;
    } else {
      return {
        schemaName: 'title',
        required: true
      };
    }
  }

  // if previous mappings, apply old
  function matchOldGroup(excelHeading, mappings) {
    var foundGroup = mappings.find(function (d) {
      return d.name === excelHeading;
    });
    if (foundGroup && foundGroup !== null) {
      return {
        schemaName: foundGroup.group,
        required: getRequiredStatus(foundGroup.group)
      };
    } else {
      return {
        schemaName: 'title',
        required: true
      };
    }
  }

  // get the required status from the schema
  function getRequiredStatus(group) {
    var foundSchema = chivvySchema.find(function (schema) {
      return schema.schemaName === group;
    });
    return foundSchema.required;
  }

  return {
    "items": getExcelHeadingsWithGroups(excelHeadings),
    "groups": chivvySchema
  };
}())