
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

export default {
    isStorageEmpty,
    storeUserList,
    storeTask,
    removeTask,
    removeList
}
