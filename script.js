let tasks = getTasksFromLocalStorage() || [];

console.log("Tasks: ", tasks);


let inputs = document.querySelectorAll(".board-input");
let itemLists = document.querySelectorAll(".item-list");

let myTarget;

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
        renderItem(task);
    })
}

function renderItem(task) {
    console.log("Rendered Item")
    const boardItem = document.createElement("div");
    boardItem.className = "board-item";
    boardItem.id = task.id;
    boardItem.innerText = task.text;
    boardItem.draggable = true;

    boardItem.addEventListener('mouseenter', () => {
        // console.log("hovering..");
    })

    boardItem.addEventListener("dragstart", dragstartHandler);

    // boardItem.addEventListener('click', (e) => {
    //     // boardItem.style.cursor = "grabbing";
    //     // myTarget = document.getElementById(e.target.id);
    //     myTarget = tasks.find((task) => task.id === e.target.id);
    //     console.log("MY TARGET: ", myTarget);
    // })

    boardItem.addEventListener('dragover', () => {
        // console.log("dragging..");
    })

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

function handleDrop(e) {

    let goal = e.target.id.split("-");
    console.log(e.target.parent);

    myTarget = tasks.map((task) => {
        if (task.id === myTarget.id)
            task.status = goal[0];
    })
    renderBoard();
}

function dragoverHandler(e) {
    e.preventDefault();
    console.log("drag over");

}

function dragstartHandler(e) {
    console.log("drag start");
    e.dataTransfer.setData("text", e.target.id);
    e.target.style.cursor = "grabbing";
    myTarget = document.getElementById(e.target.id);
    console.log("TARGET CAPTURED: ", myTarget);
}

function saveToLocalStorage() {
    localStorage.setItem("todo", JSON.stringify(tasks));
}

function getTasksFromLocalStorage() {
    return JSON.parse(localStorage.getItem("todo"));
}
