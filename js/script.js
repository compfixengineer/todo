const todoControl = document.querySelector('.todo-control');
const headerInput = document.querySelector('.header-input');
const todoList = document.querySelector('.todo-list');
const todoCompleted = document.querySelector('.todo-completed');

let toDoData = []; 

const render = function  () {
    
    todoList.innerHTML = '';
    todoCompleted.innerHTML = '';

    toDoData.forEach(function(item) { // перебираем каждый итем (объект массива объектов toDoData)
        const li = document.createElement('li'); // Создаем новый элемент li
        li.classList.add('todo-item'); // Присвоим новому элементу li класс css
        
        li.innerHTML = `<span class="text-todo"> ${item.text} </span>
                        <div class="todo-buttons">
                        <button class="todo-remove"></button>
                        <button class="todo-complete"></button>
                        </div>`;

        if (item.complited) {
            li.setAttribute('id', item.id);
            todoCompleted.append(li);
        } else {
            li.setAttribute('id', item.id);
            todoList.append(li);
        };

        li.querySelector('.todo-complete').addEventListener('click', function (){
            item.complited = !item.complited;
            saveToLocalStorage();
            render();
        });

            todoList.addEventListener('click', removeItem);
            todoCompleted.addEventListener('click', removeItem);
    }); 
}

const removeItem = function (event) {
    if (event.target.classList.contains('todo-remove')) {
        const parentNode = event.target.closest('.todo-item');
        const id = +parentNode.id;
    // Ищем индекс элемента (задачи) в массиве    
        const index = toDoData.findIndex( function (item) {
                return item.id === id
        });
    // Удаляем элемент из массива по найденому индексу элемента (задачи)  
        toDoData.splice(index, 1);
        
        saveToLocalStorage();

        // Удаляем элемент из верстки    
        parentNode.remove();
    }
};

const saveToLocalStorage = function () {
    localStorage.setItem('tasks', JSON.stringify(toDoData));
}

todoControl.addEventListener('submit', function (event) {
    event.preventDefault();
    if (headerInput.value == '') {
        alert ("Введите свою задачу!");
    } else {
        const newToDo = {
            id: Date.now(),
            text: headerInput.value,
            complited: false
        };
    
        toDoData.push(newToDo);
        headerInput.value = '';
        saveToLocalStorage();
        render();
    }
});

if (localStorage.getItem('tasks')) {
    toDoData = JSON.parse(localStorage.getItem('tasks'));
    render ();
};
