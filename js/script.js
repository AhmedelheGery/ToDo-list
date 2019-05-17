// GET THE UI VARS
const form = document.querySelector('#task-form');
const taskInput = document.querySelector('#task');
const deleteTasks = document.querySelector('.clear-tasks');
const taskList = document.querySelector('.collection');
const filter = document.querySelector('#filter');
const completed = document.querySelector('.completed');
// FUNCTION THAT LOAD ALL EVENTS
(function LoadAllEvents() {
    // ADD TASK TO DOM & LOCALSTORAGE
    form.addEventListener('submit', addTask);
    // SAVE COMPLETED TASKS AT LOCAL STORAGE THEN GET THEM TO OUR DOM
    window.addEventListener('load', getComTasks);
    // SAVE TASKS AT LOCAL STORAGE THEN GET THEM TO OUR DOM
    window.addEventListener('load', getTasks);
    // REMOVE TASK FROM DOM & LOCALSTORAGE
    taskList.addEventListener('click', removeTask);
    // CLEAR ALL TASKS FROM DOM & LOCALSTORAGE
    deleteTasks.addEventListener('click', clearTasks);
    // CLEAR COMPELETED TASKS FROM DOM & LOCALSTORAGE
    deleteTasks.addEventListener('click', clearComTasks);
    // FILTER TASKS FROM TASKS COLLECTION
    filter.addEventListener('keyup', filterTasks);
    // ADD CMPLETED TASK TO COMPLETED LIST
    taskList.addEventListener('click', AddToCompletedTasks);
    // REMOVE ITEM FROM COMPLETED TASKS
    completed.addEventListener('click', editCompletedTasks);
})();
// ADD TASK FUNCTION 
function addTask(e) {
    e.preventDefault();
    // ON ADD TASK SHOW THE FILTER INPUT 
    if (taskInput.value.trim() === "") {
        alert('You Should Add Task !');
    } else {
        // CREATE LI
        const item = document.createElement('li');
        // ADD CLASS TO LI
        item.className = "collection-item";
        // ADD VALUE TO LI
        item.appendChild(document.createTextNode(taskInput.value));
        // CREATE LINK
        const link = document.createElement('a');
        // ADD CLASS TO LINK
        link.className = "delete-item secondary-content";
        // ADD TAG TO LINK
        link.innerHTML = '<i class="fas fa-times"></i>';
        // APEND LINK TO LI
        item.appendChild(link);
        // APEND LI TO UL
        taskList.appendChild(item);
        // APEND LI TO UL
        taskList.appendChild(item);
        // ADD ITEM TO LOCAL STORAGE
        saveTasks(taskInput.value);
        // EMPTY THE INPUT FIELD
        taskInput.value = "";
    }
}
// SAVE OUR TASKS AT LOCALSTORAGE
function saveTasks(task) {
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}
// SAVE COMPLETED TASKS AT LOCAL STORAGE
function saveComTasks(task) {
    let ComTasks;
    if (localStorage.getItem('ComTasks') === null) {
        ComTasks = [];
    } else {
        ComTasks = JSON.parse(localStorage.getItem('ComTasks'));
    }
    ComTasks.push(task);
    localStorage.setItem('ComTasks', JSON.stringify(ComTasks));
}
// GET OUR TASKS FROM LOCAL STORAGE
function getTasks() {
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.forEach(function (task) {
        // CREATE LI
        const item = document.createElement('li');
        // ADD CLASS TO LI
        item.className = "collection-item";
        // ADD VALUE TO LI
        item.appendChild(document.createTextNode(task));
        // CREATE LINK
        const link = document.createElement('a');
        // ADD CLASS TO LINK
        link.className = "delete-item secondary-content";
        // ADD TAG TO LINK
        link.innerHTML = '<i class="fas fa-times"></i>';
        // APEND LINK TO LI
        item.appendChild(link);
        // APEND LI TO UL
        taskList.appendChild(item);
    });
}
// GET COMPELETED TASKS FROM LOCAL STORAGE
function getComTasks() {
    let ComTasks;
    if (localStorage.getItem('ComTasks') === null) {
        ComTasks = [];
    } else {
        ComTasks = JSON.parse(localStorage.getItem('ComTasks'));
    }
    ComTasks.forEach(function (task) {
        // CREATE LI
        const item = document.createElement('li');
        // ADD CLASS TO LI
        item.className = "collection-item";
        // ADD VALUE TO LI
        item.appendChild(document.createTextNode(task));
        // CREATE LINK
        const link = document.createElement('a');
        // ADD CLASS TO LINK
        link.className = "delete-item secondary-content";
        // ADD TAG TO LINK
        link.innerHTML = '<i class="fas fa-times"></i>';
        // APEND LINK TO LI
        item.appendChild(link);
        // APEND LI TO UL
        completed.appendChild(item);
    });
}
// REMOVE TASK ITEM FROM THE DOM
function removeTask(e) {
    let li = e.target.parentElement.parentElement;
    let a = e.target.parentElement;
    if (a.classList.contains('delete-item')) {
        if (confirm('Are You Sure ?')) {
            li.remove();
            removeFromLS(li);
        }
    }
}
// REMOVE TASK ITEM FROM LOCAL STORAGE
function removeFromLS(taskItem) {
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(function (task, index) {
        if (taskItem.textContent === task) {
            tasks.splice(index, 1);
        }
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}
// REMOVE COMPELETED TASKS FROM LOCAL STORAGE
function removeComFromLS(taskItem) {
    let ComTasks;
    if (localStorage.getItem('ComTasks') === null) {
        ComTasks = [];
    } else {
        ComTasks = JSON.parse(localStorage.getItem('ComTasks'));
    }

    ComTasks.forEach(function (task, index) {
        if (taskItem.textContent === task) {
            ComTasks.splice(index, 1);
        }
    });
    localStorage.setItem('ComTasks', JSON.stringify(ComTasks));
}
// CLEAR ALL TASKS FROM THE DOM 
function clearTasks() {
    //CLEAR TASKS FROM THE DOM
    while (taskList.firstChild) {
        taskList.removeChild(taskList.firstChild);
    }
    //CLEAR TASKS FROM LOCAL STORAGE
    clearAllLS();
}
// CLEAR COMPELETED TASKS FROM THE DOM 
function clearComTasks() {
    //CLEAR TASKS FROM THE DOM
    while (completed.firstChild) {
        completed.removeChild(completed.firstChild);
    }
    //CLEAR TASKS FROM LOCAL STORAGE
    clearAllLS();
}
// CLEAR ALL TASKS FROM LOCAL STORAGE
function clearAllLS() {
    localStorage.clear();
}
// FILTER TASKS
function filterTasks(e) {
    const value = e.target.value.toLowerCase();
    document.querySelectorAll('.collection-item').forEach(function (i) {
        const text = i.firstChild.textContent;
        if (text.toLowerCase().indexOf(value) != -1) {
            i.style.display = 'block';
        } else {
            i.style.display = 'none';
        }
    });
}
// STYLE COMPLETED TASK 
// function styleComTask(target) {
//     let check = document.createElement('span');
//     check.innerHTML = '<i class="fas fa-check-circle"></i>';
//     target.appendChild(check);
//     target.setAttribute('style', ' color : green ; display : block; border:0; ')
//     check.children[0].setAttribute('style', 'float : none ; color : green ; font-size : 18px ; padding : 0 10px ;');
// }
// ADD COMPLETED TASK TO COMPLETED LIST
function AddToCompletedTasks(e) {
    let target = e.target;
        if (target.classList.contains('collection-item')) {
            // REMOVE TASK FROM DOM 
            target.remove();
            // REMOVE TASK FROM LOCAL STORAGE
            removeFromLS(target);
            // APEND LI TO COMPLETED ITEM
            completed.appendChild(target);
            // CHECK ANIMATION
            document.querySelector('.green-check').classList.add('check');
            setTimeout (function(){
            document.querySelector('.green-check').classList.remove('check');
            }, 1000);
            saveComTasks(target.textContent);
        } else if (target.classList.contains('delete-item')) {
            // REMOVE TASK FROM DOM 
            target.parentElement.remove();
            // REMOVE TASK FROM LOCAL STORAGE
            removeFromLS(target.parentElement);
            completed.appendChild(target.parentElement);
            // CHECK ANIMATION
            document.querySelector('.green-check').classList.add('check');
            setTimeout (function(){
            document.querySelector('.green-check').classList.remove('check');
            }, 1000);
            saveComTasks(target.parentElement.textContent);
    }

}
// REMOVE ITEM FROM COMPLETED TASKS
function editCompletedTasks(e) {
    if (e.target.classList.contains('fas')) {
        if (confirm('Are you Sure ?')) {
            e.target.parentElement.parentElement.remove();
            removeComFromLS(e.target.parentElement.parentElement);
        }
    }
}