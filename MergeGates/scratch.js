// (function () {
//   var items = ['city', 'first_name', 'last_name'];
//   var matchGroups = function (i) {
//     var initialCharacters = i.substring(0, 2);
//     return groups.map(group => {
//       if (group.name.substring(0, 2) == initialCharacters) {
//         return group.name;
//       } else {
//         return 'City';
//       }
//     });
//     return 'Zip'
//   }
//   for (var i = 0; i < 30; i++) {
//     items.push({
//       id: i,
//       name: i,
//       group: matchGroups(i),
//     });
//   }
//   var groups = [{ name: 'First Name' },
//   { name: 'Last Name' },
//   { name: 'City' },
//   { name: 'Address' },
//   { name: 'County' },
//   { name: 'State' },
//   { name: 'Zip' },
//   { name: 'Phone 1' },
//   { name: 'Phone 2' },
//   { name: 'Email' },
//   { name: 'Web' },
//   { name: 'Company' }]
//   return {
//     items: items,
//     groups: groups
//   };
// }())


//   (function () {
//     var excelHeadingsWithGroups = excelHeadings.map(function (heading) {
//       return {
//         "name": heading.name,
//         "group": matchGroup(heading.name)
//       }
//     })
//     var matchGroup = function (excelHeading) {
//       var initialCharacters = excelHeading.substring(0, 2);
//       return chivvySchema.map(function (group) {
//         if (group.schemaName.substring(0, 2).includes(initialCharacters)) {
//           return group.schemaName;
//         } else {
//           return 'city';
//         }
//       });
//       return 'zip'
//     }
//     return {
//       "items": excelHeadingsWithGroups,
//       "groups": chivvySchema
//     };
//   }())



// if (excelHeading) {
//   var regex = new RegExp(excelHeading, 'gi');
//   // fields being queried by
//   var fieldsToSearchBy = Object.keys(requestGroups[0]);
//   var filteredRes = new Array();
//   var filteredIds = new Array();
//   requestGroups.forEach(function (res) {
//     fieldsToSearchBy.forEach(function (field) {
//       if (filteredIds.includes(res._id)) {
//         return;
//       }
//       if (res[field] && res[field] !== null && (res[field]).toString().match(regex)) {
//         filteredRes.push(res);
//         filteredIds.push(res._id);
//       }
//       return;
//     })
//   })
//   requestGroups = filteredRes;
// }



// Original
// (function () {
//   var mappedHeadings = originalData.items.map(function (heading) {
//     var getGroup = function (groupName) {
//       if (changedData.item.group.schemaName === groupName) {
//         return changedData.to.schemaName;
//       }
//       return groupName;
//     }
//     return {
//       "name": heading.name,
//       "group": getGroup(heading.group.schemaName)
//     }
//   })

//   return {
//     "mappedHeadings": mappedHeadings
//   };
// }())


////old winner
// (function () {
//   var clonedExcelData = JSON.parse(JSON.stringify(excelData));
//   var getMappedData = clonedExcelData.map(function (data) {
//     mappedHeadings.mappedHeadings.forEach(function (obj) {
//       // console.log(obj.group)
//       if (obj.group !== obj.name) {
//         console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!')
//         console.log(obj.group + ' !== ' + obj.name);
//         data[obj.group] = data[obj.name];
//         console.log('++++ added ', obj.group)
//         delete data[obj.name];
//         console.log('>>>> deleted ', obj.name)

//         // if (data[obj.name] === data[obj.group]) {
//         //   delete data[obj.name];
//         //   console.log('>>>> deleted ', obj.name)
//         // }
//       }
//     })
//     return data;
//   })
//   console.log('mapped Data ', getMappedData)
//   return getMappedData
// }())




// (function () {
//   var clonedExcelData = JSON.parse(JSON.stringify(excelData));
//   var getMappedData = clonedExcelData.map(function (data) {
//     mappedHeadings.mappedHeadings.forEach(function (obj) {
//       // console.log(obj.group)
//       if (obj.group !== obj.name) {
//         console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!')
//         console.log(obj.group + ' !== ' + obj.name);

//         if (!data[obj.group]) {
//           data[obj.group] = data[obj.name];
//           console.log('++++ added ', obj.group)
//         } else {
//           data[obj.group] = data[obj.name];
//           console.log('~~~~ edited ', obj.group)
//         }

//         if (obj.name === 'phone')

//           if (obj.name === 'county')
//             // if (data[obj.name] && data[obj.name] === data[obj.group]) {
//             delete data[obj.name];
//         console.log('>>>> deleted ', obj.name)
//         // }

