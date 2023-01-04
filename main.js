/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/UI.js":
/*!*******************!*\
  !*** ./src/UI.js ***!
  \*******************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ UI)\n/* harmony export */ });\n/* harmony import */ var _store_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./store.js */ \"./src/store.js\");\n\n\n// UI class: handles UI display\n\nclass UI {\n  static displayTasks() {\n    const tasks = _store_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"].getTasks();\n    tasks.forEach((task) => UI.addTaskToList(task));\n  }\n\n  static addTaskToList(task) {\n    const list = document.getElementById(\"task-list\");\n    const row = document.createElement(\"tr\");\n    row.innerHTML = `\n    <td>${task.name}</td>\n    <td>${task.priority}</td>\n    <td>${task.deadline}</td>\n    <td hidden>${task.taskID}</td>\n    <td><a href=\"#\" class=\"btn btn-success btn-sm delete\"><i class=\"fa-regular fa-check\"></i></a></td>\n    <td><a href=\"#\" class=\"btn btn-warning btn-sm edit\"><i class=\"fa-regular fa-pen-to-square\"></i></a></td>\n    `;\n    list.appendChild(row);\n  }\n\n  static deleteTask(el) {\n    el.parentElement.parentElement.remove();\n  }\n\n  static editTask(el) {\n    document.getElementById(\"name\").value =\n      el.parentElement.parentElement.childNodes[1].childNodes[0].textContent;\n    document.getElementById(\"priority\").value =\n      el.parentElement.parentElement.childNodes[3].childNodes[0].textContent;\n    document.getElementById(\"deadline\").value =\n      el.parentElement.parentElement.childNodes[5].childNodes[0].textContent;\n\n    // change form button\n    document.getElementById(\"formBtn\").value = \"Edit task\";\n    document.getElementById(\"formBtn\").classList.add(\"text-dark\");\n    document\n      .getElementById(\"formBtn\")\n      .classList.replace(\"btn-info\", \"btn-warning\");\n  }\n\n  static displayEditedTask() {\n    const list = document.getElementById(\"task-list\");\n    while (list.lastChild) {\n      list.lastChild.remove();\n    }\n    UI.displayTasks();\n  }\n\n  static showAlert(message, className) {\n    const div = document.createElement(\"div\");\n    div.className = `alert alert-${className}`;\n    div.appendChild(document.createTextNode(message));\n    const container = document.querySelector(\".col-8\");\n    const form = document.getElementById(\"task-form\");\n    container.insertBefore(div, form);\n\n    // vanish in 2 seconds\n    setTimeout(() => document.querySelector(\".alert\").remove(), 2000);\n  }\n\n  static resetForm() {\n    document.getElementById(\"name\").value = \"\";\n    document.getElementById(\"priority\").value = \"\";\n    document.getElementById(\"deadline\").value = \"\";\n    // change form button\n    document.getElementById(\"formBtn\").value = \"Add task\";\n    document\n      .getElementById(\"formBtn\")\n      .classList.replace(\"text-dark\", \"text-white\");\n    document\n      .getElementById(\"formBtn\")\n      .classList.replace(\"btn-warning\", \"btn-info\");\n  }\n}\n\n\n//# sourceURL=webpack://todolist/./src/UI.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _task_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./task.js */ \"./src/task.js\");\n/* harmony import */ var _store_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./store.js */ \"./src/store.js\");\n/* harmony import */ var _UI_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./UI.js */ \"./src/UI.js\");\n\n\n\n\nlet mode = \"add\";\nlet editedTaskID = 0;\n\n// event: display tasks on initial load\ndocument.addEventListener(\"DOMContentLoaded\", _UI_js__WEBPACK_IMPORTED_MODULE_2__[\"default\"].displayTasks);\n\n// event: add or edit a task\ndocument.getElementById(\"task-form\").addEventListener(\"submit\", (e) => {\n  e.preventDefault();\n\n  // get form values\n  const name = document.getElementById(\"name\").value;\n  const priority = document.getElementById(\"priority\").value;\n  const deadline = document.getElementById(\"deadline\").value;\n\n  // validate\n  if (name === \"\" || priority === \"\" || deadline === \"\") {\n    _UI_js__WEBPACK_IMPORTED_MODULE_2__[\"default\"].showAlert(\"Please fill in all fields\", \"danger\");\n  } else {\n    if (mode == \"add\") {\n      // attribute a unique ID to new task\n      const tasks = _store_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"].getTasks();\n      const taskID = Math.max(...tasks.map((task) => task.taskID), -1) + 1; // find highest existing ID and increment it\n\n      // instantiate task\n      const task = new _task_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"](name, priority, deadline, taskID);\n\n      // add task to storage\n      _store_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"].addTask(task);\n\n      // add task to UI\n      _UI_js__WEBPACK_IMPORTED_MODULE_2__[\"default\"].addTaskToList(task);\n      _UI_js__WEBPACK_IMPORTED_MODULE_2__[\"default\"].showAlert(\"Task added\", \"success\");\n\n      _UI_js__WEBPACK_IMPORTED_MODULE_2__[\"default\"].resetForm();\n    } else if (mode == \"edit\") {\n      _store_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"].editTask(editedTaskID, name, priority, deadline);\n\n      // update UI\n      _UI_js__WEBPACK_IMPORTED_MODULE_2__[\"default\"].displayEditedTask();\n      _UI_js__WEBPACK_IMPORTED_MODULE_2__[\"default\"].resetForm();\n      _UI_js__WEBPACK_IMPORTED_MODULE_2__[\"default\"].showAlert(\"Task edited\", \"success\");\n\n      // switch back to default mode\n      mode = \"add\";\n    }\n  }\n});\n\n// event: remove or edit a task\ndocument.getElementById(\"task-list\").addEventListener(\"click\", (e) => {\n  if (e.target.classList.contains(\"delete\")) {\n    // remove task from UI\n    _UI_js__WEBPACK_IMPORTED_MODULE_2__[\"default\"].deleteTask(e.target);\n\n    // remove task from storage\n    _store_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"].deleteTask(\n      +e.target.parentElement.previousElementSibling.textContent\n    ); // find ID in hidden div and convert to number\n\n    // show success message\n    _UI_js__WEBPACK_IMPORTED_MODULE_2__[\"default\"].showAlert(\"Task completed\", \"success\");\n  } else if (e.target.classList.contains(\"edit\")) {\n    mode = \"edit\";\n    // edit task by populating form fields\n    _UI_js__WEBPACK_IMPORTED_MODULE_2__[\"default\"].editTask(e.target);\n    // update editedTaskID to pass into submit button function in edit mode\n    editedTaskID =\n      +e.target.parentElement.previousElementSibling.previousElementSibling\n        .textContent;\n  }\n});\n\n\n//# sourceURL=webpack://todolist/./src/index.js?");

/***/ }),

