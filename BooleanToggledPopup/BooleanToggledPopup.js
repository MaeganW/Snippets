export default {
  _init() {

    this.isOpen = false;
    this._pop_up();

  },

  target() {

    this._pop_up();

  },

  options() {

    this._pop_up();

  },

  _pop_up() {

    let state = this.api.inputState.export(),
      layout = this.api.layoutElement,
      target = state.target,
      options = state.options,
      $ = this.api.imports.$;

    $(target)
      .popup({
        inline: options.inline,
        hoverable: options.hoverable,
        popup: $(layout),
        position: options.position,
        on: false
      });

  },

  toggle() {

    let state = this.api.inputState.export(),
      layout = this.api.layoutElement,
      target = state.target,
      isHidden = state.toggle;
    $ = this.api.imports.$;

    if (!this.isHidden) {
      $(target)
        .popup('show');
      this.isOpen = true;
      this.api.output("opened", true);
    }

    else {
      $(target)
        .popup('hide');
      this.isOpen = false;
      this.api.output("closed", true);
    }

  }

};
