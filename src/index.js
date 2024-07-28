import Task from "./js/tasks/Task";
import sidebar from "./js/dom/components/sidebar";
import nav from "./js/dom/components/nav";
import todo from "./js/dom/components/todo/todo";
import storage from "./js/storage";

import "./css/general.css";
import "./css/nav.css";
import "./css/sidebar.css";
import "./css/todo.css";



storage.restoreItems();

todo.renderList("Inbox");