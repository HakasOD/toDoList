import List from "./List";

class TodayList extends List {
    constructor(tasks = []) {
        super("Today", tasks);
    }

    get tasks() {
        return this._tasks.filter(task => this.isToday(task.dueDate));
    }


    set tasks(tasks) {
        this._tasks = tasks.filter(task => this.isToday(task.dueDate));
    }

    // Tasks date must be the current day
    addTask(task) {
        let todaysDate = new Date();

        if(todaysDate.toDateString !== task.dueDate.toDateString) {
            console.error("Date of task my be the current day to add to TodayList")
            return null;
        }

        super.addTask(task);
    }

    isToday(date) {
        if(date === null) return;

        console.log(date)
        if(!(date instanceof Date)) {
            console.error("date must be instance of Date");
            return;
        }

        const today = new Date();

        return today.toDateString() === date.toDateString();
    }
}

class UpcomingList extends List {
    constructor(tasks = []) {
        super("Upcoming", tasks);
    }

    get tasks() {
        return this._tasks.filter(task => this.isWithinSevenDays(task.dueDate));
    }

    set tasks(tasks) {
        this._tasks = tasks.filter(task => this.isWithinSevenDays(task.dueDate));
    }

    addTask(task) {
        if(!this.isWithinSevenDays(task.dueDate)) {
            console.error("Task must be within a 7 days of the current date to add to UpcomingList");
            return null;
        }

        super.addTask(task);
    }

    isWithinSevenDays(date) {
        if(date === null) return;

        if(!(date instanceof Date)) {
            console.error("date must be instance of Date");
            return;
        }

        const today = new Date();

        const weekFromToday = new Date(today);
        weekFromToday.setDate(today.getDate() + 7);

        return date >= today && date <= weekFromToday;
    }
}

class AllTasksList extends List {
    constructor(tasks = []) {
        super("All Tasks", tasks);
    }
}

class InboxList extends List {
    constructor(tasks = [], userLists = []) {
        super("Inbox", tasks)

        this._userLists = userLists;
    }

    get tasks() {
        return this.tasks.filter(task => !this.isTaskPartOfUserLists(task));
    }

    get userLists() {
        return this._userLists;
    }

    set tasks(tasks) {
        this._tasks = tasks.filter(task => this.isTaskPartOfUserLists(task));
    }

    set userLists(userLists) {
        this._userLists = userLists;
    }

    
    isTaskPartOfUserLists(task) {
        return this._userLists.includes(task);
    }
}


const defaultLists = {
    today: new TodayList(),
    upcoming: new UpcomingList(),
    allTasks: new AllTasksList(),
    inbox: new InboxList()
}

export default defaultLists;