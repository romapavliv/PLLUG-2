function stopwatch(taskDiv) {
    let startStopwatch = false;

    function start() {
        if (startStopwatch === false) {
            startStopwatch = true;
            increaseTime();
        }
    }

    function pauseOrResume() {
        if (startStopwatch === true)
            pause();
        else
            resume();
    }

    let time;

    if (localStorage.getItem(`${taskDiv.id}-time`) === null) {
        time = 0;
        if (taskDiv.querySelector(".pause-button") !== null)
            taskDiv.querySelector(".pause-button").addEventListener("click", pauseOrResume);
        else
            taskDiv.querySelector(".pause-button-active").addEventListener("click", pauseOrResume);
    }
    else {
        const lastDate = new Date(JSON.parse(localStorage.getItem("close-time")));
        const currentDate = new Date();
        if (taskDiv.querySelector(".pause-button") !== null) {
            time = parseInt(localStorage.getItem(`${taskDiv.id}-time`), 10) + Math.floor((currentDate - lastDate) / 100);
            taskDiv.querySelector(".pause-button").addEventListener("click", pauseOrResume);
        }
        else {
            time = parseInt(localStorage.getItem(`${taskDiv.id}-time`), 10);
            taskDiv.querySelector(".pause-button-active").addEventListener("click", pauseOrResume);
        }
    }

    function pause() {
        startStopwatch = false;
        const pauseButton = taskDiv.querySelector(".pause-button");
        pauseButton.className = "pause-button-active";
    }

    function resume() {
        if (startStopwatch === false && time != 0) {
            startStopwatch = true;
            if (taskDiv.querySelector(".pause-button-active") !== null) {
                const pauseButton = taskDiv.querySelector(".pause-button-active");
                pauseButton.className = "pause-button";
            }
            increaseTime();
        }
    }

    function increaseTime() {
        if (startStopwatch === true) {
            setTimeout(function () {
                ++time;
                let minutes = Math.floor(time / 10 / 60) > 9 ? Math.floor(time / 10 / 60) : `0${Math.floor(time / 10 / 60)}`;
                let seconds = Math.floor(time / 10 % 60) > 9 ? Math.floor(time / 10 % 60) : `0${Math.floor(time / 10 % 60)}`;
                let hours = Math.floor(time / 10 / 60 / 60) > 9 ? Math.floor(time / 10 / 60 / 60) : `0${Math.floor(time / 10 / 60 / 60)}`;
                let currentTime = hours + ":" + minutes + ":" + seconds;

                if (document.querySelector(`#${taskDiv.id}`) !== null) {
                    taskDiv.querySelector(".timer").innerHTML = currentTime;
                    localStorage.setItem(taskDiv.id, taskDiv.outerHTML);
                    localStorage.setItem(`${taskDiv.id}-time`, time.toString());
                }
                else
                    return;

                if (currentTime !== "99:59:59")
                    increaseTime();
                else {
                    document.querySelector("#tasks-list").removeChild(taskDiv.parentElement);
                    localStorage.removeItem(taskDiv.id);
                }
            }, 100)
        }
    }

    if (taskDiv.querySelector(".pause-button") === null)
        startStopwatch = false;
    else
        start();
}

function addTask(taskDiv) {
    document.querySelector("#tasks-list").appendChild(taskDiv);
    localStorage.setItem(taskDiv.id, taskDiv.outerHTML);
}

function clearLocalStorage() {
    for (let i = 0; i < localStorage.length; ++i) {
        if (localStorage.key(i).includes("-time")) {
            const taskId = localStorage.key(i).replace("-time", "");
            let isDeleted = true;
            for (let j = 0; j < localStorage.length; ++j)
                if (taskId === localStorage.key(j))
                    isDeleted = false;
            if (isDeleted)
                localStorage.removeItem(localStorage.key(i));
        }
    }
}

function deleteTask(event) {
    document.querySelector("#tasks-list").removeChild(event.target.parentElement);
    localStorage.removeItem(event.target.parentElement.id);
    clearLocalStorage();
}

function createTask() {
    const newTask = document.createElement("div");
    newTask.setAttribute("id", `task${localStorage.length}`);
    newTask.classList.add("task");

    const inputTask = document.querySelector("#tasks-input");
    let name;
    if (inputTask.value === "") {
        let today = new Date();
        const currentDate = `${today.getDate() > 9 ? today.getDate() : `0${today.getDate()}`}/${today.getMonth() + 1 > 9 ? today.getMonth() + 1 : `0${today.getMonth() + 1}`}/${today.getFullYear() > 9 ? today.getFullYear() : `0${today.getFullYear()}`}`;
        const currentTime = `${today.getHours() > 9 ? today.getHours() : `0${today.getHours()}`}:${today.getMinutes() > 9 ? today.getMinutes() : `0${today.getMinutes()}`}:${today.getSeconds() > 9 ? today.getSeconds() : `0${today.getSeconds()}`}`;
        name = `${currentDate} ${currentTime}`;
    }
    else
        name = inputTask.value;

    const taskName = document.createElement("div");
    taskName.classList.add("task-name");
    taskName.innerHTML = name;

    const timer = document.createElement("div");
    timer.classList.add("timer");
    timer.innerHTML = "00:00:00";

    const pauseButton = document.createElement("div");
    pauseButton.classList.add("pause-button");

    const deleteButton = document.createElement("div");
    deleteButton.classList.add("delete-button");
    deleteButton.addEventListener("click", deleteTask);

    newTask.appendChild(taskName);
    newTask.appendChild(timer);
    newTask.appendChild(pauseButton);
    newTask.appendChild(deleteButton);

    addTask(newTask);

    stopwatch(newTask);
}

window.addEventListener("load", () => {
    if (localStorage.length > 0) {
        Object.keys(localStorage).sort();
        for (let i = 0; i < localStorage.length; ++i) {
            if (!localStorage.key(i).includes("-time")) {
                const tempDiv = document.createElement("div");
                tempDiv.innerHTML = localStorage.getItem(localStorage.key(i));
                const taskDiv = tempDiv.firstChild;
                stopwatch(taskDiv);
                document.querySelector("#tasks-list").appendChild(taskDiv);
                taskDiv.querySelector(".delete-button").addEventListener("click", deleteTask);
            }
        }
    }
});

window.addEventListener("beforeunload", () => {
    const closeDate = new Date();
    localStorage.setItem("close-time", JSON.stringify(closeDate));
});