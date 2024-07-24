
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
    localStorage.setItem(task.title, JSON.stringify(task));
}

function removeItem(name) {
    localStorage.removeItem(name);
}

export default {
    isStorageEmpty,
    storeUserList,
    storeTask,
    removeItem
}
