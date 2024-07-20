import createListForm from "./createListForm";
import taskForm from "./todo/taskForm";
import todo from "./todo/todo";

const sidebarDiv = document.querySelector("#sidebar");
const userListUl = sidebarDiv.querySelector(".user-lists");

// Create task module 
const createTaskDialog = sidebarDiv.querySelector(".create-task-dialog");
taskForm.renderCreateTaskForm(createTaskDialog);
const createTaskBtn = sidebarDiv.querySelector(".create-task-btn");

// Create list module
const createListDialog = sidebarDiv.querySelector(".create-list-dialog");
createListForm.renderCreateListForm(createListDialog);
const createListBtn = sidebarDiv.querySelector(".create-list-btn");

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

function renderUserListBtn(listName, ulElement = userListUl) {
    const list = document.createElement("li");

    list.textContent = listName;
    
    list.addEventListener("click", () => {
        onListBtnClick(list);
    })

    ulElement.appendChild(list)
}

function onCreateTaskBtnClick() {
    createTaskDialog.showModal();
}
createTaskBtn.addEventListener("click", onCreateTaskBtnClick);

function onCreateListBtnClick() {
    createListDialog.showModal();
}
createListBtn.addEventListener("click", onCreateListBtnClick);

export default {
    renderUserListBtn
}