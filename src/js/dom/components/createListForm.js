import ListManager from "../../lists/ListManager";
import sidebar from "./sidebar";
import taskForm from "./todo/taskForm";
import todo from "./todo/todo";

function renderCreateListForm(dialogElement) {
    const createListForm = document.createElement("form");
    createListForm.method = "dialog";
    createListForm.classList.add("create-list-form");
    createListForm.classList.add("task-form");
    
    renderNameInput(createListForm);

    const buttonDiv = document.createElement("div");
    buttonDiv.classList.add("button-div");

    renderCreateListBtn(createListForm, buttonDiv);
    renderCloseBtn(createListForm, dialogElement, buttonDiv);

    dialogElement.appendChild(createListForm);
    // In future maybe... : Color, faviorites
}

function renderNameInput(formElement) {
    const nameDiv = document.createElement("div");
    
    const nameInput = document.createElement("input");

    nameInput.placeholder = "Shopping";
    nameInput.id = "list-name";
    nameInput.type = "text";
    nameInput.required = true;

    taskForm.renderLabel(nameDiv, "List name", nameInput.id);
   
    nameDiv.appendChild(nameInput);
    formElement.appendChild(nameDiv);
}

function renderCloseBtn(formElement, dialogElement, buttonDiv) {
    const closeBtn = document.createElement("button");

    closeBtn.textContent = "Close";

    closeBtn.addEventListener("click", () => {
        onCloseBtnClick(formElement, dialogElement);
    })

    buttonDiv.appendChild(closeBtn);
    formElement.appendChild(buttonDiv);
}

function renderCreateListBtn(formElement, buttonDiv) {
    const createListBtn = document.createElement("button");
    createListBtn.textContent = "Create List";
    
    createListBtn.addEventListener("click", () => {
        onCreateListBtnClick(formElement);
    })

    buttonDiv.appendChild(createListBtn);
    formElement.appendChild(buttonDiv);
}

function onCreateListBtnClick(formElement) {
    const listName = formElement.querySelector("#list-name").value;

    ListManager.createList(listName);

    sidebar.renderUserListBtn(listName);

    formElement.reset();

    todo.clear();
    todo.renderList(listName);
}

function onCloseBtnClick(formElement, dialogElement) {
    formElement.reset();
    dialogElement.close();
}

export default {
    renderCreateListForm
}