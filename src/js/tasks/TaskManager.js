import Task from "./Task";

const tasks = [];

function getTasks() {
    return tasks;
}

function getActiveTasks() {
    return tasks.filter(task => !task.isCompleted); 
}

function getCompletedTasks() {
    return tasks.filter(task => task.isCompleted);
}

function getTaskById(id) {
    const task = tasks.find(task => task.id === id);

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

// Task property setters
function setTitle(title, id) {
    getTaskById(id).title = title;
}

function setDescription(discription, id) {
    getTaskById(id).description = discription;
}

function setDueDate(dueDate, id) {
    getTaskById(id).dueDate = dueDate;
}

function setPriority(priority, id) {
    getTaskById(id).priority = priority;
}

function toggleIsCompleted(id) {
    getTaskById(id).toggleIsCompleted;
}

// Task Manegement
function createTask(title) {
    const task = new Task(title);

    tasks.push(task);
}

function deleteTask(id) {
    for(let i = 0; i < tasks.length; i++) {
        if(tasks[i].id === id) {
            tasks.splice(i, 1);
        }
    }
}

function deleteCompletedTasks() {
    tasks = tasks.filter(task => !task.isCompleted);
}


export default {
    getTasks,
    getActiveTasks,
    getCompletedTasks,
    createTask,
    getTaskById,
    setTitle,
    setDescription,
    setDueDate,
    setPriority,
    getTitle,
    getDescription,
    getDueDate,
    getLocation,
    getPriority,
    getIsCompleted,
    toggleIsCompleted,
    deleteTask,
    deleteCompletedTasks
}
