import Task from "./task.js";
import Store from "./store.js";
import UI from "./UI.js";

let mode = "add";
let editedTaskID = 0;

// event: display tasks on initial load
document.addEventListener("DOMContentLoaded", UI.displayTasks);

// event: add or edit a task
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
    if (mode == "add") {
      // attribute a unique ID to new task
      const tasks = Store.getTasks();
      const taskID = Math.max(...tasks.map((task) => task.taskID), -1) + 1; // find highest existing ID and increment it

      // instantiate task
      const task = new Task(name, priority, deadline, taskID);

      // add task to storage
      Store.addTask(task);

      // add task to UI
      UI.addTaskToList(task);
      UI.showAlert("Task added", "success");

      UI.resetForm();
    } else if (mode == "edit") {
      Store.editTask(editedTaskID, name, priority, deadline);

      // update UI
      UI.displayEditedTask();
      UI.resetForm();
      UI.showAlert("Task edited", "success");

      // switch back to default mode
      mode = "add";
    }
  }
});

// event: remove or edit a task
document.getElementById("task-list").addEventListener("click", (e) => {
  if (e.target.classList.contains("delete")) {
    // remove task from UI
    UI.deleteTask(e.target);

    // remove task from storage
    Store.deleteTask(
      +e.target.parentElement.previousElementSibling.textContent
    ); // find ID in hidden div and convert to number

    // show success message
    UI.showAlert("Task completed", "success");
  } else if (e.target.classList.contains("edit")) {
    mode = "edit";
    // edit task by populating form fields
    UI.editTask(e.target);
    // update editedTaskID to pass into submit button function in edit mode
    editedTaskID =
      +e.target.parentElement.previousElementSibling.previousElementSibling
        .textContent;
  }
});
