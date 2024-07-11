import loadImages from "./js/dom/nav";
import Task from "./js/tasks/Task";
import List from "./js/lists/List";
import defaultLists from "./js/lists/DefaultLists";
import TaskManager from "./js/tasks/TaskManager";

import "./css/general.css";
import "./css/nav.css";
import "./css/sidebar.css";

console.log(defaultLists)
console.log(TaskManager.getTasks())
TaskManager.createTask('Hello')
TaskManager.createTask("Woah!!")
const firstTask = TaskManager.getTaskById(TaskManager.getTasks()[0].id);

TaskManager.toggleIsCompleted(firstTask.id)
TaskManager.setPriority(4, firstTask.id )
console.log(TaskManager.getTaskById(firstTask.id))






loadImages();
