export default class Controller {
  constructor(store, boardView, postitView) {
    this._store = store;
    this._boardView = boardView;
    this._postitView = postitView;

    this._activate();
    this._load();
  }
  _activate() {
    this._boardView
      .on("create", this._onCreate.bind(this))
      .on("sort", this._onSort.bind(this))
      .on("empty", this._onEmpty.bind(this));

    this._postitView
      .on("fold", this._onFold.bind(this))
      .on("remove", this._onRemove.bind(this))
      .on("changeText", this._onChangeText.bind(this))
      .on("contextmenu", this._onContextmenu.bind(this));

    this._postitView
      .on("changeBgColor", this._onChangeBgColor.bind(this))
      .on("changeTextSize", this._onChangeTextSize.bind(this))
      .on("changeTextColor", this._onChangeTextColor.bind(this))
      .on("setPostitTimer", this._onSetPostitTimer.bind(this));
  }
  _load() {
    const postits = this._store.load() || [];
    postits.forEach(postitData => {
      this._store.create(postitData, postit => {
        this._postitView.render(postit);
      });
    });
  }
  _onCreate(offset) {
    this._store.create({}, postit => {
      this._store.update(postit.id, {
        left: offset.left,
        top: offset.top
      });

      this._postitView.render(postit);
    });
  }
  _onSort() {
    console.log("포스트잇 정렬하기");
  }
  _onEmpty() {
    this._store.empty(() => {
      this._postitView.empty();
    });
  }
  _onFold(postitId) {
    const postit = this._store.find(postitId);

    this._store.update(postitId, {fold: !postit.fold});

    this._postitView.render(postit);
  }
  _onRemove(postitId) {
    this._store.remove(postitId, () => {
      this._postitView.remove(postitId);
    });
  }
  _onChangeText(postitId, text) {
    const postit = this._store.find(postitId);

    if(postit.text !== text){
      this._store.update(postitId, {text});
      this._postitView.render(postit);
    }
  }
  _onContextmenu(offset, postitId){
    const postit = this._store.find(postitId);

    this._postitView.openContextmenu(offset, postit);
  }
  _onChangeBgColor(postitId, bgColor){
    const postit = this._store.find(postitId);

    this._store.update(postitId, {bgColor});
    this._postitView.render(postit);
  }
  _onChangeTextSize(postitId, textSize){
    const postit = this._store.find(postitId);

    this._store.update(postitId, {textSize});
    this._postitView.render(postit);
  }
  _onChangeTextColor(postitId, textColor){
    const postit = this._store.find(postitId);

    this._store.update(postitId, {textColor});
    this._postitView.render(postit);
  }
  _onSetPostitTimer(postitId, timer){
    setTimeout(() => {
      this._store.remove(postitId, () => {
        this._postitView.remove(postitId);
      });
    }, timer * 1000);
  }
}
