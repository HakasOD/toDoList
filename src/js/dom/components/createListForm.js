import ListManager from "../../lists/ListManager";
import sidebar from "./sidebar";
import taskForm from "./todo/taskForm";
import todo from "./todo/todo";

function renderCreateListForm(dialogElement) {
    const createListForm = document.createElement("form");
    createListForm.method = "dialog";
    createListForm.classList.add("create-list-form");

    renderNameInput(createListForm);
    renderCreateListBtn(createListForm);
    renderCloseBtn(createListForm, dialogElement);

    dialogElement.appendChild(createListForm);
    // In future maybe... : Color, faviorites
}

function renderNameInput(formElement) {
    const nameInput = document.createElement("input");

    nameInput.placeholder = "Shopping";
    nameInput.id = "list-name";
    nameInput.type = "text";

    taskForm.renderLabel(formElement, "List name", nameInput.id);
    
    formElement.appendChild(nameInput);
}

function renderCloseBtn(formElement, dialogElement) {
    const closeBtn = document.createElement("button");

    closeBtn.textContent = "Close";

    closeBtn.addEventListener("click", () => {
        onCloseBtnClick(formElement, dialogElement);
    })

    formElement.appendChild(closeBtn);
}

function renderCreateListBtn(formElement) {
    const createListBtn = document.createElement("button");
    createListBtn.textContent = "Create List";

    createListBtn.addEventListener("click", () => {
        onCreateListBtnClick(formElement);
    })

    formElement.appendChild(createListBtn);
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