// Holds tasks 

import Task from "./Task";

class List {
    #name = null;
    #tasks = [];
    #isActive = true;

    constructor(name = null, tasks = []) {
        this.#name = name;
        this.#tasks = tasks;
    }

    get name() {
        return this.#name;
    }

    get tasks() {
        return this.#tasks;
    }

    set name(name) {
        if(name.length > 0) {
            console.error("Name of list must be at least 1 character");
        }
        
        this.#name = name;
    }

    set tasks(tasks) {
        this.#tasks = tasks;
    }

    addTask(task) {
        if(!(task instanceof Task)) {
            console.error("'task' must be of type Task");
        }

        this.#tasks.push(task);
    }

    getTaskByIndex(index) {
        return this.#tasks[index];
    }

    removeTaskByIndex(index) {
        if(index < 0 || index > this.#tasks.length - 1) {
            console.error("Invalid index");
        }

        this.#tasks.splice(index, 1);
    }

    toggleIsActive() {
        this.#isActive = !this.#isActive;
    }

    // Priority sort
    // Date sort
    // Completed sort
}

export default List;