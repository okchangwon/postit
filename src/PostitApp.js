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
      .on("contextmenu", this._onContextmenu.bind(this))
      .on("changeBgColor", this._onChangeBgColor.bind(this))
      .on("changeTextSize", this._onChangeTextSize.bind(this))
      .on("changeTextColor", this._onChangeTextColor.bind(this))
      .on("setPostitTimer", this._onSetPostitTimer.bind(this))
      .on("adjustPosition", this._onAdjustPosition.bind(this))
      .on("adjustSize", this._onAdjustSize.bind(this))
      .on("toFront", this._onToFront.bind(this))
      .on("resizePostit", this._onResizePostit.bind(this))
      .on("movePostit", this._onMovePostit.bind(this));
  }
  _load() {
    const postits = this._store.load() || [];
    postits.forEach(postitData => {
      this._store.create(postitData, postit => {
        this._postitView.render(postit);
        this._initPostitTimer(postit.id, postit.timer);
      });
    });
  }
  _onCreate(offset) {
    this._store.create({}, postit => {
      this._store.update(postit.id, {
        left: offset.left,
        top: offset.top,
      });

      this._postitView.render(postit);
    });
  }
  _onSort(bounds) {
    this._store.sort(bounds, postits =>
      postits.forEach(postit => {
        this._postitView.render(postit);
      }),
    );
  }
  _onEmpty() {
    this._store.empty(() => {
      this._postitView.empty();
    });
  }
  _onFold(postitId) {
    const postit = this._store.find(postitId);

    this._store.update(postitId, { fold: !postit.fold });

    this._postitView.render(postit);
  }
  _onRemove(postitId) {
    this._store.remove(postitId, () => {
      this._postitView.remove(postitId);
    });
  }
  _onChangeText(postitId, text) {
    const postit = this._store.find(postitId);

    if (postit.text !== text) {
      this._store.update(postitId, { text });
      this._postitView.render(postit);
    }
  }
  _onContextmenu(offset, postitId) {
    const postit = this._store.find(postitId);

    this._postitView.openContextmenu(offset, postit);
  }
  _onChangeBgColor(postitId, bgColor) {
    const postit = this._store.find(postitId);

    this._store.update(postitId, { bgColor });
    this._postitView.render(postit);
  }
  _onChangeTextSize(postitId, textSize) {
    const postit = this._store.find(postitId);

    this._store.update(postitId, { textSize });
    this._postitView.render(postit);
  }
  _onChangeTextColor(postitId, textColor) {
    const postit = this._store.find(postitId);

    this._store.update(postitId, { textColor });
    this._postitView.render(postit);
  }
  _onSetPostitTimer(postitId, timer) {
    this._initPostitTimer(postitId, timer);
  }
  _initPostitTimer(postitId, timer) {
    const postit = this._store.find(postitId);

    if (!postit || timer < 0) {
      return;
    }

    if (postit._interval) {
      clearInterval(postit._interval);
      postit._interval = null;
    }

    this._store.update(postit.id, { timer });
    this._postitView.render(postit);

    postit._interval = setInterval(() => {
      timer--;

      if (timer >= 0) {
        this._store.update(postit.id, { timer });
        this._postitView.render(postit);
      }

      if (timer === 0) {
        clearInterval(postit._interval);
        postit._interval = null;

        this._store.remove(postit.id, () => {
          this._postitView.remove(postit.id);
        });
      }
    }, 1000);
  }
  _onAdjustPosition(postitId, left, top) {
    const postit = this._store.find(postitId);

    this._store.update(postitId, {
      left,
      top,
    });
    this._postitView.render(postit);
  }
  _onAdjustSize(postitId, width, height) {
    const postit = this._store.find(postitId);

    this._store.update(postitId, {
      width,
      height,
    });
    this._postitView.render(postit);
  }
  _onToFront(postitId) {
    this._store.toFront(postitId, postitIds => {
      this._postitView.updateZindex(postitIds);
    });
  }
  _onResizePostit(postitId, widthDiff, heightDiff) {
    const postit = this._store.find(postitId);

    this._store.update(postitId, {
      width: postit.width + widthDiff,
      height: postit.height + heightDiff,
    });
  }
  _onMovePostit(postitId, left, top) {
    const postit = this._store.find(postitId);

    this._store.update(postitId, {
      left,
      top,
    });
    this._postitView.render(postit);
  }
}
