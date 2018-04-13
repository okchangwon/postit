import EventEmitter from "events";

export default class View extends EventEmitter {
  constructor() {
    super();

    this._init();
    this._caching();
    this._activate();
  }
  _init() {}
  _caching() {}
  _activate() {}
  _getOffsetFromEvent(e) {
    return {
      left: e.clientX,
      top: e.clientY,
    };
  }
}