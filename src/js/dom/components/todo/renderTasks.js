import Task from "../../../tasks/Task";
import TaskManager from "../../../tasks/TaskManager";
import todo from "./todo";
import { format } from "date-fns";
import taskForm from "./taskForm";
import ListManager from "../../../lists/ListManager";

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

    renderTopDiv(taskId, taskDiv);
    renderBottomDiv(taskId, taskDiv);

    parentElement.appendChild(taskDiv);
}

function renderTopDiv(taskId, parentElement) {   
    const topDiv = document.createElement("div");
    topDiv.classList.add("task-top");

    // Left side
    renderCheckbox(topDiv, taskId);

    // Right side
    renderEditBtn(taskId, topDiv);
    renderDeleteBtn(taskId, topDiv);
    renderEditTaskDialog(taskId, topDiv);

    parentElement.appendChild(topDiv);
}

function renderBottomDiv(taskId, parentElement) {
    const bottomDiv = document.createElement("div");
    bottomDiv.classList.add("task-bottom");

    // Left side
    renderDueDate(taskId, bottomDiv);

    // Right side
    renderProject(taskId, bottomDiv);

    parentElement.appendChild(bottomDiv);
}

function renderCheckbox(parentElement, taskId) {
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

    parentElement.appendChild(checkBox);
    parentElement.appendChild(label);
}

function renderEditBtn(taskId, parentElement) {
    const editBtn = document.createElement("button");

    editBtn.classList.add("edit-btn");
    editBtn.textContent = "Edit";

    editBtn.addEventListener("click", () => {
        onEditBtnClick(taskId, parentElement);
    })

    parentElement.appendChild(editBtn);
}

function renderEditTaskDialog(taskId, parentElement) {
    const dialogElement = document.createElement("dialog");
    dialogElement.classList.add("edit-task-dialog");

    taskForm.renderEditTaskForm(dialogElement, taskId);

    parentElement.appendChild(dialogElement);
}

function renderDeleteBtn(taskId, parentElement) {
    const deleteBtn = document.createElement("button");

    deleteBtn.classList.add("delete-btn");
    deleteBtn.textContent = "Delete";

    deleteBtn.addEventListener("click", () => {
        onDeleteBtnClick(taskId);
    })
    parentElement.appendChild(deleteBtn);
}

function renderDueDate(taskId, parentElement) {
    const dueDateDiv = document.createElement("div");
    dueDateDiv.classList.add("due-date");

    let dueDate = TaskManager.getDueDate(taskId);
 
    if(dueDate !== null && dueDate instanceof Date && !isNaN(dueDate)) {
        let formattedDueDate = format(dueDate, "dd/MM/yy");
        dueDateDiv.innerText = formattedDueDate;
    }

    parentElement.appendChild(dueDateDiv);
}

function renderProject(taskId, parentElement) {
    const projectNamePara = document.createElement("p");
    projectNamePara.textContent = "None";
    parentElement.appendChild(projectNamePara);

    const project = TaskManager.getProject(taskId);
    
    if(project === null) return;

    projectNamePara.textContent = project.name;

}

function onCheckboxChange(taskId) {
    TaskManager.toggleIsCompleted(taskId);
    todo.reloadSelectedList();
}

//TODO: Probably need to delete from list as well
function onDeleteBtnClick(taskId) {
    TaskManager.deleteTask(taskId);
    todo.reloadSelectedList();
}

function onEditBtnClick(taskId, parentElement) {
    const dialogElement = parentElement.querySelector(".edit-task-dialog");

    if(dialogElement.open){
        dialogElement.close();
    } else 
        dialogElement.show();
}

export default renderArrayOfTasks;