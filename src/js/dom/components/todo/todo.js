import ListManager from "../../../lists/ListManager";
import renderArrayOfTasks from "./renderTasks";

const todoDiv = document.querySelector("#todos");
// const createTaskBtns = document.querySelectorAll("") //TODO: Bring up create task form
//func takes listname so it can save task to correct list

function clear() {
    todoDiv.innerHTML = "";
}

function renderList(listName) {
    const listDiv = document.createElement("div");

    listDiv.id = "todo-list";

    createListHeading(listName, listDiv);

    renderTasks(listName, listDiv);

    //TODO: add list btn
    renderAddTaskBtn();


    todoDiv.appendChild(listDiv);

    // Set selected list
    const list = ListManager.getListByName(listName);
    ListManager.setSelectedList(list);
}

function renderAddTaskBtn(parentElement) {
    
}
function reloadSelectedList() {
    let selectedList = ListManager.getSelectedList();
     
    if(selectedList === null) return;
    if(selectedList === undefined) return;

    clear();
    renderList(selectedList.name);
}

function createListHeading(title, parentElement) {
    const heading = document.createElement("h1");
    heading.innerText = title;
    parentElement.appendChild(heading);
}

function renderTasks(listName, parentElement) {
    // Uncompleted tasks
    const uncompletedTasks = ListManager.getUncompletedTasks(listName);

    const uncompletedTasksDiv = document.createElement("div");
    uncompletedTasksDiv.classList.add("uncompleted-tasks");

    renderArrayOfTasks(uncompletedTasks, uncompletedTasksDiv);

    // Completed tasks
    const completedTasks = ListManager.getCompletedTasks(listName);

    const completedTasksDiv = document.createElement("div");
    completedTasksDiv.classList.add("completed-tasks");

    const completedText = document.createElement("p");
    completedText.textContent = "Completed";
    completedTasksDiv.appendChild(completedText);

    renderArrayOfTasks(completedTasks, completedTasksDiv);

    parentElement.appendChild(uncompletedTasksDiv);
    parentElement.appendChild(completedTasksDiv);
}


export default {
    clear,
    renderList,
    reloadSelectedList
}