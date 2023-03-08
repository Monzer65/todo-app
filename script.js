const themeSwitcher = document.querySelector('#theme-switcher');
const todoInput = document.querySelector('.input-text');
const todoList = document.querySelector('.todo-list');
const itemsLeft = document.querySelector('.items-left');
const addTodoBtn = document.querySelector('.chk')

themeSwitcher.addEventListener('click', () =>{
    if(document.body.classList.contains('dark')){
        themeSwitcher.src = 'images/icon-moon.svg';
    }else{
        themeSwitcher.src = 'images/icon-sun.svg';
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
    let newTodo = document.createElement('label');
    newTodo.className = 'todo';
    newTodo.setAttribute('draggable', 'true');
    newTodo.innerHTML = `
    ${todoInput.value}
    <input type="checkbox" class='chk'>
    <span class="checkmark"><img src="images/icon-check.svg" alt=""></span>
    <img class="delete-btn" src="images/icon-cross.svg" alt="">
    <div class='horizontal-border'></div>
    `;
    todoList.append(newTodo);
    todoInput.value = '';
    allItems.push(1);
    updateItems()
    
    // complete todo
    let checkBox = newTodo.querySelector(".chk");
    checkBox.addEventListener('click', ()=>{
        if (checkBox.checked == true){
            newTodo.classList.add('complete')
            allItems.pop(1);
            updateItems()
        } else {
            newTodo.classList.remove('complete')
            allItems.push(1);
            updateItems()
        }
    });
    
    // delete todo
    let deleteBtn = newTodo.querySelector('.delete-btn')
    deleteBtn.addEventListener('click', ()=>{
        deleteBtn.parentElement.remove()
        if(newTodo.classList.contains('complete')){
            allItems.pop(1)
        }
        if(itemsLeft.innerHTML = `0 items left`){
            return
        }
        updateItems()
    });
    slist(sortableList);
};

//footer buttons
const footerbtns = document.querySelector('footer')
const showTodosBtns = footerbtns.querySelectorAll('.show-todos p')
showTodosBtns[0].classList.add('active')

footerbtns.addEventListener('click', function(e){
    const todos = document.querySelectorAll('.todo')
        showTodosBtns.forEach(item =>{
            if(item.classList.contains('active')){
                item.classList.remove('active')
            }
            e.target.classList.add('active')
        });
    switch (e.target.innerHTML) {
        case 'All':
            todos.forEach(item =>{
                item.style.display = 'flex'
            })
            break;
        case 'Active':
            todos.forEach(item =>{
                item.style.display = 'flex'
                if(item.classList.contains('complete')){
                    item.style.display = 'none'
                }
            })
            break;
        case 'Completed':
            todos.forEach(item =>{
                if(document.querySelectorAll('.complete').length == 0){
                    console.log('lesasa')
                    return
                }
                item.style.display = 'flex'
                if(!item.classList.contains('complete')){
                    item.style.display = 'none'
                }
            })
            break;
        case 'Clear Completed':
            todos.forEach(item =>{
                item.style.display = 'flex'
                if(item.classList.contains('complete')){
                    item.remove()
                }
            })
            break;
    }
});


// darg & drop
const sortableList = document.querySelector(".todo-list");
function slist (target) {
    // (A) SET CSS + GET ALL LIST ITEMS
    target.classList.add("slist");
    let items = target.getElementsByTagName("label"), current = null;
  
    // (B) MAKE ITEMS DRAGGABLE + SORTABLE
    for (let i of items) {
      // (B1) ATTACH DRAGGABLE
      i.draggable = true;
      
      // (B2) DRAG START - YELLOW HIGHLIGHT DROPZONES
      i.ondragstart = e => {
        current = i;
        for (let it of items) {
          if (it != current) { it.classList.add("hint"); }
        }
      };
      
      // (B3) DRAG ENTER - RED HIGHLIGHT DROPZONE
      i.ondragenter = e => {
        if (i != current) { i.classList.add("active"); }
      };
  
      // (B4) DRAG LEAVE - REMOVE RED HIGHLIGHT
      i.ondragleave = () => i.classList.remove("active");
  
      // (B5) DRAG END - REMOVE ALL HIGHLIGHTS
      i.ondragend = () => { for (let it of items) {
          it.classList.remove("hint");
          it.classList.remove("active");
      }};
   
      // (B6) DRAG OVER - PREVENT THE DEFAULT "DROP", SO WE CAN DO OUR OWN
      i.ondragover = e => e.preventDefault();
   
      // (B7) ON DROP - DO SOMETHING
      i.ondrop = e => {
        e.preventDefault();
        if (i != current) {
          let currentpos = 0, droppedpos = 0;
          for (let it=0; it<items.length; it++) {
            if (current == items[it]) { currentpos = it; }
            if (i == items[it]) { droppedpos = it; }
          }
          if (currentpos < droppedpos) {
            i.parentNode.insertBefore(current, i.nextSibling);
          } else {
            i.parentNode.insertBefore(current, i);
          }
        }
      };
    }
  }
