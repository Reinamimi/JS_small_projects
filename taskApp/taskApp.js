// Defining UI variables
const form = document.querySelector("#task-form");
const taskInput = document.querySelector("#task");
const filter = document.querySelector("#filter");
const taskList = document.querySelector(".collection");
const clearBtn = document.querySelector(".clear-tasks");

// Load all event listeners
loadEventListeners();

// function loadEventListeners
function loadEventListeners() {
  // for the DOM on load event - get tasks
  document.addEventListener("DOMContentLoaded", getTasks);

  // for the Add task event
  form.addEventListener("submit", addTask);

  // for the Remove task event
  taskList.addEventListener("click", removeTask);

  //   for the clear tasks event
  clearBtn.addEventListener("click", clearTasks);

  // for the filter tasks event
  filter.addEventListener("keyup", filterTasks);
}

function getTasks() {
  let tasks;
  tasks = JSON.parse(localStorage.getItem("tasks")) || [];

  tasks.forEach(function (task) {
    //   Create li element for task list
    const li = document.createElement("li");

    // add class to li for materialize class collection-item
    li.className = "collection-item";

    // create text-node and append task-input to li
    li.appendChild(document.createTextNode(task));

    // create link element for delete action
    const deleteLink = document.createElement("a");

    // add class to deleteLink for materialize class
    deleteLink.className = "delete-item secondary-content";

    // add icon html for delete link
    deleteLink.innerHTML = '<i class="fa fa-remove"></i>';

    // append delete link to li
    li.appendChild(deleteLink);

    // append li to ul
    taskList.appendChild(li);
  });
}

function addTask(e) {
  if (taskInput.value == "") {
    alert("Add a task");
  } else {
    //   Create li element for task list
    const li = document.createElement("li");

    // add class to li for materialize class collection-item
    li.className = "collection-item";

    // create text-node and append task-input to li
    li.appendChild(document.createTextNode(taskInput.value));

    // create link element for delete action
    const deleteLink = document.createElement("a");

    // add class to deleteLink for materialize class
    deleteLink.className = "delete-item secondary-content";

    // add icon html for delete link
    deleteLink.innerHTML = '<i class="fa fa-remove"></i>';

    // append delete link to li
    li.appendChild(deleteLink);

    // append li to ul
    taskList.appendChild(li);

    //   Store task in local storage - FUNCTION CALL
    storeTaskInLocalStorage(taskInput.value);

    // Clear input after
    taskInput.value = "";

    // prevent default form submission
    e.preventDefault();
  }
}

function storeTaskInLocalStorage(task) {
  let tasks;
  // method 1
  /* if (localStorage.getItem('tasks') === null) {
         tasks = [];
     }
    else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
     }
     */

  //  method 2
  tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.push(task);
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function removeTask(e) {
  if (e.target.parentElement.classList.contains("delete-item")) {
    if (confirm("Are you sure?")) {
      e.target.parentElement.parentElement.remove();

      // remove task from localStorage
      removeTaskFromLocalStorage(e.target.parentElement.parentElement);
    }
  }
}

function removeTaskFromLocalStorage(taskItem) {
  let tasks;
  tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.forEach(function (task, index) {
    if (taskItem.textContent === task) {
      tasks.splice(index, 1);
    }
  });

  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function clearTasks(e) {
  // method 1
  // taskList.innerHTML = "";

  // method 2 (faster using a while loop)
  while (taskList.firstChild) {
    taskList.removeChild(taskList.firstChild);
  }

  // clear tasks from localStorage
  clearTasksFromLocalStorage(taskList);
}

function clearTasksFromLocalStorage(tasks) {
  localStorage.removeItem("tasks");
}

function filterTasks(e) {
  // picking search input
  const text = e.target.value.toLowerCase();

  // getting all list items for match with search input
  document.querySelectorAll(".collection-item").forEach(function (task) {
    const item = task.firstChild.textContent;
    if (item.toLowerCase().indexOf(text) != -1) {
      task.style.display = "block";
    } else {
      task.style.display = "none";
    }
  });
}
