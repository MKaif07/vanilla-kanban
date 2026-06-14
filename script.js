let tasks = getTasksFromLocalStorage();
let editingTaskId = null;

const modalBackdrop = document.getElementById("modal-backdrop");
const modalText = document.getElementById("modal-task-text");
const saveTaskBtn = document.getElementById("save-task");
const cancelTaskBtn = document.getElementById("cancel-task");

const itemLists = document.querySelectorAll(".item-list");

const statusMap = {
    todo: document.getElementById("todo-list"),
    progress: document.getElementById("progress-list"),
    done: document.getElementById("done-list")
};

document.querySelectorAll(".board-col").forEach(col => {
    col.addEventListener("drop", handleDrop);
    col.addEventListener("dragover", dragoverHandler);
});

document.querySelectorAll(".board-input").forEach(input => {
    input.addEventListener("keydown", addItem);
});

document.addEventListener("click", handleGlobalClick);
document.addEventListener("keydown", handleEscape);

saveTaskBtn.addEventListener("click", saveEditedTask);
cancelTaskBtn.addEventListener("click", closeModal);

modalBackdrop.addEventListener("click", (e) => {
    if (e.target === modalBackdrop) {
        closeModal();
    }
});

renderBoard();

function addItem(e) {
    if (e.key !== "Enter") return;

    const text = e.target.value.trim();

    if (!text) {
        alert("Enter a valid task");
        return;
    }

    const status = e.target.id.split("-")[1];

    const task = {
        id: crypto.randomUUID(),
        text,
        status,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    };

    tasks.push(task);

    saveToLocalStorage();
    renderBoard();

    e.target.value = "";
}

function renderBoard() {
    itemLists.forEach(list => {
        list.innerHTML = "";
    });

    tasks.forEach(renderItem);
}

function renderItem(task) {
    const boardItem = document.createElement("div");
    boardItem.className = "board-item";
    boardItem.id = task.id;
    boardItem.draggable = true;

    boardItem.addEventListener("dragstart", dragstartHandler);

    const taskContent = document.createElement("div");
    taskContent.className = "task-content";
    taskContent.textContent = task.text;

    const actions = document.createElement("div");
    actions.className = "task-actions";

    // Edit Button
    const editBtn = document.createElement("button");
    editBtn.className = "edit-btn";
    editBtn.dataset.id = task.id;
    editBtn.setAttribute("aria-label", "Edit task");
    editBtn.title = "Edit task";

    editBtn.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg"
             width="18"
             height="18"
             viewBox="0 0 24 24"
             fill="none"
             stroke="currentColor"
             stroke-width="2"
             stroke-linecap="round"
             stroke-linejoin="round">
            <path d="M12 20h9"/>
            <path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z"/>
        </svg>
    `;

    // Delete Button
    const deleteBtn = document.createElement("button");
    deleteBtn.className = "delete-btn";
    deleteBtn.dataset.id = task.id;
    deleteBtn.setAttribute("aria-label", "Delete task");
    deleteBtn.title = "Delete task";

    deleteBtn.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg"
             width="18"
             height="18"
             viewBox="0 0 24 24"
             fill="none"
             stroke="currentColor"
             stroke-width="2"
             stroke-linecap="round"
             stroke-linejoin="round">
            <polyline points="3 6 5 6 21 6"/>
            <path d="M19 6l-1 14H6L5 6"/>
            <path d="M10 11v6"/>
            <path d="M14 11v6"/>
            <path d="M9 6V4h6v2"/>
        </svg>
    `;

    actions.appendChild(editBtn);
    actions.appendChild(deleteBtn);

    boardItem.appendChild(taskContent);
    boardItem.appendChild(actions);

    statusMap[task.status]?.appendChild(boardItem);
}

function handleGlobalClick(e) {
    const deleteBtn = e.target.closest(".delete-btn");

    if (deleteBtn) {
        const taskId = deleteBtn.dataset.id;

        tasks = tasks.filter(task => task.id !== taskId);

        saveToLocalStorage();
        renderBoard();
        return;
    }

    const editBtn = e.target.closest(".edit-btn");

    if (editBtn) {
        openModal(editBtn.dataset.id);
    }
}

function dragstartHandler(e) {
    e.dataTransfer.setData("taskId", e.currentTarget.id);
    e.dataTransfer.effectAllowed = "move";
}

function dragoverHandler(e) {
    e.preventDefault();
}

function handleDrop(e) {
    e.preventDefault();

    const list = e.target.closest(".item-list");

    if (!list) return;

    const destinationStatus = list.dataset.status;
    const taskId = e.dataTransfer.getData("taskId");

    const task = tasks.find(task => task.id === taskId);

    if (!task) return;

    if (task.status === destinationStatus) return;

    task.status = destinationStatus;
    task.updatedAt = new Date().toISOString();

    saveToLocalStorage();
    renderBoard();
}

function openModal(taskId) {
    const task = tasks.find(task => task.id === taskId);

    if (!task) return;

    editingTaskId = taskId;
    modalText.value = task.text;

    modalBackdrop.classList.remove("hidden");
    modalText.focus();
}

function closeModal() {
    editingTaskId = null;
    modalText.value = "";

    modalBackdrop.classList.add("hidden");
}

function saveEditedTask() {
    const updatedText = modalText.value.trim();

    if (!updatedText) {
        alert("Task cannot be empty");
        return;
    }

    const task = tasks.find(task => task.id === editingTaskId);

    if (!task) return;

    task.text = updatedText;
    task.updatedAt = new Date().toISOString();

    saveToLocalStorage();
    renderBoard();
    closeModal();
}

function handleEscape(e) {
    if (e.key === "Escape") {
        closeModal();
    }
}

function saveToLocalStorage() {
    localStorage.setItem("kanban-board", JSON.stringify(tasks));
}

function getTasksFromLocalStorage() {
    try {
        const stored = localStorage.getItem("kanban-board");
        return stored ? JSON.parse(stored) : [];
    } catch {
        return [];
    }
}