import Task from "./task.js";
import Store from "./store.js";
import UI from "./UI.js";

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
