import EventEmitter from "events";

const instances = [];

export default class ContextmenuView extends EventEmitter {
  constructor() {
    super();

    instances.push(this);

    this._init();
    this._caching();
    this._activate();
  }

  _init() {
    this._offset = {};
    this._options = this._getOptions();
    this._visible = false;
  }

  _caching() {
    this._$window = $(window);
    this._$document = $(document);
    this._$el = $(this._options.selector).eq(0);
  }

  _activate() {
    this._$window.on("mousedown", this._onMousedownWindow.bind(this));
    this._$window.on("resize", this._onResizeWindow.bind(this));
    this._$el.on("click contextmenu", "._btn", this._onClickBtn.bind(this));
  }

  _onMousedownWindow(e) {
    if($(e.target).closest(this._options.selector).length){
      return;
    }

    if(this._visible) {
      this.hide();
    }
  }

  _onResizeWindow() {
    if(this._visible){
      this._adjustPosition();
    }
  }

  _onClickBtn(e) {
    const code = $(e.target).data("code");

    this.hide();

    this.emit(code, e);

    e.preventDefault();
  }

  _setPosition(offset) {
    const docWidth = this._$document.width();
    const docHeight = this._$document.height();
    const width = this._$el.width();
    const height = this._$el.height();
    const left = offset.left > docWidth - width ? offset.left - width : offset.left;
    const top = offset.top > docHeight - height ? offset.top - height : offset.top;

    this._offset = {left, top};
    this._$el.css(this._offset);
  }

  _adjustPosition() {
    const docWidth = this._$document.width();
    const docHeight = this._$document.height();
    const width = this._$el.width();
    const height = this._$el.height();
    const left = Math.min(this._offset.left, docWidth - width);
    const top = Math.min(this._offset.top, docHeight - height);

    this._offset = {left, top};
    this._$el.css(this._offset);
  }

  isVisible() {
    return this._visible;
  }

  getOffset() {
    return this._offset;
  }

  show({offset}) {
    this._visible = true;
    this._setPosition(offset);
    this._$el.stop().slideDown(50);
  }

  hide() {
    if(this._visible) {
      this._visible = false;
      this._$el.fadeOut(150);
    }
  }
}