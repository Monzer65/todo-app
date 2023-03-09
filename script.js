const themeSwitcher = document.querySelector('#theme-switcher');
const todoInput = document.querySelector('.input-text');
const todoList = document.querySelector('.todo-list');
const itemsLeft = document.querySelector('.items-left');
const addTodoBtn = document.querySelector('.input-checkbox');
let allTodoItems = Array.from(document.querySelectorAll('.todo-item')).length;

// switch between dark and light mode:
themeSwitcher.addEventListener('click', () =>{
    if(document.body.classList.contains('dark')){
        themeSwitcher.src = 'images/icon-moon.svg';
    }else{
        themeSwitcher.src = 'images/icon-sun.svg';
    }
    document.body.classList.toggle('dark');
});

// add todo by pressing Enter on keyboard:
window.addEventListener("keydown", (event) => {
    switch (event.key) {
        case "Enter": 
            addTodoBtn.click();
        break;
    };
});

function handleTodo(){
    // add a todo:
    if(todoInput.value == ''){
        return
    }
    let newTodo = document.createElement('li');
    newTodo.className = 'todo-item';
    newTodo.setAttribute('draggable', 'true');
    newTodo.innerHTML = `
    <label class='todo'>
        <span class='text'>${todoInput.value}</span>
        <input type="checkbox" class='chk'>
        <span class="checkmark"><img src="images/icon-check.svg" alt=""></span>
        <img class="delete-btn" src="images/icon-cross.svg" alt="">
    </label>
    <hr>
    `;
    todoList.append(newTodo);
    todoInput.value = '';
    allTodoItems += 1
    updateItems()

    // complete a todo:
    let checkBox = newTodo.querySelector(".chk");
    checkBox.addEventListener('click', ()=>{
        if (checkBox.checked == true){
            newTodo.classList.add('complete')
            allTodoItems -= 1
            updateItems()
        } else {
            newTodo.classList.remove('complete')
            allTodoItems += 1
            updateItems()
        }
    });
    
    // delete a todo item:
    let deleteBtn = newTodo.querySelector('.delete-btn')
    deleteBtn.addEventListener('click', ()=>{
        deleteBtn.closest('.todo-item').remove()
        allTodoItems -= 1
        updateItems()
    });

    // calling the drag and drop function:
    dragAndDrop(todoList);
};

// update the remaining active items:
function updateItems(){
    itemsLeft.innerHTML = `${allTodoItems} items left`;
};

//handle footer buttons (All, Active, Completed, Clear):
const footerbtns = document.querySelector('footer');
const showTodosBtns = footerbtns.querySelectorAll('.active-completed-todos p');
showTodosBtns[0].classList.add('active');
footerbtns.addEventListener('click', function(e){
    const todos = document.querySelectorAll('.todo-item')
        showTodosBtns.forEach(item =>{
            if(item.classList.contains('active')){
                item.classList.remove('active');
            }
            e.target.classList.add('active');
        });
    switch (e.target.innerHTML) {
        case 'All':
            todos.forEach(item =>{
                item.style.display = 'block';
            });
            break;
        case 'Active':
            todos.forEach(item =>{
                item.style.display = 'block';
                if(item.classList.contains('complete')){
                    item.style.display = 'none';
                }
            });
            break;
        case 'Completed':
            todos.forEach(item =>{
                if(document.querySelectorAll('.complete').length == 0){
                    return;
                }
                item.style.display = 'block';
                if(!item.classList.contains('complete')){
                    item.style.display = 'none';
                }
            });
            break;
        case 'Clear Completed':
            todos.forEach(item =>{
                item.style.display = 'block';
                if(item.classList.contains('complete')){
                    item.remove();
                }
            })
            break;
    }
});

// darg & drop
function dragAndDrop (list) {
    let todoItems = list.getElementsByTagName("li"), current = null;
    // drag
    for (let item of todoItems) {
      item.ondragstart = e => {
        current = item;
      };
      item.ondragenter = e => {
        if (item != current) { item.classList.add("active"); }
      };
      item.ondragleave = () => item.classList.remove("active");
      item.ondragend = () => { for (let i of todoItems) {
          i.classList.remove("active");
      }};
      item.ondragover = e => e.preventDefault();
   
      // drop
      item.ondrop = e => {
        e.preventDefault();
        if (item != current) {
          let currentpos = 0, droppedpos = 0;
          for (let i=0; i<todoItems.length; i++) {
            if (current == todoItems[i]) { currentpos = i; }
            if (item == todoItems[i]) { droppedpos = i; }
          }
          if (currentpos < droppedpos) {
            item.parentNode.insertBefore(current, item.nextSibling);
          } else {
            item.parentNode.insertBefore(current, item);
          }
        }
      };
    }
  };
