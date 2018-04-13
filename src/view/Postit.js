import View from "./View";
import PostitContextmenu from "./contextmenu/PostitContextmenu";

export default class PostitView extends View {
  _init() {
    this._contextmenu = new PostitContextmenu();
  }
  _caching() {
    this._$board = $("._postit_board").eq(0);
    this._template = $("script[type='text/x-postit-template']").text();
  }
  _activate() {
    this._$board.on("contextmenu", "._postit", this._onContextmenu.bind(this));
    this._$board.on("mousedown", "._postit", this._onMousedownPostit.bind(this));
    this._$board.on("click", "._toggle_btn", this._onClickFold.bind(this));
    this._$board.on("click", "._remove_btn", this._onClickRemove.bind(this));
    this._$board.on("input", "._text", this._onInputText.bind(this));

    this._contextmenu.on("fold", this._onFold.bind(this));
    this._contextmenu.on("delete", this._onRemove.bind(this));
    this._contextmenu.on("changeBgColor", this._onChangeBgColor.bind(this));
    this._contextmenu.on("changeTextSize", this._onChangeTextSize.bind(this));
    this._contextmenu.on("changeTextColor", this._onChangeTextColor.bind(this));
    this._contextmenu.on("hide", this._onHideContextmenu.bind(this));
  }
  _onContextmenu (e) {
    const $postit = $(e.currentTarget);
    const postitId = Number($postit.data("id"));
    const offset = this._getOffsetFromEvent(e);

    this.emit("contextmenu", offset, postitId);

    e.preventDefault();
  }
  openContextmenu (offset, postit) {
    this._contextmenu.show({
      offset,
      postit
    });
  }
  _find(id) {
    const $postit = this._$board.find(`._postit[data-id='${id}']`);

    return $postit.length ? $postit : null;
  }
  _create(postit) {
    return $(this._template)
      .attr("data-id", postit.id)
      .appendTo(this._$board);
  }
  _onMousedownPostit(e) {
    const $postit = $(e.currentTarget);
    const postitId = Number($postit.data("id"));
    console.log("맨위로", postitId);
  }
  _onClickFold(e) {
    const $postit = $(e.target).closest("._postit");
    const postitId = $postit.attr("data-id");

    this.emit("fold", postitId);
  }
  _onClickRemove(e) {
    const $postit = $(e.target).closest("._postit");
    const postitId = $postit.attr("data-id");

    this.emit("remove", postitId);
  }
  _onInputText(e) {
    const $postit = $(e.target).closest("._postit");
    const postitId = $postit.attr("data-id");
    const text = $(e.currentTarget).val();

    this.emit("changeText", postitId, text);
  }
  _onFold(){
    const postitId = this._contextmenu.postitId;
    this.emit("fold", postitId);
  }
  _onRemove(){
    const postitId = this._contextmenu.postitId;
    this.emit("remove", postitId);
  }
  _onChangeBgColor(bgColor){
    const postitId = this._contextmenu.postitId;
    this.emit("changeBgColor", postitId, bgColor);
  }
  _onChangeTextSize(textSize){
    const postitId = this._contextmenu.postitId;
    this.emit("changeTextSize", postitId, textSize);
  }
  _onChangeTextColor(textColor){
    const postitId = this._contextmenu.postitId;
    this.emit("changeTextColor", postitId, textColor);
  }
  _onHideContextmenu(postitId, timer){
    if(timer) {
      this.emit("setPostitTimer", postitId, timer);
    }
  }
  render(postit) {
    const $postit = this._find(postit.id) || this._create(postit);
    const $text = $postit.find("._text");

    if($text.val() !== postit.text){
      $text.val(postit.text)
    }

    $text.css({
        color: postit.textColor,
        "font-size": `${postit.textSize}px`
      });

    $postit
      .find("._title")
      .text(postit.text)
      .css({
        color: postit.textColor
      });

    $postit
      .css({
        left: postit.left,
        top: postit.top,
      })
      .attr("data-bg-color", postit.bgColor)
      .toggleClass("fold", postit.fold)
      .show();
  }
  empty() {
    this._$board.find("._postit").remove();
  }
  remove(postitId) {
    this._$board.find(`._postit[data-id='${postitId}']`).remove();
  }
}