function checkPreview(filesList) {
    const filesInPreviewArea = document.querySelectorAll(".thumbnail").length;
    if (filesInPreviewArea + filesList.length > 15) {
        alert("You can select up to 15 files.")
        document.getElementById("file-input").value = ""
        return;
    }
    if (filesList.length > 0)
        addFilesToPreview(filesList);
}

function addDragAndDrop(element) {
    ["dragenter", "dragover", "dragleave", "drop"].forEach((eventName) => {
        element.addEventListener(eventName, (event) => {
            event.stopPropagation();
            event.preventDefault();
        });
    });
}

function checkDragAndDrop() {
    const dragAndDropArea = document.querySelector(".drag-and-drop-container");
    addDragAndDrop(dragAndDropArea);
    dragAndDropArea.addEventListener("drop", (event) => {
        const dt = event.dataTransfer;
        checkPreview(dt.files);
    });
}

function checkFilesInput() {
    const filesInput = document.getElementById("file-input");
    filesInput.addEventListener("change", function () {
        const filesList = this.files;
        checkPreview(filesList);
    });
}

function onPageLoad() {
    checkFilesInput();
    checkDragAndDrop();
}

function deleteFilesFromPreview(fileToDelete) {
    const allDeleteImages = [...document.querySelectorAll(".delete-file")];
    allDeleteImages.map(deleteImage => {
        if (deleteImage.id === fileToDelete) {
            const fileContainer = deleteImage.parentElement;
            const image = fileContainer.querySelector(".thumbnail");
            window.URL.revokeObjectURL(image.src);
            document.querySelector(".preview-container").removeChild(fileContainer);
        }
    });
}

let browesCounter = 0;
let draggableItem;

function addFilesToPreview(filesList) {
    ++browesCounter;
    const filesArray = [...filesList];
    const previewArea = document.querySelector(".preview-container");
    filesArray.map((file, index) => {
        const fileContainer = document.createElement("div");
        fileContainer.classList.add("file-container");
        fileContainer.setAttribute("draggable", "true");
        fileContainer.setAttribute("id", "container-" + browesCounter.toString() + index.toString());
        addDragAndDrop(fileContainer);
        fileContainer.addEventListener("dragstart", (event) => {
            if (event.target.tagName === "IMG")
                draggableItem = event.target.parentElement;
        });
        fileContainer.addEventListener("drop", (event) => {
            if (event.target.tagName === "IMG")
                event.target.parentElement.before(draggableItem);
        });

        const deleteFile = document.createElement("div");
        deleteFile.classList.add("delete-file");
        deleteFile.setAttribute("id", browesCounter.toString() + index.toString());
        const bc = browesCounter;
        deleteFile.addEventListener("click", function () {
            deleteFilesFromPreview(bc.toString() + index.toString());
        });
        fileContainer.appendChild(deleteFile);

        const newImage = document.createElement("img");
        newImage.classList.add("thumbnail");
        if (file.type === "image/png" || file.type === "image/jpg" || file.type === "image/jpeg")
            newImage.src = window.URL.createObjectURL(file);
        else if (file.type === "text/plain")
            newImage.src = "./images/txt_icon.png";
        else if (file.type === "text/comma-separated-values" || file.type === "text/csv" || file.type === "application/csv" ||
            file.type === "application/excel" || file.type === "application/vnd.ms-excel" || file.type === "application/vnd.msexcel")
            newImage.src = "./images/csv_icon.png";

        fileContainer.appendChild(newImage);
        previewArea.appendChild(fileContainer);

    });
    document.getElementById("file-input").value = ""
}

document.addEventListener("DOMContentLoaded", function () {
    onPageLoad();
});