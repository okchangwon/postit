import Contextmenu from "./Contextmenu";

export default class PostitContextmenuView extends Contextmenu {
  _getOptions() {
    return {
      selector: "._postit_contextmenu"
    }
  }
  _activate() {
    super._activate();
  }
}