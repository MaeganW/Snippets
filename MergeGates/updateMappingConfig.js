
// After pulling in user and getting new mappings
// Currently contained in merge gate 12

(function prepareUserMappings() {
  var newMappings = newMapping.mappedHeadings;
  var userMappings = getUserMappings();

  // if previous mappings, add new mappings to config, else return new mappings
  function getMappings() {
    if (userMappings !== null) {
      return getUpdatedMappings(userMappings, newMappings);
    }
    return formatNewMappings(newMappings);
  }

  // format new mappings
  function formatNewMappings(newMappings) { // fails here
    return new Array(getFullMappings(newMappings, chivvySchema));
  }

  // combine old and new mappings - old mappings is an array of arrays
  function getUpdatedMappings(oldMappings, newMappings) {
    var newMappingsHeadings = newMappings.map(mapping => mapping.name);
    var configsArrayWasUpdated = false;

    var configsArray = oldMappings.map(function (oldConfig) {
      var oldConfigHeadings = oldConfig.map(item => item.name);
      var headingsAreSame = oldConfigHeadings.every(function (heading) {
        return newMappingsHeadings.includes(heading);
      });

      if (headingsAreSame) {
        configsArrayWasUpdated = true;
        return getFullMappings(newMappings, chivvySchema);
      } else {
        return oldConfig;
      }
    });

    if (!configsArrayWasUpdated) {
      configsArray.push(newMappings);
    }

    return configsArray;
  }

  // ensure that all groups are created in the mappings
  function getFullMappings(mappings, schema) {
    var fullMappings = mappings;
    // // var mappingTemplate = schema.map(function (prop) {
    // //   return {
    // //     group: prop.schemaName,
    // //     name: null
    // //   }
    // // });
    // var fullMappingsGroups = mappings.map(function (item) {
    //   return item.group;
    // });
    // // mappingTemplate.forEach(function (item) {
    // mappings.forEach(function (item) {
    //   // check if fullMappings already contains that group
    //   var foundGroup = fullMappingsGroups.includes(item.group);
    //   if (!foundGroup) {
    //     fullMappings.push(item);
    //   }
    // });
    return fullMappings;
  }

  // if previous mappings, return mapping, else return null
  function getUserMappings() {
    if (user && user[0].event_producer_mapping) {
      return parseMappings(user[0].event_producer_mapping);
    }
    return null;
  }

  // parse data from SQL to JSON format
  function parseMappings(mappingsArr) {
    return JSON.parse(mappingsArr.replace(/&quot;/g, '"'))
  }

  return {
    userID: user[0].id,
    mapping: JSON.stringify(getMappings())
  }
}())






// (function prepareUserMappings() {
//   var newMappings = newMapping.mappedHeadings;
//   var userMappings = getUserMappings();
//   var chivvySchema = chivvySchema;

//   // if previous mappings, add new mappings to config, else return new mappings
//   function getMappings() {
//     if (userMappings !== null) {
//       return getUpdatedMappings(userMappings, newMappings);
//     }
//     return formatNewMappings(newMappings);
//   }

//   // format new mappings name props to arrays
//   function formatNewMappings(newMappings) {
//     var fullMappings = getFullMappings(newMappings, chivvySchema);
//     return newMappings.map(function (mapping) {
//       if (mapping.name.constructor !== Array) {
//         mapping.name = new Array(mapping.name);
//       }
//       return mapping;
//     })
//   }

//   // combine old and new mappings
//   function getUpdatedMappings(oldMappings, newMappings) {
//     return oldMappings.map(function (mapping) {
//       if (mapping.name.constructor !== Array) {
//         mapping.name = new Array(mapping.name);
//       }
//       // match up the group of the new mapping to the old
//       var foundMapping = newMappings.find(function (newMapping) {
//         return newMapping.group === mapping.group;
//       });
//       // add new mapping's heading to the old ones
//       if (foundMapping) {
//         var alreadyExistingName = mapping.name.find(function (name) {
//           return name === foundMapping.name;
//         })
//         // add new name to the array if no duplicates exist
//         if (!alreadyExistingName) {
//           mapping.name.push(foundMapping.name);
//         }
//         return mapping;
//       }
//       return mapping;
//     });
//   }

//   // ensure that all groups are created in the mappings
//   function getFullMappings(mappings, schema) {

//   }

//   // if previous mappings, return mapping, else return null
//   function getUserMappings() {
//     if (user && user[0].event_producer_mapping) {
//       return parseMappings(user[0].event_producer_mapping);
//     }
//     return null;
//   }

//   // parse data from SQL to JSON format
//   function parseMappings(mappings) {
//     return JSON.parse(mappings.replace(/&quot;/g, '"'))
//   }

//   return {
//     userID: user[0].id,
//     mapping: JSON.stringify(getMappings())
//   }
// }())





// ==== old version ====

// {
// 	userID: user[0].id,
// 	mapping: JSON.stringify(newMapping.mappedHeadings) || user.event_producer_mapping
// }
