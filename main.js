const randomArray = [];

for (let i = 0; i < 6; i++) {
    let innerArray = [];
    for (let j = 0; j < 7; j++) {
        let randomNumber = Math.floor(Math.random() * 4 + 1);
        switch (randomNumber) {
            case 1:
                innerArray.push("♠")
                break;
            case 2:
                innerArray.push("♣")
                break;
            case 3:
                innerArray.push("♡")
                break;
            case 4:
                innerArray.push("♢")
                break;
        }
    }
    randomArray.push(innerArray);
}

const field = document.createElement("div");
field.classList.add("field");
const startBtn = document.querySelector(".start");
const instr = document.querySelector(".instruction");
const instrText = document.querySelector(".instruction-text");

async function delayedStart() {
    for (let i = 0; i < randomArray.length; i++) {
        const column = document.createElement("div")
        column.classList.add("column")
        field.append(column)
        for (let j = 0; j < randomArray[i].length; j++) {
            const cell = document.createElement("div")
            cell.classList.add("cell")
            cell.innerText = randomArray[i][j]
            cell.dataset.columnID = i;
            cell.dataset.cellID = j;
            await new Promise(resolve => setTimeout(resolve, 50))
            column.append(cell)
        }
    }
}

let tempArray = [];
let counter = 0;

function findAndDeleteSiblings(cell) {

    tempArray.push(cell);

    let bottomCell = cell.nextSibling;
    let leftCell = document.querySelector(`[data-column-i-d="${+cell.dataset.columnID - 1}"][data-cell-i-d="${cell.dataset.cellID}"]`);
    let rightCell = document.querySelector(`[data-column-i-d="${+cell.dataset.columnID + 1}"][data-cell-i-d="${cell.dataset.cellID}"]`);
    let upCell = cell.previousSibling;

    if ((rightCell !== null) && (rightCell.innerText === cell.innerText) && (!rightCell.hasAttribute("data-mark"))) {
        rightCell.dataset.mark = true;
        counter = 0;
        findAndDeleteSiblings(rightCell);
    } else if ((bottomCell !== null) && (bottomCell.innerText === cell.innerText) && (!bottomCell.hasAttribute("data-mark"))) {
        bottomCell.dataset.mark = true;
        counter = 0;
        findAndDeleteSiblings(bottomCell);
    } else if ((leftCell !== null) && (leftCell.innerText === cell.innerText) && (!leftCell.hasAttribute("data-mark"))) {
        leftCell.dataset.mark = true;
        counter = 0;
        findAndDeleteSiblings(leftCell);
    } else if ((upCell !== null) && (upCell.innerText === cell.innerText) && (!upCell.hasAttribute("data-mark"))) {
        upCell.dataset.mark = true;
        counter = 0;
        findAndDeleteSiblings(upCell);
    } else if (counter < tempArray.length) {
        cell.innerText = "";
        counter++;
        tempArray.pop();
        if ((tempArray.length - counter) >= 0) {
            findAndDeleteSiblings(tempArray[tempArray.length - counter])
        } else {
            counter = 0;
            tempArray = [];
        }
    }
}

startBtn.addEventListener("click", function (e) {
    e.preventDefault;
    startBtn.classList.add("hide");
    instr.classList.add("hide");
    instrText.classList.add("hide");
    document.body.append(field);
    delayedStart();
});

field.addEventListener("click", function (e) {
    e.preventDefault();
    let cell = e.target;
    if (!cell.classList.contains("field")) {
        findAndDeleteSiblings(cell);
    }
});