//         // if (data[obj.name] === data[obj.group]) {
//         //   delete data[obj.name];
//         //   console.log('>>>> deleted ', obj.name)
//         // }
//       }
//     })
//     return data;
//   })
//   console.log('mapped Data ', getMappedData)
//   return getMappedData
// }())






// (function () {
//   var getMappedData = excelData.map(function (data) {
//     function lol(param) {
//       return new Promise(function (resolve, reject) {
//         var requiredLength = mappedHeadings.mappedHeadings.length;
//         mappedHeadings.mappedHeadings.forEach(function (obj, index) {
//           data[obj.group] = data[obj.name];
//           delete data[obj.name];
//           if (index === requiredLength - 1) {
//             resolve(data);
//           }
//         })
//       })
//     }

//     lol(data).then(function (err, res) {
//       console.log('res', res);
//       return res;
//     })

//   })
//   return {
//     "data": getMappedData
//   }
// }())


// Initial headings for Excel spreadsheet
[
  "city",
  "first_name",
  "last_name",
  "company",
  "address",
  "county",
  "state",
  "zip",
  "phone_1",
  "phone_2",
  "email",
  "web"
]


  // Original Function for matching schema & headings
  (function () {
    var excelHeadingsWithGroups = excelHeadings.map(function (heading) {
      var matchGroup = function (excelHeading) {
        var initialCharacters = excelHeading.substring(0, 3);
        return chivvySchema.find(function (group) {
          if (group.schemaName.match(initialCharacters)) {
            return group.schemaName.match(initialCharacters);
          }
          return 'city'
        });
      }

      return {
        "name": heading.name,
        "group": matchGroup(heading.name)
      }
    })

    return {
      "items": excelHeadingsWithGroups,
      "groups": chivvySchema
    };
  }())


// New Schema
[
  "source",
  "source_event_id",
  "title",
  "description",
  "event_date",
  "time_start",
  "time_end",
  "url",
  "url_logo",
  "venue_name",
  "venue_address",
  "venue_city",
  "venue_state",
  "venue_zip",
  "venue_lat",
  "venue_lon"
]


