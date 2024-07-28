import { format } from "date-fns";
import ListManager from "../../../lists/ListManager";
import TaskManager from "../../../tasks/TaskManager";
import todo from "./todo";


function renderCreateTaskForm(dialogElement) {
    const createTaskForm = document.createElement("form");
    createTaskForm.method = "dialog";
    createTaskForm.classList.add("task-form");

    const createTaskHeader = document.createElement("h1");
    createTaskHeader.textContent = "New Task";
    createTaskForm.appendChild(createTaskHeader);
    
    renderNameInput(createTaskForm);
    renderDescriptionInput(createTaskForm);
    renderDueDateInput(createTaskForm);
    renderPriortySelect(createTaskForm);
    renderProjectSelect(createTaskForm);
    
    const buttonDiv = document.createElement("div");
    buttonDiv.classList.add("button-div");

    renderCreateTaskBtn(createTaskForm, buttonDiv);
    renderCloseBtn(createTaskForm, buttonDiv, dialogElement);
    createTaskForm.appendChild(buttonDiv);

    dialogElement.appendChild(createTaskForm);
}

function renderEditTaskForm(dialogElement, taskId) {
    const editTaskForm = document.createElement("form");
    editTaskForm.method = "dialog";
    editTaskForm.classList.add("task-form");

    const editTaskFormTitle = document.createElement("h2");
    editTaskFormTitle.textContent = "Edit Task";
    dialogElement.appendChild(editTaskFormTitle);

    renderNameInput(editTaskForm, TaskManager.getTitle(taskId));
    renderDescriptionInput(editTaskForm, TaskManager.getDescription(taskId));

    let taskDueDate = TaskManager.getDueDate(taskId);
 
    if(taskDueDate !== null && taskDueDate instanceof Date && !isNaN(taskDueDate) ) {
        taskDueDate = format(taskDueDate, "yyyy-MM-dd");
    } else taskDueDate = null

    renderDueDateInput(editTaskForm, taskDueDate);

    renderPriortySelect(editTaskForm, TaskManager.getPriority(taskId));

    const buttonDiv = document.createElement("div");
    buttonDiv.classList.add("button-div");

    renderConfirmChangesBtn(editTaskForm, buttonDiv, taskId);
    renderCloseBtn(editTaskForm, buttonDiv, dialogElement);

    editTaskForm.appendChild(buttonDiv);
    dialogElement.appendChild(editTaskForm);
}

function renderNameInput(parentElement, inputValue = null) {
    const taskNameDiv = document.createElement("div");
    taskNameDiv.classList.add("task-name-div");

    const taskNameInput = document.createElement("input");

    taskNameInput.type = "text";
    taskNameInput.id = "task-name";
    taskNameInput.placeholder = "Task name";

    if(inputValue !== null) {
        taskNameInput.value = inputValue;
    }

    renderLabel(taskNameDiv, "Task Name", taskNameInput.id);

    taskNameDiv.appendChild(taskNameInput);
    parentElement.appendChild(taskNameDiv);

}

function renderDescriptionInput(parentElement, inputValue = null) {
    const descriptionDiv = document.createElement("div");
    descriptionDiv.classList.add("description-div");

    const descriptionInput = document.createElement("input");

    descriptionInput.type = "text";
    descriptionInput.id = "description";
    descriptionInput.placeholder = "Description";

    if(inputValue !== null) {
        descriptionInput.value = inputValue;
    }

    renderLabel(descriptionDiv, "Description", descriptionInput.id); 

    descriptionDiv.appendChild(descriptionInput);
    parentElement.appendChild(descriptionDiv);
}

function renderDueDateInput(parentElement, dateValue = null) {
    const dueDateDiv = document.createElement("div");
    dueDateDiv.classList.add("due-date-div");

    const dueDateInput = document.createElement("input");

    dueDateInput.type = "date";
    dueDateInput.id = "due-date";

    if(dateValue !== null) {
        dueDateInput.value = dateValue;
    } 

    renderLabel(dueDateDiv, "Due Date", dueDateInput.id);

    dueDateDiv.appendChild(dueDateInput);
    parentElement.appendChild(dueDateDiv);
}

