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

window.addEventListener("load", () => {
  if ((pendingTask.length !== 0 )) {
    displayTask()
  }
  if (completedTask !== 0) {
    handleCompletedTasks()
  }

});

function addItem() {

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
  // localStorage.clear()
  // {store, location,  parent, element, child }
  // completedTask = JSON.parse(localStorage.getItem("doneTask")) 

    completed.hasChildNodes ? (completed.innerHTML = "") : "";
    console.log(completedTask)
    completedTask.forEach((task) => {
      //creating a div element for new tasks
      const taskBox = document.createElement("div");
      const taskText = document.createElement("div");
      const newTask = document.createElement("p");
      const btns = document.createElement("section");
  
      taskBox.classList.add("task-box");
      taskText.classList.add("task-text");
  
      // addButton(newTask, taskBox, btns);
      // const deleteBtn = document.createElement("button");
      // deleteBtn.innerHTML = '<i class="fa-solid fa-trash-can"></i>';
      // deleteBtn.classList.add("delete-btn");
      // btns.appendChild(deleteBtn);


      // deleteBtn.addEventListener("click", () => {
      //   // localStorage.clear()
      //   taskBox.remove();
      //   completedTask = completedTask.filter((del) => del !== newTask.innerText);
      //   localStorage.setItem("doneTask", JSON.stringify(completedTask));
      //   // completedTask.length < 1 ? localStorage.removeItem('doneTask') : "";

      //   console.log(pendingTask);
      // });
      handleDelete(newTask, taskBox, btns, completedTask, 'doneTask')
      newTask.innerText = task;
  
      // appending Element
      taskText.appendChild(newTask);
      taskText.appendChild(btns);
      console.log(completedTask);
      taskBox.appendChild(taskText);
      completed.appendChild(taskBox);
  
     
    });


}

const handleDelete = (newTask, taskBox, btns, store, location) => {
  const deleteBtn = document.createElement("button");
  deleteBtn.innerHTML = '<i class="fa-solid fa-trash-can"></i>';
  deleteBtn.classList.add("delete-btn");
  btns.appendChild(deleteBtn);


  deleteBtn.addEventListener("click", () => {
    // localStorage.clear()
    taskBox.remove();
    store = store.filter((del) => del !== newTask.value);
    localStorage.setItem(`${location}`, JSON.stringify(store));
    // store.length < 1 ? localStorage.removeItem(`${location}`) : "";

    // console.log(pendingTask);
  });
}


//  creating a check button
function addButton(newTask, taskBox, btns) {
  //creating a check button
  const checkBtn = document.createElement("button");
  checkBtn.innerHTML = '<i class="fa-solid fa-check"></i>';
  checkBtn.classList.add("check-btn");
  btns.appendChild(checkBtn);
  checkBtn.addEventListener("click", function () {
    newTask.style.textDecoration = "line-through";
    taskBox.remove();
    pendingTask = pendingTask.filter((del) => del !== newTask.value);
    localStorage.setItem("storedTask", JSON.stringify(pendingTask));

    // pendingTask.length < 1 ? localStorage.removeItem("storedTask") : "";

    completedTask.push(newTask.value);
    localStorage.setItem("doneTask", JSON.stringify(completedTask));
    handleCompletedTasks()
    // completed.appendChild(box);
  });


  //creating a delete button

  handleDelete(newTask, taskBox, btns, pendingTask, 'storedTask')
}

function displayTask() {
  pendingTask = JSON.parse(localStorage.getItem('storedTask'))
  tasksContainer.hasChildNodes ? (tasksContainer.innerHTML = "") : "";
  pendingTask.forEach((task) => {
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
