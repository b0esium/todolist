import Store from "./store.js";

// UI class: handles UI display

export default class UI {
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
    <td><a href="#" class="btn btn-success btn-sm delete"><i class="fa-solid fa-check"></i></a></td>
    <td><a href="#" class="btn btn-warning btn-sm edit"><i class="fa-regular fa-pen-to-square"></i></a></td>
    `;
    list.appendChild(row);
  }

  static deleteTask(el) {
    el.parentElement.parentElement.remove();
  }

  static editTask(el) {
    document.getElementById("name").value =
      el.parentElement.parentElement.childNodes[1].childNodes[0].textContent;
    document.getElementById("priority").value =
      el.parentElement.parentElement.childNodes[3].childNodes[0].textContent;
    document.getElementById("deadline").value =
      el.parentElement.parentElement.childNodes[5].childNodes[0].textContent;

    // change form button
    document.getElementById("formBtn").value = "Edit task";
    document.getElementById("formBtn").classList.add("text-dark");
    document
      .getElementById("formBtn")
      .classList.replace("btn-info", "btn-warning");
  }

  static displayEditedTask() {
    const list = document.getElementById("task-list");
    while (list.lastChild) {
      list.lastChild.remove();
    }
    UI.displayTasks();
  }

  static showAlert(message, className) {
    const div = document.createElement("div");
    div.className = `alert alert-${className}`;
    div.appendChild(document.createTextNode(message));
    const container = document.querySelector(".col-8");
    const form = document.getElementById("task-form");
    container.insertBefore(div, form);

    // vanish in 2 seconds
    setTimeout(() => document.querySelector(".alert").remove(), 2000);
  }

  static resetForm() {
    document.getElementById("name").value = "";
    document.getElementById("priority").value = "";
    document.getElementById("deadline").value = "";
    // change form button
    document.getElementById("formBtn").value = "Add task";
    document
      .getElementById("formBtn")
      .classList.replace("text-dark", "text-white");
    document
      .getElementById("formBtn")
      .classList.replace("btn-warning", "btn-info");
  }
}
