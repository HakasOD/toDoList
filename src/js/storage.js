import ListManager from "./lists/ListManager";

import TaskManager from "./tasks/TaskManager";

function isStorageEmpty() {
    if(localStorage.length < 1) {
        return true;
    }

    return false;
}

function storeUserList(userList) {
    console.log(userList.tasks)
    localStorage.setItem(userList.id, JSON.stringify(userList));
}

function storeTask(task) {
    localStorage.setItem(task.id , JSON.stringify(task));
}

function removeTask(task) {
    localStorage.removeItem(task.id);
}

function removeList(list) {
    localStorage.removeItem(list.id);
}

function restoreItems() {
    for(let i = 0; i < localStorage.length; i++) {
        let itemJson = localStorage.getItem(localStorage.key(i));
        
        let item = JSON.parse(itemJson);
         
        if(Object.hasOwn(item, "tasks")) {
            ListManager.fromJson(item);
        } else {
            TaskManager.fromJSON(item);
        }

    }

    // Add tasks back to their relevent projects
    for(let i = 0; i < localStorage.length; i++) {
        let itemJson = localStorage.getItem(localStorage.key(i));
        let item = JSON.parse(itemJson);

        // if it is task
        if(Object.hasOwn(item, "projectId")) {
            let projectId = item.projectId;
            let taskId = item.id;
            let task = TaskManager.getTaskById(taskId);

            let userLists = ListManager.getUserLists();
            let correspondingList = userLists.find((userList) => userList.id === projectId);

            if(correspondingList !== undefined){
                ListManager.addTaskToList(correspondingList.name, task);
            }
            
        }
    }
}

export default {
    isStorageEmpty,
    storeUserList,
    storeTask,
    removeTask,
    removeList,
    restoreItems
}
