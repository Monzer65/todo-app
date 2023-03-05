const themeSwitch = document.querySelector('#theme-switch');
const todoInput = document.querySelector('.new-todo-text');
const todoList = document.querySelector('.todo-list');
const itemsLeft = document.querySelector('.items-left');
const addTodoBtn = document.querySelector('.chk')

themeSwitch.addEventListener('click', () =>{
    if(document.body.classList.contains('dark')){
        themeSwitch.src = 'images/icon-moon.svg';
    }else{
        themeSwitch.src = 'images/icon-sun.svg';
    }
    document.body.classList.toggle('dark');
});

window.addEventListener("keydown", (event) => {
    switch (event.key) {
        case "Enter": 
            addTodoBtn.click();
        break;
    };
});

const allItems = [];
function updateItems(){
    itemsLeft.innerHTML = `${allItems.length} items left`
}


function handleTodo(){
    // add todo
    document.querySelector('.chk').checked = false;
    if(todoInput.value == ''){
        return
    };

    // let newHr = document.createElement('hr');
    // newHr.className = 'new-hr';
    let newTodo = document.createElement('label');
    newTodo.className = 'todo';
    newTodo.setAttribute('draggable', 'true');
    newTodo.innerHTML = `
    ${todoInput.value}
    <input type="checkbox" class='chk'>
    <span class="checkmark"><img src="images/icon-check.svg" alt=""></span>
    <img class="delete" src="images/icon-cross.svg" alt="">
    <div class='new-hr'></div>
    `;
    // newTodo.appendChild(newHr);
    todoList.append(newTodo);
    todoInput.value = ''
    allItems.push(newTodo);
    updateItems()
    // darg & drop
    newTodo.addEventListener('dragstart', handleDragStart);
    newTodo.addEventListener('dragover', handleDragOver);
    newTodo.addEventListener('drop', handleDrop);
    function handleDragStart(e) {
        dragSrcEl = this;
        e.dataTransfer.effectAllowed = 'move';
        e.dataTransfer.setData('text/html', this.innerHTML);
    }
    function handleDragOver(e) {
        e.preventDefault();
        return false;
    }
    function handleDrop(e) {
        e.stopPropagation();
        if (dragSrcEl !== this) {
            dragSrcEl.innerHTML = this.innerHTML;
            this.innerHTML = e.dataTransfer.getData('text/html');
          }        
        return false;
    };
    
    // complete todo
    let checkBox = newTodo.querySelector(".chk");
    checkBox.addEventListener('click', ()=>{
        if (checkBox.checked == true){
            newTodo.classList.add('complete')
            allItems.pop(newTodo);
            updateItems()
        } else {
            newTodo.classList.remove('complete')
            allItems.push(newTodo);
            updateItems()
        }
        
    });
    
    // delete todo
    let deleteBtn = newTodo.querySelector('.delete')
    deleteBtn.addEventListener('click', ()=>{
        deleteBtn.parentElement.remove()
        // deleteBtn.closest('.todo').querySelector('.new-hr').remove()
        allItems.pop(newTodo);
        updateItems()
    });

}


