function renderCreateTaskForm(dialogElement) {
    const createTaskForm = document.createElement("form");

    renderNameInput(createTaskForm);
    renderDescriptionInput(createTaskForm);
    renderDueDateInput(createTaskForm);
    //renderPriortySelect(createTaskForm)
    renderCloseBtn(createTaskForm, dialogElement);

    moduleElement.appendChild(createTaskForm);
}

function renderNameInput(dialogElement) {
    //TODO: add required to name
    const taskNameInput = document.createElement("input");

    taskNameInput.type = "text";
    taskNameInput.id = "task-name";
    taskNameInput.placeholder = "Task name";

    parentElement.appendChild(taskNameInput);
}

function renderDescriptionInput(parentElement) {
    const descriptionInput = document.createElement("input");

    descriptionInput.type = "text";
    descriptionInput.id = "description";
    descriptionInput.placeholder = "Description";

    parentElement.appendChild(descriptionInput);
}

function renderDueDateInput(parentElement) {
    const dueDateInput = document.createElement("input");

    dueDateInput.type = "date";
    dueDateInput.id = "due-date";

    parentElement.appendChild(dueDateInput);
}

function renderPriortySelect(parentElement) {
    
    //TODO: priority
    const prioritySelect = document.createElement("select");
    const priority1 = document.createElement("option");
    const priority2 = document.createElement("option");
    const priority3 = document.createElement("option");
    const priority4 = document.createElement("option");

    priority1.value = "priority1";
    priority2.value = "priority2";
    priority3.value = "priority3";
    priority4.value = "priority4";
}

function renderCreateTaskBtn(parentElement) {
    const createTaskBtn = document.createElement("button");
    createTaskBtn.innerText = "Create";

    createTaskBtn.addEventListener("click", onCreateTaskBtnClick);

    parentElement.appendChild(createTaskBtn);
}

function onCreateTaskBtnClick(){} //TODO: complete funciton

function renderCloseBtn(parentElement, dialogElement) {
    const closeBtn = document.createElement("button");
    closeBtn.innerText = "Close";

    closeBtn.addEventListener("click", () => {
        dialogElement.close();
    })

    parentElement.appendChild(closeBtn);
}



export default renderCreateTaskForm;