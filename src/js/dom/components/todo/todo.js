import List from "../../../lists/List";
import ListManager from "../../../lists/ListManager";
import renderArrayOfTasks from "./renderTasks";

const todoDiv = document.querySelector("#todos");
// const createTaskBtns = document.querySelectorAll("") //TODO: Bring up create task form
//func takes listname so it can save task to correct list

function clear() {
    todoDiv.innerHTML = "";
}

//TODO: I made each of these functions because I want to make each default 
//list different from a normal one. (at some point in time (probably never))


function renderList(listName) {
    const uncompletedTasks = ListManager.getUncompletedTasks(listName);
    const completedTasks = ListManager.getCompletedTasks(listName)

    const listDiv = document.createElement("div");

    listDiv.id = "todo-list";

    createListHeading(listName, listDiv);

    renderArrayOfTasks(uncompletedTasks, listDiv);
    renderArrayOfTasks(completedTasks, listDiv);

    todoDiv.appendChild(listDiv);

    const userList = ListManager.getListByName(listName);
    ListManager.setSelectedList(userList);
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




export default {
    clear,
    renderList,
    reloadSelectedList
}