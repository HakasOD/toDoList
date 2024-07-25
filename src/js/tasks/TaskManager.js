import Task from "./Task";
import defaultLists from "../lists/DefaultLists";
import ListManager from "../lists/ListManager";
import storage from "../storage";

let allTasks = [];

function getAllTasks() {
    return allTasks;
}

function getActiveTasks() {
    return allTasks.filter(task => !task.isCompleted); 
}

function getCompletedTasks() {
    return allTasks.filter(task => task.isCompleted);
}

function getTaskById(id) {
    const task = allTasks.find(task => task.id === id);

    if(task === undefined) {
        console.error(`Task with id ${id} not found`);
        return null;
    }

    return task;
}

// Task property getters 
function getTitle(id) {
    return getTaskById(id).title;
}

function getId(task) {
    return task.id;
}

function getDescription(id) {
    return getTaskById(id).description;
}

function getDueDate(id) {
    return getTaskById(id).dueDate;
}

function getLocation(id) {
    return getTaskById(id).location;
}

function getPriority(id) {
    return getTaskById(id).priority;
}

function getIsCompleted(id) {
    return getTaskById(id).isCompleted;
}

function getProject(id) {
    return getTaskById(id).project;
}

// Task property setters
function setTitle(title, id) {
    let task = getTaskById(id);
    task.title = title;
    storage.storeTask(task);
}

function setDescription(discription, id) {
    let task = getTaskById(id);
    task.discription = discription;
    storage.storeTask(task);
}

function setDueDate(dueDate, id) {
    let task = getTaskById(id);
    task.dueDate = dueDate;
    storage.storeTask(task);
    updateDefaultLists();
}

function setPriority(priority, id) {
    let task = getTaskById(id);
    task.priority = priority;
    storage.storeTask(task);
}

function setProject(project, id) {
    let task = getTaskById(id);
    task.project = project;
    storage.storeTask(task);
}

function toggleIsCompleted(id) {
    let task = getTaskById(id);
    task.toggleIsCompleted();
    storage.storeTask(task);
    updateDefaultLists();
}

// Task Manegement
function createTask(title) {
    const task = new Task(title);

    allTasks.push(task);

    updateDefaultLists();

    storage.storeTask(task);

    return task;
}

function deleteTask(id) {
    for(let i = 0; i < allTasks.length; i++) {
        if(allTasks[i].id !== id) {
            continue;
        }

        //remove from project
        if(allTasks[i].project !== null) {
            ListManager.removeTaskFromList(allTasks[i].project.name, allTasks[i]);
        }

        storage.removeItem(allTasks[i]);

        allTasks.splice(i, 1);

    }

    updateDefaultLists();
}

function deleteCompletedTasks() {
    allTasks = allTasks.filter((task) => {
        if(task.project !== null && task.isCompleted) {
            ListManager.removeTaskFromList(task.project.name, task);
        }

        if(task.isCompleted) {
            storage.removeItem(task);
        }

        return !task.isCompleted
    });

    updateDefaultLists();
}

function deleteAllTasks() {
    for(task of allTasks) {
        storage.removeItem(task);
    }
    
    allTasks = [];
    updateDefaultLists();
}

// Default list management
function updateDefaultLists() {
    defaultLists.today.tasks = allTasks;
    defaultLists.upcoming.tasks = allTasks;
    defaultLists.allTasks.tasks = allTasks;
    defaultLists.inbox.tasks = allTasks;
}


export default {
    getAllTasks,
    getActiveTasks,
    getCompletedTasks,
    createTask,
    getTaskById,
    setTitle,
    setDescription,
    setDueDate,
    setPriority,
    setProject,
    getTitle,
    getId,
    getProject,
    getDescription,
    getDueDate,
    getLocation,
    getPriority,
    getIsCompleted,
    toggleIsCompleted,
    deleteTask,
    deleteCompletedTasks,
    deleteAllTasks
}
