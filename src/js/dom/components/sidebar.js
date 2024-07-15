import todo from "./todo/todo";

const sidebarDiv = document.querySelector("#sidebar");

// Default list buttons
const todayBtn = sidebarDiv.querySelector(".today-list-btn");
const upcomingBtn = sidebarDiv.querySelector(".upcoming-list-btn");
const allTasksBtn = sidebarDiv.querySelector(".all-tasks-list-btn");
const inboxBtn = sidebarDiv.querySelector(".inbox-list-btn");

const createTaskBtn = sidebarDiv.querySelector(".create-task");
const createListBtn = sidebarDiv.querySelector(".create-list");

//TODO: userlists
//TODO: create tasks 

function onTodayBtnClick() {
    todo.clear();
    todo.renderTodayList();
    
}
todayBtn.addEventListener("click", onTodayBtnClick);

function onUpcomingBtnClick() {
    todo.clear();
    todo.renderUpcomingList();
}
upcomingBtn.addEventListener("click", onUpcomingBtnClick);

function onAllTasksBtnClick() {
    todo.clear();
    todo.renderAllTasksList();
    console.log("all tasks clicked")
}
allTasksBtn.addEventListener("click", onAllTasksBtnClick);

function onInboxBtnClick() {
    todo.clear();
    todo.renderInboxList();
    console.log("in inbox btn click")
}
inboxBtn.addEventListener("click", onInboxBtnClick);

