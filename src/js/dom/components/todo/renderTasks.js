import TaskManager from "../../../tasks/TaskManager";
import todo from "./todo";
import { format } from "date-fns";
import taskForm from "./taskForm";


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

    taskDiv.addEventListener("click", () => {
        onTaskClick(taskId);
    })

    renderTopDiv(taskId, taskDiv);
    renderBottomDiv(taskId, taskDiv);

    parentElement.appendChild(taskDiv);
}

function renderTopDiv(taskId, parentElement) {   
    const topDiv = document.createElement("div");
    topDiv.classList.add("task-top");

    // Left side
    const leftDiv = document.createElement("div");
    leftDiv.classList.add("left");

    renderCheckbox(leftDiv, taskId);

    // Right side
    const rightDiv = document.createElement("div");
    rightDiv.classList.add("right");

    renderEditBtn(taskId, rightDiv);
    renderDeleteBtn(taskId, rightDiv);
    renderEditTaskDialog(taskId, rightDiv);

    topDiv.appendChild(leftDiv);
    topDiv.appendChild(rightDiv);

    parentElement.appendChild(topDiv);
}

function renderBottomDiv(taskId, parentElement) {
    const bottomDiv = document.createElement("div");
    bottomDiv.classList.add("task-bottom");

    // Left side
    const leftDiv = document.createElement("div");
    leftDiv.classList.add("left");

    renderDueDate(taskId, leftDiv);

    // Right side
    const rightDiv = document.createElement("div");
    rightDiv.classList.add("right");

    renderPriority(taskId, rightDiv);
    renderProject(taskId, rightDiv);

    bottomDiv.appendChild(leftDiv);
    bottomDiv.appendChild(rightDiv);

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

    editBtn.addEventListener("click", (event) => {
        onEditBtnClick(event, taskId, parentElement);
    })

    parentElement.appendChild(editBtn);
}

function renderEditTaskDialog(taskId, parentElement) {
    const dialogElement = document.createElement("dialog");
    dialogElement.classList.add("edit-task-dialog");

    // Stops click bubbling up 
    dialogElement.addEventListener("click", (event) => {
        event.stopPropagation();
    })

    taskForm.renderEditTaskForm(dialogElement, taskId);

    parentElement.appendChild(dialogElement);
}

function renderDeleteBtn(taskId, parentElement) {
    const deleteBtn = document.createElement("button");

    deleteBtn.classList.add("delete-btn");
    deleteBtn.textContent = "Delete";

    deleteBtn.addEventListener("click", (event) => {
        onDeleteBtnClick(event, taskId);
    })
    parentElement.appendChild(deleteBtn);
}

function renderDueDate(taskId, parentElement) {
    const dueDateDiv = document.createElement("div");
    dueDateDiv.classList.add("due-date");
    dueDateDiv.textContent = "No due date"

    let dueDate = TaskManager.getDueDate(taskId);
 
    if(dueDate !== null && dueDate instanceof Date && !isNaN(dueDate)) {
        let formattedDueDate = format(dueDate, "dd/MM/yy");
        dueDateDiv.innerText = formattedDueDate;
    }

    parentElement.appendChild(dueDateDiv);
}

function renderPriority(taskId, parentElement) {
    const priorityDiv = document.createElement("p");
    priorityDiv.classList.add("priority");

    let priority = TaskManager.getPriority(taskId);

    priorityDiv.textContent = priority;

    // Apply colour to relative priority 
    switch(priority) {
        case "Low":
            priorityDiv.classList.add("low-priority");
            break;
        case "Medium":
            priorityDiv.classList.add("medium-priority");
            break;
        case "High":
            priorityDiv.classList.add("high-priority");
            break;
    }

    parentElement.appendChild(priorityDiv);
}

function renderProject(taskId, parentElement) {
    const projectNamePara = document.createElement("p");
    projectNamePara.textContent = "No project";
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
function onDeleteBtnClick(event, taskId) {
    event.stopPropagation();
    TaskManager.deleteTask(taskId);
    todo.reloadSelectedList();
}

function onEditBtnClick(event, taskId, parentElement) {
    event.stopPropagation();

    const dialogElement = parentElement.querySelector(".edit-task-dialog");

    renderEditTaskDialog(taskId, parentElement);
    
    if(dialogElement.open){
        dialogElement.close();
    } else 
        dialogElement.showModal();
}

function onTaskClick(taskId) {
    onCheckboxChange(taskId);
}

export default renderArrayOfTasks;