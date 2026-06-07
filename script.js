let tasks = getTasksFromLocalStorage() || [];

console.log("Tasks: ", tasks);


let inputs = document.querySelectorAll(".board-input");
let itemLists = document.querySelectorAll(".item-list");

renderBoard();

function addItem(e) {
    if (e.key !== "Enter") return;
    const inputItem = e.target.value.trim();
    const targetID = e.target.id.split("-");

    if (inputItem === "") {
        alert("Enter a valid Task");
        e.target.value = "";
        return;
    }
    const item = {
        text: inputItem,
        id: crypto.randomUUID(),
        status: targetID[1],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    };
    tasks.push(item);
    saveToLocalStorage();

    // console.log(tasks);
    e.target.value = ""
    renderItem(item);
}

function renderBoard() {
    console.log("Rendered Board")
    itemLists[0].innerHTML = ""
    itemLists[1].innerHTML = ""
    itemLists[2].innerHTML = ""
    // <div class="board-item">Item 1</div>
    tasks.forEach((task) => {
        const boardItem = document.createElement("div");
        boardItem.className = "board-item";
        boardItem.innerText = task.text;
        switch (task.status) {
            case "todo":
                itemLists[0].appendChild(boardItem);
                break;
            case "progress":
                itemLists[1].appendChild(boardItem);
                break;
            case "done":
                itemLists[2].appendChild(boardItem);
                break;
            default:
                break;
        }
    })
}

function renderItem(task) {
    console.log("Rendered Item")
    const boardItem = document.createElement("div");
    boardItem.className = "board-item";
    boardItem.innerText = task.text;
    switch (task.status) {
        case "todo":
            itemLists[0].appendChild(boardItem);
            break;
        case "progress":
            itemLists[1].appendChild(boardItem);
            break;
        case "done":
            itemLists[2].appendChild(boardItem);
            break;
        default:
            break;
    }
}

function saveToLocalStorage() {
    localStorage.setItem("todo", JSON.stringify(tasks));
}

function getTasksFromLocalStorage() {
    return JSON.parse(localStorage.getItem("todo"));
}
