import EventEmitter from "events";
import PostitModel from "./PostitModel";

export default class PostitStore extends EventEmitter {
  constructor() {
    super();

    this._list = [];
  }
  create(data = {}, callback) {
    const postit = new PostitModel(data);

    this._list.push(postit);
    this.save();

    typeof callback === "function" && callback(postit);
  }
  empty(callback) {
    this._list = [];
    this.save();

    typeof callback === "function" && callback();
  }
  remove(postitId, callback) {
    const postit = this.find(postitId);

    if(postit) {
      this._list.splice(this._list.indexOf(postit), 1);

      if(postit._interval){
        clearInterval(postit._interval);
        postit._interval = null;
      }

      this.save();

      typeof callback === "function" && callback();
    }
  }
  find(postitId) {
    return this._list.find(postit => postit.id === Number(postitId));
  }
  update(postitId, data) {
    const postit = this.find(postitId);
    postit.set(data);

    this.save();
  }
  save(){
    localStorage.setItem("postits", JSON.stringify(this._list));
  }
  load(){
    return JSON.parse(localStorage.getItem("postits"));
  }
  toFront(postitId, callback){
    const frontPostit = this.find(postitId);
    const list = this._list.slice();

    list.splice(list.indexOf(frontPostit), 1);
    list.push(frontPostit);
    list.forEach((postit, index) => {
      postit.sort = index;
    });

    this.save();

    typeof callback === "function" && callback(list.map(postit => postit.id));
  }
  sort(bounds, callback){
    const gap = 20;

    this._list.forEach((postit, index) => {
      postit.resetDefaultSize();

      const boundSize = Math.min(bounds.width - postit.width, bounds.height - postit.height) - gap;
      const cnt = Math.floor(boundSize / gap);
      const maxSize = cnt * gap;
      let left = index * gap;
      let top = index * gap;

      left = (left % maxSize) + (Math.floor(left / maxSize) * gap);
      left %= Math.floor((bounds.width - postit.width) / gap) * gap;
      top %= maxSize;

      postit.left = left + gap;
      postit.top = top + gap;
      postit.sort = index;
    });

    this.save();

    typeof callback === "function" && callback(this._list);
  }
}