/***/ "./src/store.js":
/*!**********************!*\
  !*** ./src/store.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Store)\n/* harmony export */ });\n// store class: handles storage\n\nclass Store {\n  static getTasks() {\n    let tasks;\n    if (localStorage.getItem(\"tasks\") === null) {\n      tasks = [];\n    } else {\n      tasks = JSON.parse(localStorage.getItem(\"tasks\"));\n    }\n    return tasks;\n  }\n\n  static addTask(task) {\n    const tasks = Store.getTasks();\n    tasks.push(task);\n    localStorage.setItem(\"tasks\", JSON.stringify(tasks));\n  }\n\n  static deleteTask(IDToRemove) {\n    const tasks = Store.getTasks();\n    tasks.forEach((task, index) => {\n      if (task.taskID === IDToRemove) {\n        tasks.splice(index, 1);\n      }\n    });\n\n    localStorage.setItem(\"tasks\", JSON.stringify(tasks));\n  }\n\n  static editTask(IDToEdit, newName, newPriority, newDeadline) {\n    const tasks = Store.getTasks();\n    tasks.forEach((task, index) => {\n      if (task.taskID === IDToEdit) {\n        task.name = newName;\n        task.priority = newPriority;\n        task.deadline = newDeadline;\n      }\n    });\n\n    localStorage.setItem(\"tasks\", JSON.stringify(tasks));\n  }\n}\n\n\n//# sourceURL=webpack://todolist/./src/store.js?");

/***/ }),

/***/ "./src/task.js":
/*!*********************!*\
  !*** ./src/task.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Task)\n/* harmony export */ });\n// task class: represents a Task\n\nclass Task {\n  constructor(name, priority, deadline, taskID) {\n    this.name = name;\n    this.priority = priority;\n    this.deadline = deadline;\n    this.taskID = taskID;\n  }\n}\n\n\n//# sourceURL=webpack://todolist/./src/task.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;