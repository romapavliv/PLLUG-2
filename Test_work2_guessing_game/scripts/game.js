let clickCounter = 0;
let openCellsCounter = 0;
let previouslyOpenedCellClass;
let previouslyOpenedCellId;
let startGameDate;
let endGameDate;

const cellsNumber = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];
const cellPairs = 8;
const cellClassName = "cell";
let cellClassesMap = new Map();

function getRandomCell(cellsArray) {
    let index = Math.floor(Math.random() * cellsArray.length);
    let result = cellsArray[index];
    cellsArray.splice(index, 1);
    return result;
}

function addOnClickes() {
    for (let i = 1; i <= cellsNumber.length; ++i)
        document.getElementById(i.toString()).addEventListener('click', function () { addClass(i); });
}

function generateCellsImages() {
    addOnClickes();
    let unusedCells = cellsNumber;
    let currentPairsNumber = cellPairs;
    for (let i = 1; i <= currentPairsNumber; ++i) {
        let firstCellId = getRandomCell(unusedCells);
        let secondCellId = getRandomCell(unusedCells);
        cellClassesMap.set(firstCellId, cellClassName + i.toString());
        cellClassesMap.set(secondCellId, cellClassName + i.toString());
    }
}

function removeCell(cellId) {
    let currentCell = document.getElementById(cellId);
    currentCell.style.opacity = "0";
    currentCell.style.visibility = "hidden";
    currentCell.style.transition = "visibility 0.2s, opacity 0.2s";
    currentCell = document.getElementById(previouslyOpenedCellId);
    currentCell.style.opacity = "0";
    currentCell.style.visibility = "hidden";
    currentCell.style.transition = "visibility 0.2s, opacity 0.2s";
}

function removeClass(cellId, cellClass) {
    let currentCell = document.getElementById(cellId);
    currentCell.classList.remove(cellClass);
    currentCell = document.getElementById(previouslyOpenedCellId);
    currentCell.classList.remove(previouslyOpenedCellClass);
}

function showResults() {
    timeOnPage.stop();
    let result_message = document.getElementById("message_box");
    result_message.innerHTML = `<p>Congratulations, ${localStorage.getItem("name")}! You win!</p><p>It took you ${(endGameDate.getTime() - startGameDate.getTime()) / 1000} seconds</p>
                                <p>and ${clickCounter} steps.</p><br /><button id="play_again" onclick="window.open('../index.html','_self'); localStorage.clear();">Play again</button>`
    let container = document.getElementById("container");
    container.style.visibility = "hidden";
    let container2 = document.getElementById("game_results");
    container2.style.visibility = "visible";
}

function checkClosedCellsAmount() {
    let cellsList = document.querySelectorAll(".game-cell");
    let counter = 0;
    cellsList.forEach(cell => {
        if (cell.style.visibility === "hidden")
            counter += 1;
    });
    if (counter === cellsList.length)
        showResults();
}

function addClass(cellId) {
    let cellClass = cellClassesMap.get(cellId);
    let currentCell = document.getElementById(cellId);
    currentCell.classList.add(cellClass);
    openCellsCounter += 1;
    if (openCellsCounter % 2 === 0) {
        if (cellClass === previouslyOpenedCellClass && cellId !== previouslyOpenedCellId) {
            clickCounter += 1;
            document.getElementById("count").textContent = clickCounter;
            setTimeout(function () {
                removeCell(cellId);
                alert("Hooray! Great job!");
                checkClosedCellsAmount();
            }, 500);
            openCellsCounter = 0;
        }
        else if (cellClass === previouslyOpenedCellClass && cellId === previouslyOpenedCellId) {
            openCellsCounter = 1;
        }
        else {
            clickCounter += 1;
            document.getElementById("count").textContent = clickCounter;
            setTimeout(function () {
                removeClass(cellId, cellClass);
                alert("Oops, you guessed wrong...");
            }, 500);
            openCellsCounter = 0;
        }
    }
    else {
        previouslyOpenedCellClass = cellClass;
        previouslyOpenedCellId = cellId;
        clickCounter += 1;
        document.getElementById("count").textContent = clickCounter;
    }
}

let timeOnPage = {
    time: null,
    timer: null,
    now: 0,
    tick: function () {
        ++timeOnPage.now;
        let remain = timeOnPage.now;
        let hours = Math.floor(remain / 3600);
        remain -= hours * 3600;
        let mins = Math.floor(remain / 60);
        remain -= mins * 60;
        let secs = remain;

        if (hours < 10)
            hours = "0" + hours;
        if (mins < 10)
            mins = "0" + mins;
        if (secs < 10)
            secs = "0" + secs;
        timeOnPage.time.innerHTML = hours + ":" + mins + ":" + secs;
    },

    start: function () {
        timeOnPage.time = document.getElementById("time");
        timeOnPage.timer = setInterval(timeOnPage.tick, 1000);
        startGameDate = new Date();
    },

    stop: function () {
        clearInterval(timeOnPage.timer);
        timeOnPage.timer = null;
        endGameDate = new Date();
    },
};

window.onload = function () {
    document.addEventListener("DOMContentLoaded", generateCellsImages());
    timeOnPage.start();
}