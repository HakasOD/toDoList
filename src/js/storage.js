import Task from "./tasks/Task";
import TaskManager from "./tasks/TaskManager";

function isStorageEmpty() {
    if(localStorage.length < 1) {
        return true;
    }

    return false;
}

function storeUserList(userList) {
    localStorage.setItem(userList.name, JSON.stringify(userList));
}

function storeTask(task) {
    localStorage.setItem(task.id , JSON.stringify(task));
}

function removeTask(task) {
    localStorage.removeItem(task.id);
}

function removeList(list) {
    localStorage.removeItem(list.name);
}


function restoreItems() {
    for(let i = 0; i < localStorage.length; i++) {
        let itemJson = localStorage.getItem(localStorage.key(i));
        
        let item = JSON.parse(itemJson);

        if(Object.hasOwn(item, "id")) {
            console.log(item)

            TaskManager.fromJSON(item);
            
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
