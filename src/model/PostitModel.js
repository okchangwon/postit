const DEFAULT_DATA = {
  text: "",
  textSize: 12,
  textColor: "black",
  bgColor: "yellow",
  fold: false,
  left: 0,
  top: 0,
  timer: -1,
  width: 250,
  height: 200
};

let sort = 0;

export default class PostitModel {
  constructor (data) {
    this.id = this.id || data.id || new Date().getTime();
    this.sort = ++sort;

    Object.assign(this, DEFAULT_DATA, data);
  }
  set (data) {
    Object.assign(this, data);
  }
}
