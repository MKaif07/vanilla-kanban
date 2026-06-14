# Kanban Board

A lightweight Kanban Board built using **Vanilla HTML, CSS, and JavaScript**. This project focuses on core frontend concepts such as state management, drag-and-drop interactions, DOM manipulation, event delegation, and browser persistence using Local Storage.

## Features

* Create tasks directly within any column
* Edit existing tasks using a modal
* Delete tasks
* Drag and drop tasks between columns
* Automatic task persistence using Local Storage
* Responsive and intuitive UI
* Keyboard support

  * Press `Enter` to create tasks
  * Press `Escape` to close the modal
* Task metadata tracking

  * Creation timestamp
  * Last updated timestamp
* UUID-based task identification

---

## Demo

The board consists of three workflow stages:

* To Do
* In Progress
* Done

Tasks can be moved between stages using drag-and-drop while maintaining their state in Local Storage.

---

## Tech Stack

* HTML5
* CSS3
* JavaScript (ES6+)
* Browser Local Storage API
* HTML Drag and Drop API

No frameworks or external libraries were used.

---

## Project Architecture

The application follows a simple state-driven architecture.

```text
User Action
      ↓
Update Task State
      ↓
Save To Local Storage
      ↓
Re-render Board
```

The entire board can be recreated from a single JavaScript array of task objects.

Example task structure:

```javascript
{
    id: "7fdbf6cb-b190-404c-ae61-25bff1eb2802",
    text: "Build Kanban Board",
    status: "progress",
    createdAt: "2026-06-13T04:11:48.975Z",
    updatedAt: "2026-06-13T04:11:48.975Z"
}
```

---

## How It Works

### Creating Tasks

When the user presses `Enter` inside a column input:

1. A new task object is created.
2. The task is pushed into the main state array.
3. State is saved to Local Storage.
4. The board is re-rendered.

### Editing Tasks

1. Click the edit button on a task.
2. A modal opens containing the task text.
3. Save updates the task object.
4. Updated data is persisted and rendered.

### Deleting Tasks

1. Click the delete button.
2. The task is removed from the state array.
3. Local Storage is updated.
4. The board is re-rendered.

### Drag and Drop

1. The task ID is stored during `dragstart`.
2. The destination column is identified during `drop`.
3. Task status is updated.
4. Changes are saved and rendered.

---

## State Management

The application maintains a single source of truth:

```javascript
let tasks = [];
```

Every interaction updates this array first.

UI updates are always derived from the state array, ensuring consistency between:

* Application State
* Local Storage
* Rendered UI

---

## Event Handling

The project uses event delegation for task actions:

* Edit Task
* Delete Task

This avoids attaching unnecessary event listeners to every task card and improves scalability.

Global listeners handle:

* Click events
* Keyboard shortcuts
* Drag-and-drop events

---

## Data Persistence

Tasks are automatically stored in Local Storage.

Storage key:

```javascript
"kanban-board"
```

The board is restored automatically when the page reloads.

---

## Accessibility Considerations

* Semantic button controls
* ARIA labels for action buttons
* Keyboard navigation support
* Focus management when opening the modal

---

## Learning Objectives

This project was built to strengthen understanding of:

* State-driven UI rendering
* DOM manipulation
* Event delegation
* Drag and Drop API
* Local Storage
* Modal implementation
* JavaScript architecture and code organization
* CRUD operations in frontend applications

---

## Future Improvements

* Task priorities
* Task ordering within columns
* Due dates
* Search and filtering
* Dark mode
* Multiple boards
* Export/Import board data
* Mobile drag-and-drop support
* Modular JavaScript architecture

---

## Author

Built by Kaif as a frontend engineering practice project using Vanilla JavaScript.
