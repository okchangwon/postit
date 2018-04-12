import PostitApp from "./PostitApp";
import PostitStore from "./model/PostitStore";
import BoardView from "./view/Board";
import PostitView from "./view/Postit";

function init () {
  const store = new PostitStore();
  const boardView = new BoardView();
  const postitView = new PostitView();

  window.postitApp = new PostitApp(store, boardView, postitView);
}

$(init);
