(function parseToJSON() {
  var userConfigs = (data[0].event_producer_mapping) ? data[0].event_producer_mapping : null;
  if (userConfigs && userConfigs !== "" && userConfigs !== null) {
    return JSON.parse(data[0].event_producer_mapping.replace(/&quot;/g, '"'))
  }
  return null;
}())
