import View from "./View";
import PostitContextmenu from "./contextmenu/PostitContextmenu";

export default class PostitView extends View {
  _init() {
    this._contextmenu = new PostitContextmenu();
    this._draggingPostitId = null;
  }
  _caching() {
    this._$window = $(window);
    this._$document = $(document);
    this._$board = $("._postit_board").eq(0);
    this._template = $("script[type='text/x-postit-template']").text();
  }
  _activate() {
    this._$board
      .on("contextmenu", "._postit", this._onContextmenu.bind(this))
      .on("mousedown", "._postit", this._onMousedownPostit.bind(this))
      .on("click", "._toggle_btn", this._onClickFold.bind(this))
      .on("click", "._remove_btn", this._onClickRemove.bind(this))
      .on("input", "._text", this._onInputText.bind(this))
      .on("mousedown", "._postit ._header", this._onMousedownHeader.bind(this))
      .on("mousedown", "._postit ._text", this._onMousedownTextarea.bind(this));

    this._contextmenu
      .on("fold", this._onFold.bind(this))
      .on("delete", this._onRemove.bind(this))
      .on("changeBgColor", this._onChangeBgColor.bind(this))
      .on("changeTextSize", this._onChangeTextSize.bind(this))
      .on("changeTextColor", this._onChangeTextColor.bind(this))
      .on("hide", this._onHideContextmenu.bind(this));

    this._$window
      .on("resize", this._onResizeWindow.bind(this))
      .on("mousemove", this._onMousemoveWindow.bind(this))
      .on("mouseup", this._onMouseupWindow.bind(this));
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

    this.emit("toFront", postitId);
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
  _onResizeWindow(){
    const $postits = this._$board.find("._postit");

    $postits.each((idx, postitElement) => {
      this._adjustPosition($(postitElement));
    });
  }
  _onMousedownTextarea(e){
    const $textarea = $(e.currentTarget);
    const $postit = $textarea.closest("._postit");

    $postit.addClass("selected");

    $postit.data({
      textareaWidth: parseInt($textarea.width(), 10),
      textareaHeight: parseInt($textarea.height(), 10)
    });
  }
  _onMousedownHeader(e){
    const $postit = $(e.currentTarget).closest("._postit");
    const postitId = Number($postit.data("id"));

    this._draggingPostitId = postitId;
    this._draggingStartPoint = {
      left: parseInt($postit.css("left"), 10),
      top: parseInt($postit.css("top"), 10),
      clientX: e.clientX,
      clientY: e.clientY
    }
  }
  _onMousemoveWindow(e){
    if(this._draggingPostitId) {
      const left = e.clientX - (this._draggingStartPoint.clientX - this._draggingStartPoint.left);
      const top = e.clientY - (this._draggingStartPoint.clientY - this._draggingStartPoint.top);

      this.emit("movePostit", this._draggingPostitId, left, top);
    }
  }
  _onMouseupWindow(){
    const $selectedPostit = this._$board.find(`._postit.selected`);

    if($selectedPostit.length) {
      const $textarea = $selectedPostit.find("._text");
      const widthDiff = $textarea.width() - $selectedPostit.data("textareaWidth");
      const heightDiff = $textarea.height() - $selectedPostit.data("textareaHeight");
      const postitId = $selectedPostit.attr("data-id");

      if (widthDiff || heightDiff) {
        this.emit("resizePostit", postitId, widthDiff, heightDiff);
        this._adjustPosition($selectedPostit);
      }

      $selectedPostit.removeClass("selected");
    }

    if(this._draggingPostitId) {
      this._draggingPostitId = null;
    }
  }
  _adjustPosition($postit) {
    const postitId = $postit.attr("data-id");
    const docWidth = this._$document.width();
    const docHeight = this._$document.height();
    const width = $postit.width();
    const height = $postit.height();
    const originalLeft = parseInt($postit.css("left"), 10);
    const originalTop = parseInt($postit.css("top"), 10);
    const left = Math.max(0, Math.min(originalLeft, docWidth - width));
    const top = Math.max(0, Math.min(originalTop, docHeight - height));

    if(originalLeft !== left || originalTop !== top){
      this.emit("adjustPosition",
        postitId,
        left,
        top
      );
    }

    this._adjustSize($postit);
  }
  _adjustSize($postit){
    const postitId = $postit.attr("data-id");
    const docWidth = this._$document.width();
    const docHeight = this._$document.height();
    const width = $postit.width();
    const height = $postit.height();

    if(width > docWidth || height > docHeight){
      this.emit("adjustSize",
        postitId,
        Math.min(width, docWidth),
        Math.min(height, docHeight)
      );
    }
  }
  render(postit) {
    const $postit = this._find(postit.id) || this._create(postit);
    const $text = $postit.find("._text");

    if($text.val() !== postit.text){
      $text.val(postit.text)
    }

    $text.css({
        width: postit.width - 2,
        height: postit.height - 16,
        color: postit.textColor,
        "font-size": `${postit.textSize}px`
      });

    $postit
      .find("._remain_time")
      .text(`[${postit.timer}초 남음]`)
      .toggle(postit.timer >= 0);

    $postit
      .find("._title")
      .text(postit.text.trim().split("\n")[0])
      .css({
        color: postit.textColor
      });

    if($postit.is(":visible") && !this._draggingPostitId){
      $postit
        .stop(true, true)
        .animate({
          left: postit.left,
          top: postit.top
        }, 100, () => {
          this._adjustPosition($postit);
        });
    }else {
      $postit
        .css({
          left: postit.left,
          top: postit.top
        });
      this._adjustPosition($postit);
    }

    if(postit.timer &&
      this._contextmenu.isVisible() &&
      this._contextmenu.postitId === postit.id){
      this._contextmenu.update(postit);
    }

    $postit
      .css({
        "z-index": postit.sort + 1000
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
    if(postitId === this._contextmenu.postitId){
      this._contextmenu.hide();
    }
  }
  updateZindex(postitIds){
    postitIds.forEach((postitId, index) => {
      this._$board
        .find(`._postit[data-id='${postitId}']`)
        .css({
          "z-index": index + 1000
        });
    });
  }
}