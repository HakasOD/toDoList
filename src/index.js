import loadNavImages from "./js/dom/components/nav";
import TaskManager from "./js/tasks/TaskManager";
// import ListManager from "./js/lists/ListManager";
import "./js/dom/components/sidebar";

import "./css/general.css";
import "./css/nav.css";
import "./css/sidebar.css";


TaskManager.createTask("omg");
TaskManager.createTask("wow");
const incredible = TaskManager.createTask("incredible");

TaskManager.setDueDate(new Date(), incredible.id);

// Check if inbox works with userLists

loadNavImages();
