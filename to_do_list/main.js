const addTask = document.getElementById("add-task");
const enteredTask = document.getElementById("entered-task");
const tasksContainer = document.getElementById("tasks-container");
const completed = document.getElementById("completed-tasks");

window.addEventListener("load", () => {
  if (pendingTask.length !== 0) {
    displayTask();
  }
  if (completedTask !== 0) {
    handleCompletedTasks();
  }
});

//adding event to addTask
addTask.addEventListener("click", () => {
  if (enteredTask.value == "") {
    alert("Enter a Task");
  } else {
    let data = {
      title: enteredTask.value,
      time: now.toLocaleTimeString([], {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      }),
    };

    pendingTask.push(data);
    localStorage.setItem("storedTask", JSON.stringify(pendingTask));

    displayTask();
  }
});

let pendingTask = JSON.parse(localStorage.getItem("storedTask")) || [];
let completedTask = JSON.parse(localStorage.getItem("doneTask")) || [];
const now = new Date();

const handleCompletedTasks = () => {
  
  completedTask = JSON.parse(localStorage.getItem("doneTask")) || [];

  completed.hasChildNodes ? (completed.innerHTML = "") : "";
  completedTask.forEach((task) => {
    //creating a div element for new tasks
    const taskBox = document.createElement("div");
    const taskText = document.createElement("div");
    const newTask = document.createElement("p");
    const btns = document.createElement("section");

    taskBox.classList.add("task-box");
    taskText.classList.add("task-text");

    taskBox.style.justifyContent = "center";

    handleDeletBtn(newTask, taskBox, btns, completedTask, "doneTask");

    newTask.innerText = task;
    // appending Element
    taskText.appendChild(newTask);
    taskBox.appendChild(taskText);
    taskBox.appendChild(btns);
    console.log(pendingTask);
    completed.appendChild(taskBox);
  });
};

const handleDeletBtn = (newTask, taskBox, btns, store, location) => {
  const deleteBtn = document.createElement("button");
  deleteBtn.innerHTML = '<i class="fa-solid fa-trash-can"></i>';
  deleteBtn.classList.add("delete-btn");
  btns.appendChild(deleteBtn);

  deleteBtn.addEventListener("click", () => {
    taskBox.remove();
    if (store === pendingTask) {
      store = store.filter((del) => del.title !== newTask.innerText);
    } else
      store === pendingTask
        ? (store = store.filter((del) => del.title !== newTask.innerText))
        : (store = store.filter((del) => del !== newTask.innerText));
    localStorage.setItem(`${location}`, JSON.stringify(store));
  });
};

function addButton(newTask, taskBox, btns) {
  //creating a check button

  const checkBtn = document.createElement("button");
  checkBtn.innerHTML = '<i class="fa-solid fa-check"></i>';
  checkBtn.classList.add("check-btn");
  btns.appendChild(checkBtn);
  checkBtn.addEventListener("click", function () {
    newTask.style.textDecoration = "line-through";
    taskBox.remove();
    pendingTask = pendingTask.filter((del) => del.title !== newTask.innerText);
    localStorage.setItem("storedTask", JSON.stringify(pendingTask));

    completedTask.push(newTask.innerText);
    localStorage.setItem("doneTask", JSON.stringify(completedTask));
    handleCompletedTasks();
  });

  handleDeletBtn(newTask, taskBox, btns, pendingTask, "storedTask");
}

function displayTask() {
  
  pendingTask = JSON.parse(localStorage.getItem("storedTask")) || [];
  tasksContainer.hasChildNodes ? (tasksContainer.innerHTML = "") : "";
  pendingTask.forEach((task) => {
    //creating a div element for new tasks
    const taskBox = document.createElement("div");
    const taskText = document.createElement("div");
    const time = document.createElement("span");
    const newTask = document.createElement("p");
    const btns = document.createElement("section");

    taskBox.classList.add("task-box");
    taskText.classList.add("task-text");

    addButton(newTask, taskBox, btns, task);

    newTask.contentEditable = true;
    (newTask.innerText = task.title),
      (time.innerText = task.time),
      // appending Element
      taskBox.appendChild(time);
    taskText.appendChild(newTask);
    taskBox.appendChild(taskText);
    taskBox.appendChild(btns);
    console.log(pendingTask);
    tasksContainer.appendChild(taskBox);

    //editting task
    newTask.addEventListener("click", () => {
      btns.innerHTML = "";
      newTask.style.textDecoration = "none";

      //creating editting button
      let editBtn = document.createElement("button");
      editBtn.innerText = "+";
      editBtn.classList.add("add-task");
      btns.appendChild(editBtn);

      //adding event to edit button
      editBtn.addEventListener("click", () => {
        btns.innerHTML = "";
        addButton(newTask, taskBox, btns);
      });
    });
  });
  enteredTask.value = "";
}
