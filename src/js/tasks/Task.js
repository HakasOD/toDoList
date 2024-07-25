import { v4 as uuidv4 } from "uuid";

class Task {
    #id;
    #title = null;
    #description = null;
    #dueDate = null;
    #location = null;
    #priority = "Medium";
    #isCompleted = false;
    #project = null;

    constructor(title) {
        this.#title = title;
        this.#id = uuidv4();
    }

    get id() {
        return this.#id;
    }
    
    get title() {
        return this.#title;
    }

    get description() {
        return this.#description;
    }

    get dueDate() {
        return this.#dueDate;
    }

    get location() {
        return this.#location;
    }

    get priority() {
        return this.#priority;
    }

    get isCompleted() {
        return this.#isCompleted;
    }

    get project() {
        return this.#project
    }

    set title(title) {
        if(title.length < 1) {
            console.error("Title must be at least 1 character");
            return
        }

        this.#title = title;        
    }

    set description(description) {
        this.#description = description
    }

    set dueDate(dueDate) {
        if(dueDate !== null && !(dueDate instanceof Date)) {
            console.error("Due date must either be null or a Date object");
        }

        this.#dueDate = dueDate;
    }

    set location(location) {
        this.#location = location;
    }

    set priority(priority) {
        this.#priority = priority;
    }

    set project(project) {
        this.#project = project;
    }
    
    toggleIsCompleted() {
        this.#isCompleted = !this.#isCompleted;
    }

    toJSON() {
        return {
            title: this.#title,
            id: this.#id,
            discription: this.#description,
            dueDate: this.#dueDate,
            priority: this.#priority,
            project: this.#project,
            isCompleted: this.#isCompleted
        }
    }

    static fromJSON(obj) {
        let instance = new this(obj.title);
        
        instance.#description = obj.discription;
        instance.#dueDate = obj.dueDate;
        instance.#id = obj.id;
        instance.#isCompleted = obj.isCompleted;
        instance.#project = obj.project;
        instance.#priority = obj.priority;

        return instance;
    }
}

export default Task