import TaskManager from "../../../tasks/TaskManager";
import todo from "./todo";

//TODO: Edit task
//TODO: remove task button
//TODO: Make top and bottom div of each task. Top includes title and editing. Bottom includes date & userList if default list.
function renderArrayOfTasks(taskArray, parentElement) {
    for(const task of taskArray) {
        renderTask(task, parentElement);
    }
}

function renderTask(task, parentElement) {
    const taskId = TaskManager.getId(task);
    const taskDiv = document.createElement("div");

    taskDiv.dataset.id = taskId;
    taskDiv.classList.add("task");

    renderTaskTitle(taskId, taskDiv);
    renderTaskDueDate(taskId, taskDiv);

    parentElement.appendChild(taskDiv);
}

function renderTaskTitle(taskId, parentElement) {   
    const titleDiv = document.createElement("div");
    titleDiv.classList.add("title");

    const checkBox = document.createElement("input");
    checkBox.type = "checkbox";
    checkBox.id = taskId;
    checkBox.name = "task"
    checkBox.checked = TaskManager.getIsCompleted(taskId);

    checkBox.addEventListener("change", () => {
        onCheckboxChange(taskId);
    })

    const label = document.createElement("label");
    label.for = taskId;
    label.innerText = TaskManager.getTitle(taskId);

    titleDiv.appendChild(checkBox);
    titleDiv.appendChild(label);

    parentElement.appendChild(titleDiv);
}

function onCheckboxChange(taskId) {
    TaskManager.toggleIsCompleted(taskId);
    todo.reloadSelectedList();
}

function renderTaskDueDate(taskId, parentElement) {
    const dueDateDiv = document.createElement("div");
    dueDateDiv.classList.add("due-date");

    //TODO: date-fns formatting
    dueDateDiv.innerText = TaskManager.getDueDate(taskId);

    parentElement.appendChild(dueDateDiv);
}

export default renderArrayOfTasks;