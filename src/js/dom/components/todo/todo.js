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

    // Create header
    const listHeader = document.createElement("div");
    listHeader.classList.add("header");
    listDiv.appendChild(listHeader);

    // List title & delete list btn
    const listTitleDiv = document.createElement("div");
    listTitleDiv.classList.add("list-title-div");
    
    listHeader.appendChild(listTitleDiv);

    createListHeading(listName, listTitleDiv);

    if(ListManager.isUserList(listName)) {
        renderDeleteListBtn(listName, listTitleDiv);
    }

    renderDeleteAllCompletedTasksBtn(listHeader);

    // Tasks
    const tasksDiv = document.createElement("div");
    tasksDiv.classList.add("tasks");
    listDiv.appendChild(tasksDiv);

    renderAddTaskBtn(tasksDiv);


    renderTasks(listName, tasksDiv);

    todoDiv.appendChild(listDiv);

    // Set selected list
    const list = ListManager.getListByName(listName);
    ListManager.setSelectedList(list);
}

function renderAddTaskBtn(parentElement) {
    const addTaskBtn = document.createElement("button");
    addTaskBtn.classList.add("add-task-btn");

    const dialogElement = document.createElement("dialog");
    taskForm.renderCreateTaskForm(dialogElement);
       
    addTaskBtn.textContent = "Add Task";

    addTaskBtn.addEventListener("click", () => {
        dialogElement.innerHTML = "";
        taskForm.renderCreateTaskForm(dialogElement);
        dialogElement.showModal();
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
    uncompletedTasksDiv.classList.add("tasks-container");

    renderArrayOfTasks(uncompletedTasks, uncompletedTasksDiv);

    // Completed heading
    const completedText = document.createElement("h3");
    completedText.textContent = "Completed";

    // Completed tasks
    const completedTasks = ListManager.getCompletedTasks(listName);

    const completedTasksDiv = document.createElement("div");
    completedTasksDiv.classList.add("completed-tasks");
    completedTasksDiv.classList.add("tasks-container");

    renderArrayOfTasks(completedTasks, completedTasksDiv);

    parentElement.appendChild(uncompletedTasksDiv);
    parentElement.appendChild(completedText);
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