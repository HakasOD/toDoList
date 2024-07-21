import List from "./List";
import defaultLists from "./DefaultLists";
import TaskManager from "../tasks/TaskManager";

let selectedList = null; // The current list being displayed
let userLists = [];

function listFound(listName) {
    if(isDefaultList(listName)) return true;
    
    if(isUserList(listName)) return true;

    return false;
}

function isDefaultList(listName) {  
    listName = listName.toLowerCase().replaceAll(" ", "");

    for(const listKey in defaultLists) {
        let defaultListName = defaultLists[listKey].name.replaceAll(" ", "").toLowerCase()

        if(defaultListName === listName){
            return true;
        }
    }

    return false;
}

function isUserList(listName) {
    const list = userLists.find(list => list.name === listName);

    if(list === undefined) {
        return false;
    };

    return true;
}

function getAllLists() {
    return [...Object.values(defaultLists), ...userLists];
}

function getUserLists() {
    return userLists;
}

function getDefaultLists() {
    return defaultLists;
}

function getSelectedList() {
    return selectedList;
}

function getListByName(listName) {
    if(!listFound(listName)) return;

    if(isUserList(listName)) {
        return userLists.find(list => list.name === listName);
    }

    listName = listName.toLowerCase().replaceAll(" ", "");

    for(const listKey in defaultLists) {
        let defaultListName = defaultLists[listKey].name.replaceAll(" ", "").toLowerCase();
        //TODO: fix allTasks
        if(defaultListName === listName){
            return defaultLists[listKey];
        }
    }
}

function getListTasks(listName) {
    const list = getListByName(listName);

    return list.tasks;
}

function getUncompletedTasks(listName) {
    return getListByName(listName).uncompletedTasks;
}

function getCompletedTasks(listName) {
    const list = getListByName(listName);
    return list.completedTasks;
}

function setSelectedList(list) {
    selectedList = list;
}

function createList(listName) {
    if(listFound(listName)) {
        console.error("Cannot create a list with the same name as an existing one");
        return;
    }

    const userList = new List(listName);

    userLists.push(userList);

    updateInboxList();
}

// Not sure if deletes all tasks within list???
function deleteList(listName) {
    if(isDefaultList(listName)) {
        console.error("Cannot delete a default list");
        return;
    }

    const list = getListByName(listName);

    userLists.splice(userLists.indexOf(list), 1);

    updateInboxList();
}

function addTaskToList(listName, task) {
    if(!listFound(listName)) {
        console.error("List not found");
        return;
    }

    const list = getListByName(listName);

    console.log(typeof list)
    list.addTask(task);    

    TaskManager.setProject(list, task.id);

    updateInboxList();
}

function removeTaskFromList(listName, task) {
    const list = getListByName(listName);

    list.tasks.splice(list.tasks.indexOf(task), 1);

    TaskManager.setProject(null, task.id);
    
    updateInboxList();
}

// FIXME: Element not changing index
// Change list indexs in userLists
function changeUserListIndex(originalIndex, targetIndex) {
    const placeHolder = {};

    const movingList = userLists[originalIndex];
    userLists.splice(originalIndex, 1, placeHolder);
    userLists.splice(targetIndex, 0, movingList);

    userLists.splice(userLists.indexOf(placeHolder), 1);
    console.log(userLists)
    updateInboxList();
}

// Change task index


// Functions to sort userLists 


// Keeps userLists array up to date in the inboxList
function updateInboxList() {
    defaultLists['inbox'].userLists = userLists;
}

function selectedListIsUserList() {
    return isUserList(selectedList.name);
}

export default {
    getAllLists,
    getUserLists, 
    getDefaultLists,
    getListByName,
    getListTasks,
    getUncompletedTasks,
    getCompletedTasks,
    getSelectedList,
    setSelectedList,
    createList,
    deleteList,
    addTaskToList,
    removeTaskFromList,
    changeUserListIndex,
    selectedListIsUserList
};