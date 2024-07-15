import loadImages from "./js/dom/components/nav";
import Task from "./js/tasks/Task";
import List from "./js/lists/List";
import defaultLists from "./js/lists/DefaultLists";
import TaskManager from "./js/tasks/TaskManager";
import ListManager from "./js/lists/ListManager";
import "./js/dom/components/sidebar";

import "./css/general.css";
import "./css/nav.css";
import "./css/sidebar.css";


TaskManager.createTask("omg");
TaskManager.createTask("wow");
TaskManager.createTask("incredible");



// Check if inbox works with userLists

loadImages();
