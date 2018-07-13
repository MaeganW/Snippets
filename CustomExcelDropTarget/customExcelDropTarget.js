export default {
  _init() {
    const state = this.api.inputState.export();
    const options = state.options;
    const html = { html: options.html };
    const parserOptions = options.join;

    function createBeginLoadingGate() {
      return {
        inputs: ['x0'],
        output: 'out',
        asValue: false,
        expression: `true`,
        condition: `true`
      };
    }

    function createLoadingCompleteGate() {
      return {
        inputs: ['x0'],
        output: 'out',
        asValue: false,
        expression: `false`,
        condition: `true`
      };
    }

    function checkFileType() {
      return {
        inputs: ['fileType'],
        output: 'out',
        asValue: false,
        expression: `true`,
        condition: `fileType.slice(0,15) !== "application/vnd"`
      };
    }

    this.api.dataflow
      .addComponent('FileDropTarget', JSON.stringify({
        uuid: 'a1e1b8b0-247f-11e6-aa9b-23ffb7ae8f3e',
        version: '1.0.8'
      }))
      .addComponent('ExcelDuffleParser', JSON.stringify({
        uuid: '61bb0710-207c-11e7-b572-8114193a6ff4',
        version: '0.2.2'
      }))
      .gate.addMerge('beginLoading', createBeginLoadingGate())
      .gate.addMerge('loadingComplete', createLoadingCompleteGate())
      .gate.addMerge('fileTypeChecker', checkFileType())
      .sendInEvent('FileDropTarget', 'readAs', 'binary')
      .sendInEvent('FileDropTarget', 'options', html)
      .sendInEvent('ExcelDuffleParser', 'options', parserOptions)
      .addConnection('FileDropTarget', 'FileData', 'ExcelDuffleParser', 'data')
      .addConnection('FileDropTarget', 'FileData', 'beginLoading', 'x0')
      .addConnection('ExcelDuffleParser', 'data', 'loadingComplete', 'x0')
      .addConnection('FileDropTarget', 'FileType', 'fileTypeChecker', 'fileType')
      .addChildToParentConnection('beginLoading', 'out', 'loading')
      .addChildToParentConnection('loadingComplete', 'out', 'loading')
      .addChildToParentConnection('ExcelDuffleParser', 'data', 'data')
      .addChildToParentConnection('fileTypeChecker', 'out', 'fileTypeError');
  },
  _close() {
    //Closing actions go here
  },
  //This function is named based on the name of the input
  options() {
    const state = this.api.inputState.export();
    const options = state.options;
    const html = { html: options.html };
    const parserOptions = options.join;

    this.api.dataflow
      .sendInEvent('FileDropTarget', 'options', html)
      .sendInEvent('ExcelDuffleParser', 'options', parserOptions);
  }
};