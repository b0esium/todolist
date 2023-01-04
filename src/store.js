// store class: handles storage

export default class Store {
  static getTasks() {
    let tasks;
    if (localStorage.getItem("tasks") === null) {
      tasks = [];
    } else {
      tasks = JSON.parse(localStorage.getItem("tasks"));
    }
    return tasks;
  }

  static addTask(task) {
    const tasks = Store.getTasks();
    tasks.push(task);
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }

  static deleteTask(IDToRemove) {
    const tasks = Store.getTasks();
    tasks.forEach((task, index) => {
      if (task.taskID === IDToRemove) {
        tasks.splice(index, 1);
      }
    });

    localStorage.setItem("tasks", JSON.stringify(tasks));
  }

  static editTask(IDToEdit, newName, newPriority, newDeadline) {
    const tasks = Store.getTasks();
    tasks.forEach((task, index) => {
      if (task.taskID === IDToEdit) {
        task.name = newName;
        task.priority = newPriority;
        task.deadline = newDeadline;
      }
    });

    localStorage.setItem("tasks", JSON.stringify(tasks));
  }
}
