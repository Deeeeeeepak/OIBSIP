const taskInput = document.getElementById('task-input');
const descriptionInput = document.getElementById('description-input');
const addTaskBtn = document.getElementById('add-task-btn');
const taskList = document.getElementById('task-list');
const showIncompleteBtn = document.getElementById('show-incomplete');
const showCompleteBtn = document.getElementById('show-complete');

let tasks = [];

addTaskBtn.addEventListener('click', addTask);
showIncompleteBtn.addEventListener('click', showIncompleteTasks);
showCompleteBtn.addEventListener('click', showCompleteTasks);

function addTask() {
    const taskText = taskInput.value.trim();
    const descriptionText = descriptionInput.value.trim();
    if (taskText) {
        const task = {
            text: taskText,
            description: descriptionText,
            completed: false,
            createdAt: new Date().toLocaleString()
        };
        tasks.push(task);
        taskInput.value = ''; 
        descriptionInput.value = ''; 
        renderTasks();
    }
}

function renderTasks() {
    taskList.innerHTML = '';
    tasks.forEach(task => {
        if ((showIncompleteBtn.classList.contains('active') && !task.completed) ||
            (showCompleteBtn.classList.contains('active') && task.completed)) {
            const taskItem = document.createElement('li');
            taskItem.classList.add(task.completed ? 'completed' : 'pending');
            taskItem.innerHTML = `
                <div>
                    <div>${task.text}</div>
                    <div class="task-description">${task.description}</div>
                    <div class="task-description">(Added: ${task.createdAt})</div>
                    ${task.completed ? `<div class="task-description">(Completed: ${task.completedAt})</div>` : ''}
                </div>
                <div>
                    <button onclick="editTask(${tasks.indexOf(task)})">Edit</button>
                    <button onclick="deleteTask(${tasks.indexOf(task)})">Delete</button>
                    <button onclick="toggleCompleted(${tasks.indexOf(task)})">${task.completed ? 'Undo' : 'Complete'}</button>
                </div>
            `;
            taskList.appendChild(taskItem);
        }
    });
}

function editTask(index) {
    const task = tasks[index];
    taskInput.value = task.text;
    descriptionInput.value = task.description;
    taskInput.focus();
}

function deleteTask(index) {
    tasks.splice(index, 1);
    renderTasks();
}

function toggleCompleted(index) {
    const task = tasks[index];
    task.completed = !task.completed;
    if (task.completed) {
        task.completedAt = new Date().toLocaleString(); // Add completion time
    } else {
        task.completedAt = null; // Reset completion time if task is marked as incomplete
    }
    renderTasks();
}

function showIncompleteTasks() {
    showIncompleteBtn.classList.add('active');
    showCompleteBtn.classList.remove('active');
    renderTasks();
}

function showCompleteTasks() {
    showIncompleteBtn.classList.remove('active');
    showCompleteBtn.classList.add('active');
    renderTasks();
}
