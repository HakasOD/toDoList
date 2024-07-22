import List from "../../lists/List";
import ListManager from "../../lists/ListManager";
import createListForm from "./createListForm";
import taskForm from "./todo/taskForm";
import todo from "./todo/todo";
import createImgFromUrl from "../assetManager";
import iconMenuSrc from "../../../assets/images/icons/menu.svg";

const sidebarDiv = document.querySelector("#sidebar");
const container = sidebarDiv.querySelector(".container");
const userListUl = sidebarDiv.querySelector(".user-lists");

loadLeftNavImages();

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
    todo.reloadSelectedList();
}


function loadLeftNavImages(){   
    const iconMenu = createImgFromUrl(iconMenuSrc);

    iconMenu.classList.add("menu");

    container.appendChild(iconMenu);

    
    
}

function renderUserListBtn(listName, ulElement = userListUl) {
    const listDiv = document.createElement("div");
    listDiv.id = listName;

    const list = document.createElement("li");
    list.textContent = listName;
    
    list.addEventListener("click", () => {
        onListBtnClick(list);
    });

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";

    deleteBtn.addEventListener("click", () => {
        onDeleteListBtnClick(listName);
    })


    listDiv.appendChild(list);
    listDiv.appendChild(deleteBtn);
    ulElement.appendChild(listDiv);
}

function onCreateTaskBtnClick(dialogElement = createTaskDialog) {
    dialogElement.innerHTML = "";
    taskForm.renderCreateTaskForm(dialogElement);
    createTaskDialog.showModal();
}
createTaskBtn.addEventListener("click", () => {
    onCreateTaskBtnClick();
});

function onCreateListBtnClick() {
    createListDialog.showModal();
}
createListBtn.addEventListener("click", onCreateListBtnClick);

function onDeleteListBtnClick(listName) {
    ListManager.deleteList(listName);

    const listDiv = document.querySelector(`#${listName}`);
    listDiv.remove();

    todo.clear();
    todo.renderList("inbox");
}

export default {
    renderUserListBtn,
    onDeleteListBtnClick
}