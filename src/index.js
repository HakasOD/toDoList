import loadImages from "./js/navDisplay";
import Task from "./js/Task";

import "./css/general.css";
import "./css/nav.css";
import "./css/sidebar.css";

let hi = new Task("whoa")
console.log(hi.discription);
hi.title = "s";
console.log(hi.title)
console.log('soas');

loadImages();