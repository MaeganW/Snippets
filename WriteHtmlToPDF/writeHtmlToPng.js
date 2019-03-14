// need node-webshot and fs
// once png renders, can be used with pdfmake to create pdf

function renderMessage(tmpDir, msg) {
  // wrap message in a container class
  var msgHtml = '<div id="container">' + msg.body + '</div>';
  return new Promise(function (resolve, reject) {

    // create a render stream with webshot - passing html and options
    var renderStream = webshot(msgHtml, {
      siteType: 'html',
      defaultWhiteBackground: true,
      captureSelector: 'div.container',
      windowSize: {
        width: 1000
      },
      shotSize: {
        width: 'window',
        height: 'all'
      }
    });

    // create the file to be written to - in this case our tmp dir/msg.png
    var file = fs.createWriteStream('/tmp/' + tmpDir + '/msg.png', { encoding: 'binary' });

    // as html is rendering, continually write to the binary to the msg.png
    renderStream.on('data', function (data) {
      console.log('Data - binary: ', data)
      file.write(data.toString('binary'), 'binary');
    });

    // once render completes, resolve promise
    renderStream.on('end', function () {
      console.log('complete')
      resolve();
    })
  }) // end of promise
}