import ListManager from "../../../lists/ListManager";
import TaskManager from "../../../tasks/TaskManager";
import sidebar from "../sidebar";
import renderArrayOfTasks from "./renderTasks";
import taskForm from "./taskForm";

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
    renderDeleteAllCompletedTasksBtn(listDiv);

    if(ListManager.isUserList(listName)) {
        renderDeleteListBtn(listName, listDiv);
    }

    renderAddTaskBtn(listDiv);

    renderTasks(listName, listDiv);

    todoDiv.appendChild(listDiv);

    // Set selected list
    const list = ListManager.getListByName(listName);
    ListManager.setSelectedList(list);
}

function renderAddTaskBtn(parentElement) {
    const addTaskBtn = document.createElement("button");
    
    const dialogElement = document.createElement("dialog");
    taskForm.renderCreateTaskForm(dialogElement);
       
    addTaskBtn.textContent = "Add Task";

    addTaskBtn.addEventListener("click", () => {
        dialogElement.innerHTML = "";
        taskForm.renderCreateTaskForm(dialogElement);
        dialogElement.show();
    })

    parentElement.appendChild(addTaskBtn);
    parentElement.appendChild(dialogElement)
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

function renderDeleteListBtn(listName, parentElement) {
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";

    deleteBtn.addEventListener("click", () => {
        sidebar.onDeleteListBtnClick(listName);
    })

    parentElement.appendChild(deleteBtn);
}

function renderDeleteAllCompletedTasksBtn(parentElement) {
    const deleteAllCompletedTasksBtn = document.createElement("button");
    deleteAllCompletedTasksBtn.textContent = "Delete completed tasks";

    deleteAllCompletedTasksBtn.addEventListener("click", () => {
        TaskManager.deleteCompletedTasks();
        reloadSelectedList();
    })
    parentElement.appendChild(deleteAllCompletedTasksBtn);
}

export default {
    clear,
    renderList,
    reloadSelectedList
}