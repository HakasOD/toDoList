import loadNavImages from "./js/dom/components/nav";
import TaskManager from "./js/tasks/TaskManager";
// import ListManager from "./js/lists/ListManager";
import "./js/dom/components/sidebar";
import todo from "./js/dom/components/todo/todo";
storage.restoreItems();

import "./css/general.css";
import "./css/nav.css";
import "./css/sidebar.css";
import "./css/todo.css";
import storage from "./js/storage";




// Check if inbox works with userLists

loadNavImages();

todo.renderList("Inbox");