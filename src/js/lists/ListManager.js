import Task from "../tasks/Task";
import List from "./List";
import defaultLists from "./DefaultLists";

let userLists = [];

function listFound(listName) {
    if(isDefaultList(listName)) return true;
    
    if(isUserList(listName)) return true;

    return false;
}

function isDefaultList(listName) {      /// BUG wont be able to find camelCase ones
    listName = listName.toLowerCase();

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

function getListByName(listName) {
    if(!listFound(listName)) return;

    if(isUserList(listName)) {
        return userLists.find(list => list.name === listName);
    }

    return defaultLists[listName];
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
    if(isDefaultList()) {
        console.error("Cannot delete a default list");
        return;
    }

    const list = getListByName(listName);

    userLists.splice(userLists.indexOf(list), 1);

    updateInboxList();
}

function addTaskToList(listName, task) {
    if(!listFound()) {
        console.error("List not found");
        return;
    }

    const list = getListByName(listName);

    list.push(task);    // Maybe problem with it not being same obj??

    updateInboxList();
}

function removeTaskFromList(listName, task) {
    const list = getListByName(listName);

    list.splice(list.indexOf(task), 1);

    updateInboxList();
}

// Change list indexs in userLists
function changeUserListIndex(originalIndex, targetIndex) {
    const targetList = userLists[originalIndex];
    userLists.splice(originalIndex, 1);
    userLists.splice(targetIndex, 1);

    updateInboxList();
}

// Functions to sort userLists 


// Keeps userLists array up to date in the inboxList
function updateInboxList() {
    defaultLists['inbox'].userLists = userLists;
}


export default {
    getAllLists,
    getUserLists, 
    getDefaultLists,
    getListByName,
    createList,
    deleteList,
    addTaskToList,
    removeTaskFromList,
    changeUserListIndex
};