function renderPriortySelect(parentElement, taskPriority = "Medium") {    
    const priorityDiv = document.createElement("div");
    priorityDiv.classList.add("priority-div");

    const prioritySelect = document.createElement("select");
    prioritySelect.id = "priority-select";

    renderLabel(priorityDiv, "Priority", prioritySelect.id);

    const low = document.createElement("option");
    const medium = document.createElement("option");
    const high = document.createElement("option");

    low.value = "Low";
    medium.value = "Medium";
    high.value = "High";
    
    switch (taskPriority) {
        case low.value:
            low.selected = true;
            break;
        case medium.value:
            medium.selected = true;
            break;
        case high.value: 
            high.selected = true;
            break;
        default:
            medium.selected = true;
    }

    low.textContent = "Low";
    medium.textContent = "Medium";
    high.textContent = "High";

    prioritySelect.appendChild(low);
    prioritySelect.appendChild(medium);
    prioritySelect.appendChild(high);

    priorityDiv.appendChild(prioritySelect);
    parentElement.appendChild(priorityDiv);
}

function renderProjectSelect(parentElement) {
    const selectDiv = document.createElement("div");
    selectDiv.classList.add("select-div");
    
    const selectElement = document.createElement("select");
    selectElement.id = "project-select";

    const noneOption = document.createElement("option");
    noneOption.value = "";
    noneOption.textContent = "None";
    selectElement.appendChild(noneOption);

    // Loop through all user lists
    const userLists = ListManager.getUserLists();
    for(let userList of userLists) {
        const option = document.createElement("option");

        option.textContent = userList.name;
      
        // Check if option is currently selected list
        let selectedList = ListManager.getSelectedList();
        if(selectedList !== null) {
            if(selectedList.name === userList.name) {
                option.selected = true;
            }
        }
    

        selectElement.appendChild(option);
    }

    renderLabel(selectDiv, "Project", selectElement.id);
    selectDiv.appendChild(selectElement);
    parentElement.appendChild(selectDiv)
}

function renderConfirmChangesBtn(parentElement, buttonDiv, taskId) {
    const confirmChangesBtn = document.createElement("button");
    confirmChangesBtn.textContent = "Confirm Changes";
    confirmChangesBtn.type = "button"

    confirmChangesBtn.addEventListener("click", () => onConfirmChangesBtnClick(parentElement, taskId))

    buttonDiv.appendChild(confirmChangesBtn);
    parentElement.appendChild(buttonDiv);
}

function renderCreateTaskBtn(parentElement, buttonDiv) {
    const createTaskBtn = document.createElement("button");
    createTaskBtn.innerText = "Create";
    createTaskBtn.type = "submit";
    createTaskBtn.addEventListener("click", () => onCreateTaskBtnClick(parentElement));

    buttonDiv.appendChild(createTaskBtn);
    parentElement.appendChild(buttonDiv);
}

function renderCloseBtn(parentElement, buttonDiv, dialogElement) {
    const closeBtn = document.createElement("button");
    closeBtn.innerText = "Close";

    closeBtn.addEventListener("click", () => {
        onCloseBtnClick(dialogElement, parentElement);
    })

    buttonDiv.appendChild(closeBtn);
    parentElement.appendChild(buttonDiv)
}

function onConfirmChangesBtnClick(formElement, taskId) {
    const name = formElement.querySelector("#task-name").value;
    const description = formElement.querySelector("#description").value;
    const dueDateString = formElement.querySelector("#due-date").value; 
    const dueDate = new Date(dueDateString);
    const priority = formElement.querySelector("#priority-select").value;
    
    TaskManager.setTitle(name, taskId);
    TaskManager.setDescription(description, taskId);
    TaskManager.setDueDate(dueDate, taskId);
    TaskManager.setPriority(priority, taskId);
    
    todo.reloadSelectedList();
}

 function onCreateTaskBtnClick(formElement){
    const name = formElement.querySelector("#task-name").value;
    const description = formElement.querySelector("#description").value;
    const dueDateString = formElement.querySelector("#due-date").value; 
    const dueDate = new Date(dueDateString);
    const selectedProject = formElement.querySelector("#project-select").value; 
    const priority = formElement.querySelector("#priority-select").value; 

    const task = TaskManager.createTask(name);
    const taskId = TaskManager.getId(task);

    TaskManager.setDescription(description, taskId);

    if(dueDate instanceof Date && !isNaN(dueDate)) {
        TaskManager.setDueDate(dueDate, taskId);

    }

    if(selectedProject !== "") {
        ListManager.addTaskToList(selectedProject, task);
    }

    TaskManager.setPriority(priority, taskId);

    clearForm(formElement);
    
    // Reload the list currently being displayed
    todo.reloadSelectedList();
}

function onCloseBtnClick(dialogElement, formElement) {
    dialogElement.close();
    clearForm(formElement);
}

function renderLabel(parentElement, textContent, inputId) {
    const label = document.createElement("label");

    label.textContent = textContent;
    label.for = inputId;

    parentElement.appendChild(label);
}

function clearForm(formElement) {
    formElement.reset();
}


export default {
    renderCreateTaskForm,
    renderEditTaskForm, 
    renderLabel
}