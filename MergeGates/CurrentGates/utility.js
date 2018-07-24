(function resetTable() {
  x0 = null;
  return x0;
}())



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





  // map excel data based on user headings to schema mappings
  (function mapDataToSchema() {
    return getMappedData();

    ////////////////////////////////

    function getMappedData() {
      return excelData.map(data => {
        let newObj = {};
        mappedHeadings.mappedHeadings.forEach(function (obj) {
          if (!newObj[obj.group]) {
            newObj[obj.group] = data[obj.name];
          } else {
            if (newObj[obj.group].constructor === Array) {
              newObj[obj.group].push(data[obj.name])
            } else {
              let existingData = newObj[obj.group];
              newObj[obj.group] = [];
              newObj[obj.group].push([existingData]);
              newObj[obj.group].push([data[obj.name]]);
            }
          }
        });
        return newObj;
      });
    }

  }())