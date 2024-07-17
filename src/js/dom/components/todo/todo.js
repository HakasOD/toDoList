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
function renderAllTasksList() {
    const allTasks = ListManager.getListTasks("allTasks");

    const allTasksDiv = document.createElement("div");
    allTasksDiv.id = "all-tasks";

    createListHeading("All Tasks", allTasksDiv);

    renderArrayOfTasks(allTasks, allTasksDiv);

    todoDiv.appendChild(allTasksDiv);

    const allTasksList = ListManager.getListByName("allTasks");
    ListManager.setSelectedList(allTasksList);
}

function renderInboxList() {
    const inboxTasks = ListManager.getListTasks("inbox");

    const inboxDiv = document.createElement("div");
    inboxDiv.id = "inbox";
   
    createListHeading("Inbox", inboxDiv);

    renderArrayOfTasks(inboxTasks, inboxDiv);

    todoDiv.appendChild(inboxDiv);

    const inboxList = ListManager.getListByName("inbox");
    ListManager.setSelectedList(inboxList);
}

function renderTodayList() {
    const todayTasks = ListManager.getListTasks("today");

    const todayDiv = document.createElement("div");
    todayDiv.id = "today";

    createListHeading("Today", todayDiv);

    renderArrayOfTasks(todayTasks, todayDiv);

    todoDiv.appendChild(todayDiv);

    const todayList = ListManager.getListByName("today");
    ListManager.setSelectedList(todayList);
}

function renderUpcomingList() {
    const upcomingTasks = ListManager.getListTasks("upcoming");

    const upcomingDiv = document.createElement("div");
    upcomingDiv.id = "upcoming";

    createListHeading("Upcoming", upcomingDiv);

    renderArrayOfTasks(upcomingTasks, upcomingDiv);

    todoDiv.appendChild(upcomingDiv); 

    const upcomingList = ListManager.getListByName("upcoming");
    ListManager.setSelectedList(upcomingList);
}

function renderUserList(listName) {
    const userListTasks = ListManager.getListTasks(listName);
    const userListDiv = document.createElement("div");

    userListDiv.id = "user-list";

    createListHeading(listName, userListDiv);

    renderArrayOfTasks(userListTasks, userListDiv);

    todoDiv.appendChild(userListDiv);

    const userList = ListManager.getListByName(listName);
    ListManager.setSelectedList(userList);
}

function reloadSelectedList() {
    let selectedList = ListManager.getSelectedList();
    
    if(selectedList === null) return;
    if(selectedList === undefined) return;

    clear();

    switch(selectedList.name) {
        case "All Tasks": 
            renderAllTasksList();
            break;
        case "Today":
            renderTodayList();
            break;
        case "Upcoming":
            renderUpcomingList();
            break;
        case "Inbox":
            renderInboxList();
        default:
            renderUserList(selectedList.name);
    }
}

function createListHeading(title, parentElement) {
    const heading = document.createElement("h1");
    heading.innerText = title;
    parentElement.appendChild(heading);
}

export default {
    clear,
    renderAllTasksList,
    renderInboxList, 
    renderTodayList,
    renderUpcomingList,
    renderUserList,
    reloadSelectedList
}