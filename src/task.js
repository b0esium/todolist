// task class: represents a Task

export default class Task {
  constructor(name, priority, deadline, taskID) {
    this.name = name;
    this.priority = priority;
    this.deadline = deadline;
    this.taskID = taskID;
  }
}
