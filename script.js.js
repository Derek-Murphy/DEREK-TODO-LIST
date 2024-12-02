document.addEventListener("DOMContentLoaded", () => {
    const taskInput = document.getElementById("taskInput");
    const addTaskButton = document.getElementById("addTaskButton");
    const taskList = document.getElementById("taskList");

    // Load tasks from local storage
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    // Function to render tasks
    function renderTasks() {
        taskList.innerHTML = "";
        tasks.forEach((task, index) => {
            const li = document.createElement("li");
            li.textContent = task.title;
            if (task.completed) {
                li.classList.add("completed");
            }

            const completeButton = document.createElement("button");
            completeButton.textContent = task.completed ? "Undo" : "Complete";
            completeButton.onclick = () => {
                task.completed = !task.completed;
                saveTasks();
                renderTasks();
            };

            const deleteButton = document.createElement("button");
            deleteButton.textContent = "Delete";
            deleteButton.classList.add("delete");
            deleteButton.onclick = () => {
                tasks.splice(index, 1);
                saveTasks();
                renderTasks();
            };

            li.appendChild(completeButton);
            li.appendChild(deleteButton);
            taskList.appendChild(li);
        });
    }

    // Function to save tasks to local storage
    function saveTasks() {
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }

    // Add task
    addTaskButton.onclick = () => {
        const taskTitle = taskInput.value.trim();
        if (taskTitle) {
            tasks.push({ title: taskTitle, completed: false });
            taskInput.value = "";
            saveTasks();
            renderTasks();
        }
    };

    // Initial rendering of tasks
    renderTasks();
});