// task class: represents a Task
class Task {
  constructor(name, priority, deadline) {
    this.name = name;
    this.priority = priority;
    this.deadline = deadline;
  }
}

// UI class: handles UI display
class UI {
  static displayTasks() {
    const StoredTasks = [
      {
        name: "Call Mum",
        priority: "high",
        deadline: "01/02/2023",
      },
      {
        name: "Mow lawn",
        priority: "medium",
        deadline: "15/02/2023",
      },
    ];

    const tasks = StoredTasks;
    tasks.forEach((task) => UI.addTaskToList(task));
  }

  static addTaskToList(task) {
    const list = document.getElementById("task-list");
    const row = document.createElement("tr");
    row.innerHTML = `
    <td>${task.name}</td>
    <td>${task.priority}</td>
    <td>${task.deadline}</td>
    <td><a href="#" class="btn btn-danger">X</a></td>
    `;
    list.appendChild(row);
  }
}

// store class: handles storage

// event: display tasks
document.addEventListener("DOMContentLoaded", UI.displayTasks);

// event: add a task
document.getElementById("task-form").addEventListener("submit", (e) => {
  e.preventDefault;

  // get form values
  const name = document.getElementById("name").value;
  const priority = document.getElementById("priority").value;
  const deadline = document.getElementById("deadline").value;

  // instantiate task
  const task = new Task(name, priority, deadline);

  // add task to UI
  UI.addTaskToList(task);
});

// event : remove a task
