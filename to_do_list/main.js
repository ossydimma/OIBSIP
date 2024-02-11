const addTask = document.getElementById('add-task');
const enteredTask = document.getElementById('entered-task');
const tasksContainer = document.getElementById('tasks-container');
let mydata = [];
console.log(mydata)




//adding event to addTask
addTask.addEventListener("click", addItem);

let storedData = JSON.parse(localStorage.getItem("storedTask")) || [];

window.addEventListener('load', ()=> storedData.length !== 0 ? displayTask() : '')

    


function addItem() {

    // storedData.length > 4 ? tasksContainer.style.overflowY = 'scroll' : tasksContainer.style.overflowY = 'hidden';
   

    //confirming if input contain a value

    if (enteredTask.value == "") {
        alert("Enter a Task");
    } else {
        let lastest = enteredTask.value;
        storedData.push(lastest);
        localStorage.setItem("storedTask", JSON.stringify(storedData));

        
        displayTask();

        
    }

   
}

//  creating a check button
      let btns = document.createElement("div");
      function addButton(item1, item2, item3) {
        //creating a check button
        let checkBtn = document.createElement("button");
        checkBtn.innerHTML = '<i class="fa-solid fa-check"></i>';
        checkBtn.classList.add("check-btn");
        item3.appendChild(checkBtn);
        checkBtn.addEventListener("click", function () {
          item1.style.textDecoration = "line-through";
        });

        //creating a delete button
        let deleteBtn = document.createElement("button");
        deleteBtn.innerHTML = '<i class="fa-solid fa-trash-can"></i>';
        deleteBtn.classList.add("delete-btn");
        item3.appendChild(deleteBtn);
        deleteBtn.addEventListener("click", () => {
            item2.remove();
            storedData = storedData.filter(del => del !== item1.value)
            storedData.length < 1 ? localStorage.removeItem('storedTask') : ''
            
            console.log(storedData)
          
        });
      }


function displayTask() {
    //  let storedData = JSON.parse(localStorage.getItem("storedTask")) || [];

    tasksContainer.hasChildNodes ? (tasksContainer.innerHTML = "") : "";
    storedData.forEach((task) => {

        //creating a div element for new tasks
        let taskBox = document.createElement("div");
        let taskText = document.createElement("div");
        let newTask = document.createElement("input");
        let btns = document.createElement("section");

        taskBox.classList.add("task-box");
        taskText.classList.add("task-text");

        
        addButton(newTask, taskBox, btns)


        newTask.value = task;

        // appending Element
        taskText.appendChild(newTask);
        taskText.appendChild(btns);
        console.log(storedData);
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
                addButton(newTask, taskBox, btns)
                ;
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