// New Schema with Validation
[
  {
    "schemaName": "venue_state",
    "required": false
  },
  {
    "schemaName": "event_date",
    "required": true
  },
  {
    "schemaName": "venue_city",
    "required": false
  },
  {
    "schemaName": "event_id",
    "required": false
  },
  {
    "schemaName": "venue_start_time",
    "required": false
  },
  {
    "schemaName": "venue_end_time",
    "required": false
  },
  {
    "schemaName": "title",
    "required": true
  },
  {
    "schemaName": "description",
    "required": true
  },
  {
    "schemaName": "venue_name",
    "required": false
  },
  {
    "schemaName": "venue_address",
    "required": true
  },
  {
    "schemaName": "venue_zip",
    "required": false
  },
  {
    "schemaName": "url_logo",
    "required": false
  },
  {
    "schemaName": "url",
    "required": true
  }
]


  // Function for matching schema & headings - version before remembered user mappings
  (function () {
    var excelHeadingsWithGroups = excelHeadings.map(function (heading) {
      var matchGroup = function (excelHeading) {
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

      return {
        "name": heading.name,
        "group": matchGroup(heading.name)
      }
    })

    return {
      "items": excelHeadingsWithGroups,
      "groups": chivvySchema
    };
  }())




  // old Gate 6
  // (function () {
  //   var dataToChange;
  //   var excelTimeStamp = timeOf('originalData');
  //   console.log('time stamp = ', excelTimeStamp);
  //   if (timeStamp === null) {
  //     timeStamp = excelTimeStamp;
  //   }
  //   if (timeStamp && timeStamp !== excelTimeStamp) {
  //     newData = null;
  //     changedData = null;
  //   }
  //   if (!newData || newData.mappedHeadings.length === 0) {
  //     dataToChange = originalData.items;
  //   } else {
  //     dataToChange = newData.mappedHeadings;
  //   }
  //   console.log('data to change = ', dataToChange);
  //   var mappedHeadings = dataToChange.map(function (heading) {
  //     var getGroup = function (groupName) {
  //       if (changedData && changedData.item.name === heading.name) {
  //         return changedData.to.schemaName;
  //       }
  //       return groupName;
  //     }
  //     return {
  //       "name": heading.name,
  //       "group": (!newData) ? getGroup(heading.group.schemaName) : getGroup(heading.group)
  //     }
  //   })

  //   console.log("mappedHeadings ", mappedHeadings)
  //   return {
  //     "mappedHeadings": mappedHeadings
  //   };
  // }())





  ///////
  // (function () {
  //   var dataToChange;
  //   var savedTimeStamp;
  //   var currentTimeStamp = timeOf('originalData');
  //   console.log('time stamp = ', currentTimeStamp);
  //   if (!newData || newData.mappedHeadings.length === 0) {
  //     dataToChange = originalData.items;
  //     savedTimeStamp = currentTimeStamp;
  //   } else {
  //     dataToChange = newData.mappedHeadings;
  //     savedTimeStamp = newData.timeStamp;
  //     console.log('once more time stamp = ', currentTimeStamp);
  //     if (currentTimeStamp === NaN) {
  //       console.log('this does not make sense');
  //     }
  //     if (newData.timeStamp && currentTimeStamp && newData.timeStamp !== currentTimeStamp) {
  //       changedData = null;
  //       newData = null;
  //       dataToChange = originalData.items;
  //       console.log('changedData and newData should be null', changedData);
  //       console.log('dataToChange should be originalData', originalData.itmes);
  //     }
  //   }
  //   var mappedHeadings = dataToChange.map(function (heading) {
  //     var getGroup = function (groupName) {
  //       if (changedData && changedData.item.name === heading.name) {
  //         return changedData.to.schemaName;
  //       }
  //       return groupName;
  //     }
  //     return {
  //       "name": heading.name,
  //       "group": (!newData) ? getGroup(heading.group.schemaName) : getGroup(heading.group)
  //     }
  //   })

  //   console.log("mappedHeadings ", mappedHeadings)
  //   return {
  //     "mappedHeadings": mappedHeadings,
  //     "timeStamp": (savedTimeStamp || newData.timeStamp) ? savedTimeStamp : null
  //   };
  // }())

  (function resetTable() {
    console.log('table cleared');
    x0 = null;
    return x0;
  }())


  // Gate 7 - CURRENT - ES6 version
  // Funciton to fire when toAdd event is activated - creates mapped headings
  (function mapHeadingsToGroups() {
    let dataToChange;
    let savedTimeStamp;
    const currentTimeStamp = timeOf('originalData');

    if (!newData || newData.mappedHeadings.length === 0) {
      dataToChange = originalData.items;
      savedTimeStamp = currentTimeStamp;
    } else {
      dataToChange = newData.mappedHeadings;
      savedTimeStamp = newData.timeStamp;
      if (currentTimeStamp === NaN) {
      }
      if (newData.timeStamp && currentTimeStamp && newData.timeStamp !== currentTimeStamp) {
        changedData = null;
        newData = null;
        dataToChange = originalData.items;
        savedTimeStamp = currentTimeStamp;
      }
    }

    const mappedHeadings = dataToChange.map(heading => {
      return {
        "name": heading.name,
        "group": (!newData || (newData && newData.timeStamp && currentTimeStamp && newData.timeStamp !== currentTimeStamp)) ? getGroup(heading.group.schemaName, heading) : getGroup(heading.group, heading)
      }
    });

    function getGroup(groupName, heading) {
      if (newData && newData.timeStamp && currentTimeStamp && newData.timeStamp !== currentTimeStamp) {
        return groupName;
      }
      if (changedData && changedData.item.name === heading.name) {
        return changedData.to.schemaName;
      }
      return groupName;
    }

    return {
      "mappedHeadings": mappedHeadings,
      "timeStamp": (savedTimeStamp || newData.timeStamp) ? savedTimeStamp : null
    };
  }())


  // ES5 Version
  (function () {
    var dataToChange;
    var savedTimeStamp;
    var currentTimeStamp = timeOf('originalData');
    if (!newData || newData.mappedHeadings.length === 0) {
      dataToChange = originalData.items;
      savedTimeStamp = currentTimeStamp;
    } else {
      dataToChange = newData.mappedHeadings;
      savedTimeStamp = newData.timeStamp;
      if (currentTimeStamp === NaN) {
      }
      if (newData.timeStamp && currentTimeStamp && newData.timeStamp !== currentTimeStamp) {
        changedData = null;
        newData = null;
        dataToChange = originalData.items;
        savedTimeStamp = currentTimeStamp;
      }
    }
    var mappedHeadings = dataToChange.map(function (heading) {
      var getGroup = function (groupName) {
        if (newData && newData.timeStamp && currentTimeStamp && newData.timeStamp !== currentTimeStamp) {
          return groupName;
        }
        if (changedData && changedData.item.name === heading.name) {
          return changedData.to.schemaName;
        }
        return groupName;
      }
      return {
        "name": heading.name,
        "group": (!newData || (newData && newData.timeStamp && currentTimeStamp && newData.timeStamp !== currentTimeStamp)) ? getGroup(heading.group.schemaName) : getGroup(heading.group)
      }
    })

    return {
      "mappedHeadings": mappedHeadings,
      "timeStamp": (savedTimeStamp || newData.timeStamp) ? savedTimeStamp : null
    };
  }())


  // Also good chicken dinner, but below doesn't overwrite props
  // (function () {
  //   var clonedExcelData = JSON.parse(JSON.stringify(excelData));
  //   var getMappedData = clonedExcelData.map(function (data) {
  //     var newObj = {};
  //     mappedHeadings.mappedHeadings.forEach(function (obj) {
  //       newObj[obj.group] = data[obj.name];
  //     })
  //     return newObj;
  //   })
  //   console.log('mapped Data ', getMappedData)
  //   return getMappedData
  // }())


  // Hmmm... problem with ...
  // (function () {
  //   var getMappedData = excelData.map(function (data) {
  //     var newObj = {};
  //     mappedHeadings.mappedHeadings.forEach(function (obj) {
  //       if (!newObj[obj.group]) {
  //         newObj[obj.group] = data[obj.name].toString();
  //       } else {
  //         newObj[obj.group] = [...newObj[obj.group], data[obj.name]];
  //       }
  //     })
  //     return newObj;
  //   })
  //   console.log('mapped Data ', getMappedData)
  //   return getMappedData
  // }())


  // winner, winner chicken dinner
  (function () {
    var getMappedData = excelData.map(function (data) {
      var newObj = {};
      mappedHeadings.mappedHeadings.forEach(function (obj) {
        if (!newObj[obj.group]) {
          newObj[obj.group] = data[obj.name];
        } else {
          if (newObj[obj.group].constructor === Array) {
            newObj[obj.group].push(data[obj.name])
          } else {
            var existingData = newObj[obj.group];
            newObj[obj.group] = [];
            newObj[obj.group].push(existingData);
            newObj[obj.group].push(data[obj.name])
          }
        }
      })
      return newObj;
    })
    console.log('mapped Data ', getMappedData)
    return getMappedData
  }())



  // winner, winner chicken dinner
  (function () {
    var getMappedData = excelData.map(function (data) {
      var newObj = {};
      mappedHeadings.mappedHeadings.forEach(function (obj) {
        if (!newObj[obj.group]) {
          newObj[obj.group] = data[obj.name];
        } else {
          if (newObj[obj.group].constructor === Array) {
            newObj[obj.group].push(data[obj.name])
          } else {
            var existingData = newObj[obj.group];
            newObj[obj.group] = [];
            newObj[obj.group].push(existingData);
            newObj[obj.group].push(data[obj.name]);
          }
        }
      })
      return newObj;
    })
    console.log('mapped Data ', getMappedData)
    return getMappedData
  }())



  // button toggle visibilty
  (function toggleButton() {
    var button = document.getElementById("map_button");
    button.style.display = "block";

    return x0;
  }())


  // show me table value
  (function () {
    var table = document.getElementById("table");
    console.log('table element', table)

    return x0;
  }())




  // new merge gate specifically to cast all incoming values into strings
  (function () {
    var cleanData = [];
    data.forEach(function (row) {
      var columnNames = Object.keys(row);
      var areAllColumnsEmpty = columnNames.every(function (column) {
        return row[column] === ""
      });
      if (areAllColumnsEmpty) {
        return;
      }
      cleanData.push(row);
    })
    return cleanData;
  }())




  // adding necessary properties to the objects in the array
  (function () {
    return data.map(function (event) {
      event.source = 'Upload';
      event.source_event_id = event.event_id;
      event.venue_lat = null;
      event.venue_lon = null;
      event.time_start = null;
      event.time_end = null;
      return event;
    })
  }())



  // converting addresses to geolocation data
  (function () {
    return data.map(function (event) {
      var encodedAddress;
      // if (event.venue_address.constructor !== Array) {
      encodedAddress = encodeURI(event.venue_address)
      // } else {
      //   encodedAddress = event.venue_address.map(function (address) {
      //     encodedAddress = encodeURI(address);
      //   })
      // }


      fetch(url + address, {
        method: 'get'
      }).then(function (geo) {
        var successLatLng = {};
        successLatLng.lat = geo.results[0].geometry.location.lat;
        successLatLng.lng = geo.results[0].geometry.location.lng;
        return successLatLng;
      }).catch(function (err) {
        var errorLatLng = {};
        errorLatLng.lat = 'N/A';
        errorLatLng.lng = 'N/A';
        return errorLatLng;
      });

      // function getGeocodedAddress(address){
      //   return new Promise(function(resolve, reject){
      //     var url = 'https://maps.googleapis.com/maps/api/geocode/json?address=';

      //   })
      // }
    })
  }())



  // extracting address
  // (function () {
  //   return data.map(function (event) {
  //     return event.venue_address;
  //   })
  // })