import View from "./View";
import GlobalContextmenu from "./contextmenu/GlobalContextmenu";

export default class BoardView extends View {
  _init () {
    this._contextmenu = new GlobalContextmenu();
  }
  _caching () {
    this._$el = $("._postit_board").eq(0);
  }
  _activate () {
    this._$el.on("contextmenu", this._onContextmenu.bind(this));

    this._contextmenu.on("create", this._onCreate.bind(this));
    this._contextmenu.on("sort", this._onSort.bind(this));
    this._contextmenu.on("empty", this._onEmpty.bind(this));
  }
  _onContextmenu (e) {
    if(!this._$el.is(e.target)) {
      return;
    }

    this._contextmenu.show({
      offset: this._getOffsetFromEvent(e),
    });

    e.preventDefault();
  }
  _onCreate() {
    const offset = this._contextmenu.getOffset();

    this.emit("create", offset);
  }
  _onSort() {
    this.emit("sort");
  }
  _onEmpty() {
    this.emit("empty");
  }
}