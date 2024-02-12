const addTask = document.getElementById("add-task");
const enteredTask = document.getElementById("entered-task");
const tasksContainer = document.getElementById("tasks-container");
const completed = document.getElementById("completed-tasks");
let mydata = [];
console.log(mydata);

//adding event to addTask
addTask.addEventListener("click", addItem);

let pendingTask = JSON.parse(localStorage.getItem("storedTask")) || [];
let completedTask = JSON.parse(localStorage.getItem("doneTask")) || [];

window.addEventListener("load", () =>
  pendingTask.length !== 0 ? displayTask() : ""
);

function addItem() {
  // pendingTask.length > 4 ? tasksContainer.style.overflowY = 'scroll' : tasksContainer.style.overflowY = 'hidden';

  //confirming if input contain a value

  if (enteredTask.value == "") {
    alert("Enter a Task");
  } else {
    let lastest = enteredTask.value;
    pendingTask.push(lastest);
    localStorage.setItem("storedTask", JSON.stringify(pendingTask));

    displayTask();
  }
}

const handleCompletedTasks = ()=> {
    let lastest = 'hello';
    completedTask.push(lastest);
    localStorage.setItem("doneTask", JSON.stringify(completedTask));

    completed.hasChildNodes ? (tasksContainer.innerHTML = "") : "";
    completedTask.forEach((task) => {
      //creating a div element for new tasks
      const taskBox = document.createElement("div");
      const taskText = document.createElement("div");
      const newTask = document.createElement("input");
      const btns = document.createElement("section");
  
      taskBox.classList.add("task-box");
      taskText.classList.add("task-text");
  
      addButton(newTask, taskBox, btns);
  
      newTask.value = task;
  
      // appending Element
      taskText.appendChild(newTask);
      taskText.appendChild(btns);
      console.log(completedTask);
      taskBox.appendChild(taskText);
      completed.appendChild(taskBox);
  
     
    });


}

// function handleDeleteBtn(store, location, item1, item2, item3) {
//     const deleteBtn = document.createElement("button");
//     deleteBtn.innerHTML = '<i class="fa-solid fa-trash-can"></i>';
//     deleteBtn.classList.add("delete-btn");
//     item3.appendChild(deleteBtn);
//     deleteBtn.addEventListener("click", () => {
//       item2.remove();
//       store = store.filter((del) => del !== item1.value);
//       store.length < 1 ? localStorage.removeItem(location) : "";
  
//       console.log(store);
//     });
// }
//  creating a check button
const btns = document.createElement("div");
function addButton(item1, item2, item3, box) {
  //creating a check button
  const checkBtn = document.createElement("button");
  checkBtn.innerHTML = '<i class="fa-solid fa-check"></i>';
  checkBtn.classList.add("check-btn");
  item3.appendChild(checkBtn);
  checkBtn.addEventListener("click", function () {
    // work here
    // item1.style.textDecoration = "line-through";
    // handleCompletedTasks()
    // item2.remove();
    // pendingTask = pendingTask.filter((del) => del !== item1.value);
    // pendingTask.length < 1 ? localStorage.removeItem("storedTask") : "";
    // completed.appendChild(box);
  });


  //creating a delete button
  const deleteBtn = document.createElement("button");
  deleteBtn.innerHTML = '<i class="fa-solid fa-trash-can"></i>';
  deleteBtn.classList.add("delete-btn");
  item3.appendChild(deleteBtn);
  deleteBtn.addEventListener("click", () => {
    // localStorage.clear()
    item2.remove();
    pendingTask = pendingTask.filter((del) => del !== item1.value);
    pendingTask.length < 1 ? localStorage.removeItem("storedTask") : "";

    console.log(pendingTask);
  });
}

function displayTask() {

  tasksContainer.hasChildNodes ? (tasksContainer.innerHTML = "") : "";
  pendingTask.forEach((task) => {
    //creating a div element for new tasks
    const taskBox = document.createElement("div");
    const taskText = document.createElement("div");
    const newTask = document.createElement("input");
    const btns = document.createElement("section");

    taskBox.classList.add("task-box");
    taskText.classList.add("task-text");

    addButton(newTask, taskBox, btns, taskBox);

    newTask.value = task;

    // appending Element
    taskText.appendChild(newTask);
    taskText.appendChild(btns);
    console.log(pendingTask);
    taskBox.appendChild(taskText);
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

    //increasing input width
    let len = newTask.value;
    enteredTask.value = "";
    if (len.length > 7) {
      newTask.style.width = "120px";
    }
  });
}

enteredTask.addEventListener("keyup", (e) => {
  if (e.key === "Enter") {
    addItem();
  }
});
