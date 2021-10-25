function checkName() {
    const currentName = document.getElementById("username").value;
    if (currentName === null || currentName === "")
        alert("Please, enter you name to start.")
    else if (!(/^[A-Za-z ]*$/.test(currentName)))
        alert("Name can contain only letters and spaces.")
    else {
        localStorage.setItem("name", currentName);
        window.open('./pages/game.html','_self');
    }
}