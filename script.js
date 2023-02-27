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


function handleTodo(){
    

    // add todo
    document.querySelector('.chk').checked = false;
    if(todoInput.value == ''){
        return
    };
    let items = todoList.querySelectorAll('.todo').length+1;
    function updateItemsLeft(){
        itemsLeft.innerHTML = `${items} items left`
    }
    updateItemsLeft()
    let newHr = document.createElement('hr');
    newHr.className = 'new-hr';
    todoList.append(newHr);
    let newTodo = document.createElement('label');
    newTodo.className = 'todo';
    newTodo.setAttribute('draggable', 'true');
    newTodo.innerHTML = `
    ${todoInput.value}
    <input type="checkbox" class='chk'>
    <span class="checkmark"><img src="images/icon-check.svg" alt=""></span>
    <img class="delete" src="images/icon-cross.svg" alt="">`;
    todoList.append(newTodo);

    // darg & drop
    newTodo.addEventListener('dragstart', handleDragStart);
    // newTodo.addEventListener('dragend', handleDragEnd);
    newTodo.addEventListener('dragover', handleDragOver);
    // newTodo.addEventListener('dragenter', handleDragEnter);
    // newTodo.addEventListener('dragleave', handleDragLeave);
    newTodo.addEventListener('drop', handleDrop);

    function handleDragStart(e) {
        // this.style.opacity = '..4';
        dragSrcEl = this;
        e.dataTransfer.effectAllowed = 'move';
        e.dataTransfer.setData('text/html', this.innerHTML);
    }
    // function handleDragEnd(e) {
    //     this.style.opacity = '1';
    // }
    function handleDragOver(e) {
        e.preventDefault();
        return false;
    }
    // function handleDragEnter(e) {
    //     this.classList.add('over');
    // }
    // function handleDragLeave(e) {
    //     this.classList.remove('over');
    // }
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
        } else {
            newTodo.classList.remove('complete')
        }
    });
    
    // delete todo
    newTodo.querySelector('.delete').addEventListener('click', ()=>{
        newTodo.remove()
        newHr.remove()
    });
}


