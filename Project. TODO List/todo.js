const todoForm = document.querySelector('.todo-form');
const todoInput = document.querySelector('.todo-input');
const todoItemsList = document.querySelector('.todo-items');
let todos = []; //array that holds todo items
let selectArray = JSON.parse(localStorage.getItem("optionName")) || [];
let btnAdd = document.getElementById('addToDropDown');
let inputListName = document.getElementById('inputID');
let selectDropDown = document.getElementById('addInputToSelect');
let heading = document.getElementById('mainHeading');


todoForm.addEventListener('submit', function(event) {
    event.preventDefault();
    let selectedValue = getSelectedValue();
    addTodo(todoInput.value, selectedValue);

});


btnAdd.addEventListener('click', (e) => {
    addOptionstoLocalStorage(inputListName.value);
    renderDropDown();
    inputListName.value = '';

});

function getSelectedValue() {
    let result = selectDropDown.options[selectDropDown.selectedIndex].value;
    return result;
}


function renderDropDown() {
    selectDropDown.innerHTML = '';
    if (selectArray !== []) {
        for (let i = 0; i < selectArray.length; i++) {
            let option = document.createElement('option');
            option.value = selectArray[i];
            option.text = selectArray[i];
            selectDropDown.add(option);
        }
    }
}
renderDropDown();


function addOptionstoLocalStorage(optionName) {
    if (optionName !== '') {
        selectArray.push(optionName);
        localStorage.setItem('optionName', JSON.stringify(selectArray));
    }
}

function addTodo(item, listName) {
    if (item !== '') {
        const todo = {
            id: Date.now(),
            name: item,
            completed: false,
            listName: listName
        };
        todos.push(todo);
        addToLocalStorage(todos);
        todoInput.value = '';
    }
}

function renderTodos(todos) {
    todoItemsList.innerHTML = '';
    let selectedValue = getSelectedValue();
    let filteredArr = todos.filter(el => el.listName === selectedValue)
    heading.innerHTML = selectedValue;
    filteredArr.forEach(function(item) {
        const checked = item.completed ? 'checked' : null;

        const li = document.createElement('li');
        li.setAttribute('class', 'item');
        li.setAttribute('data-key', item.id);

        if (item === true) {
            li.classList.checked.add('checked');
        }
        li.innerHTML = `<input type = 'checkbox' class = 'checkbox' ${checked}>
    ${item.name}
    <button class = 'delete-button'>X</button>`;
        todoItemsList.append(li);

    });
}
selectDropDown.addEventListener('change', function() {
    renderTodos(todos);

});

function addToLocalStorage(todos) {

    localStorage.setItem('todos', JSON.stringify(todos));
    renderTodos(todos);
}


function getFromLocalStorage() {
    const reference = localStorage.getItem('todos');
    if (reference) {
        todos = JSON.parse(reference);
        renderTodos(todos);
    }

}
getFromLocalStorage();

todoItemsList.addEventListener('click', function(event) {
    if (event.target.type === 'checkbox') {
        toggle(event.target.parentElement.getAttribute('data-key'));
    }
    if (event.target.classList.contains('delete-button')) {
        deleteTodo(event.target.parentElement.getAttribute('data-key'));

    }
});


function toggle(id) {
    todos.forEach(function(item) {
        if (item.id == id) {
            item.completed = !item.completed;
        }

    });
    addToLocalStorage(todos);

}

function deleteTodo(id) {
    todos = todos.filter(function(item) {
        return item.id != id;

    });
    addToLocalStorage(todos);

}