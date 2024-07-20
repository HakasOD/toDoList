import taskForm from "./todo/taskForm";
import todo from "./todo/todo";

const sidebarDiv = document.querySelector("#sidebar");

// Create task module 
const createTaskDialog = sidebarDiv.querySelector(".create-task-dialog");
taskForm.renderCreateTaskForm(createTaskDialog);
const createTaskBtn = sidebarDiv.querySelector(".create-task-btn");

// Create list module
const createListBtn = sidebarDiv.querySelector(".create-list-btn");

//TODO: userlists
//TODO: create tasks 

const listBtns = sidebarDiv.querySelectorAll(".list");

listBtns.forEach((listBtn) => {
   listBtn.addEventListener("click", () => {
        onListBtnClick(listBtn);
   }) 

});

function onListBtnClick(listBtn) {
    todo.clear();
    todo.renderList(listBtn.textContent);
}

function onCreateTaskBtnClick() {
    createTaskDialog.showModal();
}
createTaskBtn.addEventListener("click", onCreateTaskBtnClick);

