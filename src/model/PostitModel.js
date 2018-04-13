const DEFAULT_DATA = {
  text: "",
  textSize: 12,
  textColor: "black",
  bgColor: "yellow",
  fold: false,
  left: 0,
  top: 0
};

export default class PostitModel {
  constructor (data) {
    this.id = new Date().getTime();

    Object.assign(this, DEFAULT_DATA, data);
  }
  set (data) {
    Object.assign(this, data);
  }
}
