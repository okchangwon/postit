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
}