class Task {
    #title;
    #discription = null;
    #dueDate = null;
    #location = null;
    #priority = 0;
    #isCompleted = false;

    constructor(title) {
        this.#title = title;
    }

    get title() {
        return this.#title;
    }

    get discription() {
        return this.#discription;
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

    set title(title) {
        if(title.length > 0) {
            this.#title = title;
        } else {
            console.error("Title must be at least 1 character");
        }
    }

    set discription(discription) {
        this.#discription = discription
    }

    set dueDate(dueDate) {
        this.#dueDate = dueDate;
    }

    set location(location) {
        this.#location = location;
    }

    set priority(priority) {
        this.#priority = priority;
    }

    toggleIsCompleted() {
        this.#isCompleted = !this.#isCompleted;
    }
}

export default Task