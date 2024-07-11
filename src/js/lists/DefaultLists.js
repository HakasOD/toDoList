import List from "./List";

class TodayList extends List {
    constructor(tasks = []) {
        super("Today", tasks);
    }

    get tasks() {
        const today = new Date().toISOString().split("T")[0]; // Standardise the date format
        return this._tasks.filter((task) => {
            const taskDayDue = task.dueDate.toISOString().split("T")[0];

            return taskDayDue === today;
        })
    }
}

class UpcomingList extends List {
    constructor(tasks = []) {
        super("Upcoming", tasks);
    }

    get tasks() {
        const today = new Date();

        const weekFromToday = new Date(today);
        weekFromToday.setDate(today.getDate() + 7);

        return this._tasks.filter((task) => {
            const taskDueDate = task.dueDate;
            
            return taskDueDate >= today && taskDueDate <= weekFromToday;
        })
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

        this.userLists = userLists;
    }

    get tasks() {
        return this.tasks.filter(task => this.userLists.includes(task));
    }
}


const defaultLists = {
    today: new TodayList(),
    upcoming: new UpcomingList(),
    allTasks: new AllTasksList(),
    inbox: new InboxList()
}

export default defaultLists;