export default {
  _init() {
    const api = this.api,
      self = this,
      input = api.layoutElement.querySelector('input'),
      html = api.layoutElement.querySelector('.drop-target-message');

    function base64ArrayBuffer(arrayBuffer) {
      var base64 = '';
      var encodings = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';

      var bytes = new Uint8Array(arrayBuffer);
      var byteLength = bytes.byteLength;
      var byteRemainder = byteLength % 3;
      var mainLength = byteLength - byteRemainder;

      var a, b, c, d;
      var chunk;

      // Main loop deals with bytes in chunks of 3
      for (var i = 0; i < mainLength; i = i + 3) {
        // Combine the three bytes into a single integer
        chunk = (bytes[i] << 16) | (bytes[i + 1] << 8) | bytes[i + 2];

        // Use bitmasks to extract 6-bit segments from the triplet
        a = (chunk & 16515072) >> 18; // 16515072 = (2^6 - 1) << 18
        b = (chunk & 258048) >> 12; // 258048   = (2^6 - 1) << 12
        c = (chunk & 4032) >> 6; // 4032     = (2^6 - 1) << 6
        d = chunk & 63;               // 63       = 2^6 - 1

        // Convert the raw binary segments to the appropriate ASCII encoding
        base64 += encodings[a] + encodings[b] + encodings[c] + encodings[d];
      }

      // Deal with the remaining bytes and padding
      if (byteRemainder === 1) {
        chunk = bytes[mainLength];

        a = (chunk & 252) >> 2; // 252 = (2^6 - 1) << 2

        // Set the 4 least significant bits to zero
        b = (chunk & 3) << 4; // 3   = 2^2 - 1

        base64 += encodings[a] + encodings[b] + '==';
      } else if (byteRemainder === 2) {
        chunk = (bytes[mainLength] << 8) | bytes[mainLength + 1];

        a = (chunk & 64512) >> 10; // 64512 = (2^6 - 1) << 10
        b = (chunk & 1008) >> 4; // 1008  = (2^6 - 1) << 4

        // Set the 2 least significant bits to zero
        c = (chunk & 15) << 2; // 15    = 2^4 - 1

        base64 += encodings[a] + encodings[b] + encodings[c] + '=';
      }

      return base64;
    }

    this.sendFile = function (file) {
      var state = api.inputState.export();

      api.output('FileName', file.name);
      api.output('FileType', file.type);

      if (state.readAs) {
        var reader = new FileReader();
        reader.onload = evt => {
          if (state.readAs === 'binary') {
            let b64Output = base64ArrayBuffer(reader.result);
            api.output('FileData', b64Output);
            api.output('FileObject', {
              'name': file.name,
              'type': file.type,
              'data': b64Output
            });
          } else {

            api.output('FileData', reader.result);
            api.output('FileObject', {
              'name': file.name,
              'type': file.type,
              'data': reader.result
            });
          }
        };

        if (state.readAs === 'url') reader.readAsDataURL(file);
        else if (state.readAs === 'binary') reader.readAsArrayBuffer(file);
        else if (state.readAs === 'buffer') reader.readAsArrayBuffer(file);
        else reader.readAsText(file);
      }
    };
    this.updateOptions = function () {
      var state = api.inputState.export();
      html.innerHTML = state.options.html;
    };
    this.setDragging = function (isDragging) {
      if (isDragging) api.layoutElement.classList.add('file-dragging');
      else api.layoutElement.classList.remove('file-dragging');
    };

    api.layoutElement.addEventListener('dragenter', e => {
      stop(e);
      this.setDragging(true);
    });
    api.layoutElement.addEventListener('dragleave', e => {
      stop(e);
      this.setDragging(false);
    });
    api.layoutElement.addEventListener('dragover', e => {
      e.dataTransfer.dropEffect = 'copy';
      stop(e);
    });
    api.layoutElement.addEventListener('drop', e => {
      stop(e);
      this.setDragging(false);
      self.sendFile(e.dataTransfer.files[0]);
    });
    api.layoutElement.addEventListener('click', e => {
      input.click();
    });
    input.addEventListener('change', e => {
      self.sendFile(e.target.files[0]);
      input.value = null;
    });

    function stop(e) {
      e.stopPropagation();
      e.preventDefault();
    }

    this.updateOptions();
  },
  options() {
    this.updateOptions();
  }
};