// Holds tasks 
import Task from "../tasks/Task";

class List {
    _name = null;
    _tasks = [];

    constructor(name = null, tasks = []) {
        this._name = name;
        this._tasks = tasks;
    }

    get name() {
        return this._name;
    }

    get tasks() {
        return this._tasks;
    }

    get uncompletedTasks() {
        return this._tasks.filter(task => !task.isCompleted);
    }

    get completedTasks() {
        return this._tasks.filter(task => task.isCompleted);
    }

    set name(name) {
        if(name.length < 1) {
            console.error("Name of list must be at least 1 character");
            return
        }
        
        this._name = name;
    }

    set tasks(tasks) {
        this._tasks = tasks;
    }

    addTask(task) {
        if(!(task instanceof Task)) {
            console.error("Must be of type Task");
            return;
        }

        this._tasks.push(task);
    }

    getTaskById(id) {
        for(const task of this._tasks) {
            if(id === task.id) {
                return task;
            }
        }

        console.error(`Task with id: ${id} was not found`);
        return null;
    }

    removeAllCompletedTasks() {
        this._tasks = this._tasks.filter(task => !task.isCompleted);
    }

    removeTaskByIndex(index) {
        if(index < 0 || index > this._tasks.length - 1) {
            console.error("Invalid index");
            return;
        }

        this._tasks.splice(index, 1);
    }

    toggleIsSelected() {
        this._isSelected = !this._isSelected;
    }

    sortByHighestPriority(){
        this._tasks.sort((task1, task2) => {
            return task1.priority - task2.priority;
        })
    }

    sortByClosestDueDate() {
        this._tasks.sort((task1, task2) => {
            return task1.dueDate - task2.dueDate;
        })
    }

    sortByFurthestDueDate() {
        this._tasks.sortByClosestDueDate().reverse();
    }
}

export default List;