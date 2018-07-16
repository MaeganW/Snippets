
// ===== Function for matching schema & headings - version with remembered user mappings =====

// Version after making saved mappings into an array of configs

(function initialMapping() {
  // map the excel headings with the correct groups
  function getExcelHeadingsWithGroups(headings) {
    var matchingConfig = null;
    if (userMappings) {
      matchingConfig = getMatchingConfig(userMappings, headings);
      console.log('SCOPE WHY', matchingConfig)
    }

    console.log('SPARTA!!!! ', matchingConfig);
    console.log('SPARTA wat? ', !matchingConfig);

    return headings.map(function (heading) {
      return {
        "name": heading.name,
        "group": (matchingConfig) ? matchOldGroup(heading.name, matchingConfig) : matchNewGroup(heading.name)
      }
    });
  }

  // check if a mapping config from the user matches the current spreadsheet
  function getMatchingConfig(userMappings, headings) {
    var headingNames = headings.map(item => item.name);

    return userMappings.find(function (config) {
      var configNames = config.map(item => item.name);
      var isMatching = configNames.every(item => headingNames.includes(item));

      console.log('is matching ', isMatching)

      if (isMatching) {
        console.log('this is the right config ', config)
        return config;
      }
    });
  }

  // if no previous mappings, create new
  function matchNewGroup(excelHeading) {
    console.log('OKC won')
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
  function matchOldGroup(excelHeading, oldMappings) {
    console.log('ATHENS WON');
    console.log('old mappings ', oldMappings);
    console.log('excel heading ', excelHeading.toString())
    var foundGroup = oldMappings.find(function (mapping) {
      return mapping.name == excelHeading.toString();
    });
    console.log('LOOK HERE ', foundGroup)
    return {
      schemaName: foundGroup.group,
      required: getRequiredStatus(foundGroup.group)
    };
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









  // Version after making mapping.name an array

  // (function initialMapping() {
  //   // map the excel headings with the correct groups
  //   function getExcelHeadingsWithGroups(headings) {
  //     return headings.map(function (heading) {
  //       return {
  //         "name": heading.name,
  //         "group": applyCorrectGroup(heading.name)
  //       }
  //     })
  //   }

  //   // check if user has previous mappings before proceeding
  //   function applyCorrectGroup(excelHeading) {
  //     if (userMappings && userMappings.length !== 0 && userMappings !== null) {
  //       return matchOldGroup(excelHeading, userMappings)
  //     } else {
  //       return matchNewGroup(excelHeading);
  //     }
  //   }

  //   // if no previous mappings, create new
  //   function matchNewGroup(excelHeading) {
  //     var initialCharacters = excelHeading.substring(0, 7);
  //     var foundGroup = chivvySchema.find(function (group) {
  //       return group.schemaName.match(initialCharacters);
  //     });
  //     if (foundGroup && foundGroup !== null) {
  //       return foundGroup;
  //     } else {
  //       return {
  //         schemaName: 'title',
  //         required: true
  //       };
  //     }
  //   }

  //   // if previous mappings, apply old
  //   function matchOldGroup(excelHeading, oldMappings) {
  //     var foundGroup = oldMappings.find(function (mapping) {
  //       return mapping.name.includes(excelHeading);
  //     });
  //     if (foundGroup && foundGroup !== null) {
  //       return {
  //         schemaName: foundGroup.group,
  //         required: getRequiredStatus(foundGroup.group)
  //       };
  //     } else {
  //       return {
  //         schemaName: 'title',
  //         required: true
  //       };
  //     }
  //   }

  //   // get the required status from the schema
  //   function getRequiredStatus(group) {
  //     var foundSchema = chivvySchema.find(function (schema) {
  //       return schema.schemaName === group;
  //     });
  //     return foundSchema.required;
  //   }

  //   return {
  //     "items": getExcelHeadingsWithGroups(excelHeadings),
  //     "groups": chivvySchema
  //   };
  // }())









  // Version before making mapping.name an array

  // (function () {
  //   // map the excel headings with the correct groups
  //   function getExcelHeadingsWithGroups(headings) {
  //     return headings.map(function (heading) {
  //       return {
  //         "name": heading.name,
  //         "group": applyCorrectGroup(heading.name)
  //       }
  //     })
  //   }

  //   // check if user has previous mappings before proceeding
  //   function applyCorrectGroup(excelHeading) {
  //     if (userMappings && userMappings.length !== 0 && userMappings !== null) {
  //       return matchOldGroup(excelHeading, userMappings)
  //     } else {
  //       return matchNewGroup(excelHeading);
  //     }
  //   }

  //   // if no previous mappings, create new
  //   function matchNewGroup(excelHeading) {
  //     var initialCharacters = excelHeading.substring(0, 7);
  //     var foundGroup = chivvySchema.find(function (group) {
  //       return group.schemaName.match(initialCharacters);
  //     });
  //     if (foundGroup && foundGroup !== null) {
  //       return foundGroup;
  //     } else {
  //       return {
  //         schemaName: 'title',
  //         required: true
  //       };
  //     }
  //   }

  //   // if previous mappings, apply old
  //   function matchOldGroup(excelHeading, mappings) {
  //     var foundGroup = mappings.find(function (d) {
  //       return d.name === excelHeading;
  //     });
  //     if (foundGroup && foundGroup !== null) {
  //       return {
  //         schemaName: foundGroup.group,
  //         required: getRequiredStatus(foundGroup.group)
  //       };
  //     } else {
  //       return {
  //         schemaName: 'title',
  //         required: true
  //       };
  //     }
  //   }

  //   // get the required status from the schema
  //   function getRequiredStatus(group) {
  //     var foundSchema = chivvySchema.find(function (schema) {
  //       return schema.schemaName === group;
  //     });
  //     return foundSchema.required;
  //   }

  //   return {
  //     "items": getExcelHeadingsWithGroups(excelHeadings),
  //     "groups": chivvySchema
  //   };
  // }())