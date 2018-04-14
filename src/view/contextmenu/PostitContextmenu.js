import Contextmenu from "./Contextmenu";

export default class PostitContextmenuView extends Contextmenu {
  _getOptions() {
    return {
      selector: "._postit_contextmenu"
    }
  }
  _caching() {
    super._caching();

    this._$textColor = this._$el.find("._textColor");
    this._$textSize = this._$el.find("._textSize");
    this._$bgColor = this._$el.find("._bgColor");
    this._$fold = this._$el.find("._fold");
    this._$unfold = this._$el.find("._unfold");
    this._$timer = this._$el.find("._timer");
  }
  _activate() {
    super._activate();

    this._$bgColor.on("change", this._onChangeBgColor.bind(this));
    this._$textSize.on("change", this._onChangeTextSize.bind(this));
    this._$textColor.on("change", this._onChangeTextColor.bind(this));
  }
  _onChangeBgColor(){
    const bgColor = this._$bgColor.val();
    this._$bgColor.attr("data-value", bgColor);
    this.emit("changeBgColor", bgColor);
  }
  _onChangeTextSize(){
    this.emit("changeTextSize", this._$textSize.val());
  }
  _onChangeTextColor(){
    const textColor = this._$textColor.val();
    this._$textColor.attr("data-value", textColor);
    this.emit("changeTextColor", textColor);
  }
  show({offset, postit}) {
    super.show({offset});

    this.postitId = postit.id;
    this.update(postit);
  }
  update(postit) {
    this._$textColor.val(postit.textColor);
    this._$textSize.val(postit.textSize);
    this._$bgColor.val(postit.bgColor);
    this._$fold.toggle(!postit.fold);
    this._$unfold.toggle(postit.fold);

    this._$bgColor.attr("data-value", postit.bgColor);
    this._$textColor.attr("data-value", postit.textColor);

    if(!this._$timer.is(":focus")){
      this._$timer.val(postit.timer > 0 ? postit.timer : 0);
    }
  }
  hide() {
    super.hide();
    const timer = Number(this._$timer.val());

    this.emit("hide", this.postitId, timer);
  }
}