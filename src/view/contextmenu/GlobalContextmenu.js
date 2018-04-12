import Contextmenu from "./Contextmenu";

export default class GlobalContextmenuView extends Contextmenu {
  _getOptions() {
    return {
      selector: "._global_contextmenu"
    }
  }
}