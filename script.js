document.addEventListener('DOMContentLoaded', function () {
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // Load tasks from localStorage on page load
    function loadTasks() {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        storedTasks.forEach(taskText => addTask(taskText, false));
    }

    // Add a new task to the list
    function addTask(taskText, save = true) {
        if (!taskText.trim()) {
            alert('Please enter a task.');
            return;
        }

        // Create task list item
        const li = document.createElement('li');
        li.textContent = taskText;

        // Create remove button
        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remove';
        removeButton.classList.add('remove-btn');
        removeButton.onclick = function () {
            li.remove();
            removeTaskFromStorage(taskText);
        };

        li.appendChild(removeButton);
        taskList.appendChild(li);

        // Clear input field
        taskInput.value = '';

        // Save to localStorage
        if (save) {
            saveTaskToStorage(taskText);
        }
    }

    // Save task to localStorage
    function saveTaskToStorage(taskText) {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        storedTasks.push(taskText);
        localStorage.setItem('tasks', JSON.stringify(storedTasks));
    }

    // Remove task from localStorage
    function removeTaskFromStorage(taskText) {
        let storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        storedTasks = storedTasks.filter(task => task !== taskText);
        localStorage.setItem('tasks', JSON.stringify(storedTasks));
    }

    // Add task button event listener
    addButton.addEventListener('click', function () {
        const taskText = taskInput.value;
        addTask(taskText);
    });

    // Allow adding task with Enter key
    taskInput.addEventListener('keypress', function (event) {
        if (event.key === 'Enter') {
            const taskText = taskInput.value;
            addTask(taskText);
        }
    });

    // Load existing tasks from localStorage
    loadTasks();
});
