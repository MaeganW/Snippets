function buildRecipientsTable(lobbying_data, msgId) {
  var tableColumns = ['Employee_Id', 'Name', 'Status', 'Delivered', 'Responded', 'Msg_Id']

  for (var i = 0; i < lobbying_data.messages.length; i++) {
    if (lobbying_data.messages[i]._id == msgId) {
      var msg = lobbying_data.messages[i];
      var tableData = buildTableData(msg.recipients, msg._id);
    }
  }

  var headers = _.reduce(tableColumns, function (acc, header) {
    return acc + '<th style="border: 1px solid black; padding: 1px; background-color: #ccc;">' + header + '</th>'
  }, '');

  var body = _.reduce(tableData, function (acc, row) {
    var keys = Object.keys(row);
    var formattedRow = _.reduce(keys, function (acc2, key) {
      return acc2 += '<td style="border: 1px solid black; padding: 1px;">' + row[key] + '</td>'
    }, '');
    return acc += '<tr>' + formattedRow + '</tr>';
  }, '');

  // need to improve aesthetic
  var table = '<table style="border: 1px solid black; border-collapse: collapse; font-size: 9px; margin-top: 10px;">' +
    '<thead>' +
    '<tr>' +
    headers +
    '</tr>' +
    '</thead>' +
    '<tbody>' +
    body +
    '</tbody>' +
    '</table>';

  return table;
}