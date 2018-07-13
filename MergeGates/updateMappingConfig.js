
// After pulling in user and getting new mappings
// Currently contained in merge gate 12

(function prepareUserMappings() {
  var newMappings = newMapping.mappedHeadings;
  var userMappings = getUserMappings();
  var chivvySchema = chivvySchema;

  // if previous mappings, add new mappings to config, else return new mappings
  function getMappings() {
    if (userMappings !== null) {
      return getUpdatedMappings(userMappings, newMappings);
    }
    return formatNewMappings(newMappings);
  }

  // format new mappings name props to arrays
  function formatNewMappings(newMappings) {
    var fullMappings = getFullMappings(newMappings, chivvySchema);
    return newMappings.map(function (mapping) {
      if (mapping.name.constructor !== Array) {
        mapping.name = new Array(mapping.name);
      }
      return mapping;
    })
  }

  // combine old and new mappings
  function getUpdatedMappings(oldMappings, newMappings) {
    return oldMappings.map(function (mapping) {
      if (mapping.name.constructor !== Array) {
        mapping.name = new Array(mapping.name);
      }
      // match up the group of the new mapping to the old
      var foundMapping = newMappings.find(function (newMapping) {
        return newMapping.group === mapping.group;
      });
      // add new mapping's heading to the old ones
      if (foundMapping) {
        var alreadyExistingName = mapping.name.find(function (name) {
          return name === foundMapping.name;
        })
        // add new name to the array if no duplicates exist
        if (!alreadyExistingName) {
          mapping.name.push(foundMapping.name);
        }
        return mapping;
      }
      return mapping;
    });
  }

  // ensure that all groups are created in the mappings
  function getFullMappings(mappings, schema) {

  }

  // if previous mappings, return mapping, else return null
  function getUserMappings() {
    if (user && user[0].event_producer_mapping) {
      return parseMappings(user[0].event_producer_mapping);
    }
    return null;
  }

  // parse data from SQL to JSON format
  function parseMappings(mappings) {
    return JSON.parse(mappings.replace(/&quot;/g, '"'))
  }

  return {
    userID: user[0].id,
    mapping: JSON.stringify(getMappings())
  }
}())








// ==== old version ====

// {
// 	userID: user[0].id,
// 	mapping: JSON.stringify(newMapping.mappedHeadings) || user.event_producer_mapping
// }
