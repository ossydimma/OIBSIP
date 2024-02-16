const btn = document.querySelectorAll(".button");
const input = document.getElementById("display");
const clear = document.getElementById("bC");
const check = document.getElementById("bplus");
const opreator = document.querySelectorAll('.opreator');
const del = document.querySelector('.button_del');
const buttons = document.getElementById('buttons')

del.addEventListener('click', function clean(){
   let myArray = input.value;
   let x = myArray.slice(0, myArray.length - 1);
   input.value = x;
 })

check.addEventListener("click", function() {
   if (input.value == "") {
      input.value == ""
   } else {
   input.value = eval(input.value);
   }
})

clear.addEventListener("click", function() {
   input.value = "";
})

btn.forEach(button => {
   button.addEventListener('click', function() {      
   input.value += button.innerText;

   const setActive = (e) => {
      Array.from(e.parentElement.children).forEach (sib =>
         sib.classList.remove('update')
         );

         e.classList.add('update');
         

   }
  
   opreator.forEach(btn =>  { 
      btn.addEventListener('click', function() {   
         if (input.value == "") {
            input.value == ""
         } else if (btn.classList.contains('update')) {
            input.value += '';
         }  else {
            input.value += btn.innerText;
         }
         
         setActive(btn)
         let mArray = input.value;
         let last = mArray.slice(-1)
         
         if (last == '+' || '-' || '*' || '/' || ".") {
            console.log('hello')

            input.value == '';
         } else {
            console.log('no')
         }
         
      });
   });

   })
})




