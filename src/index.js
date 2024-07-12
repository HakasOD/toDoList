import loadImages from "./js/dom/nav";
import Task from "./js/tasks/Task";
import List from "./js/lists/List";
import defaultLists from "./js/lists/DefaultLists";
import TaskManager from "./js/tasks/TaskManager";

import "./css/general.css";
import "./css/nav.css";
import "./css/sidebar.css";

console.log(defaultLists)

let task1 = TaskManager.createTask("hello");
let task2 = TaskManager.createTask("helloo");
let task3 = TaskManager.createTask("hell");

console.log(defaultLists);

TaskManager.setDueDate(new Date(), task1.id);

console.log(defaultLists);



// Look properly at date-fns



loadImages();
