// task class: represents a Task
class Task {
  constructor(name, priority, deadline, taskID) {
    this.name = name;
    this.priority = priority;
    this.deadline = deadline;
    this.taskID = taskID;
  }
}

// UI class: handles UI display
class UI {
  static displayTasks() {
    const tasks = Store.getTasks();
    tasks.forEach((task) => UI.addTaskToList(task));
  }

  static addTaskToList(task) {
    const list = document.getElementById("task-list");
    const row = document.createElement("tr");
    row.innerHTML = `
    <td>${task.name}</td>
    <td>${task.priority}</td>
    <td>${task.deadline}</td>
    <td hidden>${task.taskID}</td>
    <td><a href="#" class="btn btn-danger btn-sm delete">X</a></td>
    `;
    list.appendChild(row);
  }

  static deleteTask(el) {
    // if clicked on remove button
    if (el.classList.contains("delete")) {
      el.parentElement.parentElement.remove();
    }
  }

  static showAlert(message, className) {
    const div = document.createElement("div");
    div.className = `alert alert-${className}`;
    div.appendChild(document.createTextNode(message));
    const container = document.querySelector(".container");
    const form = document.getElementById("task-form");
    container.insertBefore(div, form);

    // vanish in 2 seconds
    setTimeout(() => document.querySelector(".alert").remove(), 2000);
  }

  static clearFields() {
    document.getElementById("name").value = "";
    document.getElementById("priority").value = "";
    document.getElementById("deadline").value = "";
  }
}

// store class: handles storage
class Store {
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
}

// event: display tasks
document.addEventListener("DOMContentLoaded", UI.displayTasks);

// event: add a task
document.getElementById("task-form").addEventListener("submit", (e) => {
  e.preventDefault();

  // get form values
  const name = document.getElementById("name").value;
  const priority = document.getElementById("priority").value;
  const deadline = document.getElementById("deadline").value;

  // validate
  if (name === "" || priority === "" || deadline === "") {
    UI.showAlert("Please fill in all fields", "danger");
  } else {
    // attribute a unique ID to new task
    const tasks = Store.getTasks();
    const taskID = Math.max(...tasks.map((task) => task.taskID), -1) + 1; // find highest existing ID and increment it

    // instantiate task
    const task = new Task(name, priority, deadline, taskID);

    // add task to UI
    UI.addTaskToList(task);

    // add task to storage
    Store.addTask(task);

    // show success message
    UI.showAlert("Task added", "success");

    // clear fields
    UI.clearFields();
  }
});

// event : remove a task
document.getElementById("task-list").addEventListener("click", (e) => {
  // remove task from UI
  UI.deleteTask(e.target);

  // remove task from storage
  Store.deleteTask(+e.target.parentElement.previousElementSibling.textContent); // convert to number

  // show success message
  UI.showAlert("Task removed", "success");
});
