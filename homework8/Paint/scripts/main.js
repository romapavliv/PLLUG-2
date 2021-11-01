window.addEventListener("load", () => {
    const paintArea = document.querySelector(".canvas");
    const ctx = paintArea.getContext("2d");

    paintArea.height = window.innerHeight;
    paintArea.width = window.innerWidth;

    let painting = false;
    let color = "black";
    let eraserColor = "white";
    let figure = "pencil";
    let size = 1;
    let fillingType = "stroke";
    let startPosition;
    let drawingModes = ["pencil", "line", "circle", "rectangle", "triangle", "star", "cloud", "eraser"];

    function pickColor(event) {
        color = event.target.id;
    }

    function pickFigure(event) {
        figure = event.target.id;
    }

    function pickEraserColor(event) {
        eraserColor = event.target.id;
    }

    function pickSize(event) {
        if (event.target.classList[0] === "size")
            size = event.target.children[0].id.slice(2);
        else
            size = event.target.id.slice(2);
    }

    function pickFilling(event) {
        fillingType = event.target.id;
    }

    function getMousePosition(event) {
        let bound = paintArea.getBoundingClientRect(),
            scaleX = paintArea.width / bound.width,
            scaleY = paintArea.height / bound.height;

        return {
            x: (event.clientX - bound.left) * scaleX,
            y: (event.clientY - bound.top) * scaleY
        }
    }

    function startDrawing(event) {
        painting = true;
        startPosition = getMousePosition(event);
        ctx.lineWidth = size;
        ctx.lineCap = "round";
        ctx.strokeStyle = color;
        ctx.fillStyle = color;
        paintFigure(event);
    }

    function finishDrawing(event) {
        painting = false;
        ctx.beginPath();
    }

    function clearPaintArea() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }

    function savePaintArea() {
        let link = document.createElement('a');
        link.setAttribute('download', 'canvas-picture.png');
        link.setAttribute('href', canvas.toDataURL("image/png").replace("image/png", "image/octet-stream"));
        link.click();
        link.remove();
    }

    function pencil(event) {
        let position = getMousePosition(event);
        ctx.strokeStyle = figure === drawingModes[0] ? color : eraserColor;
        ctx.lineTo(position.x, position.y);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(position.x, position.y);
    }

    function line(event) {
        let position = getMousePosition(event);
        ctx.beginPath();
        ctx.moveTo(startPosition.x, startPosition.y);
        ctx.lineTo(position.x, position.y);
        clearPaintArea();
        ctx.stroke();
    }

    function circle(event) {
        let position = getMousePosition(event);
        let radius = Math.sqrt(Math.pow(position.x - startPosition.x, 2) + Math.pow(position.y - startPosition.y, 2));
        ctx.beginPath();
        ctx.arc(startPosition.x, startPosition.y, radius, 0, 2 * Math.PI);
        clearPaintArea();
        if (fillingType === "stroke")
            ctx.stroke();
        else
            ctx.fill();
    }

    function rectangle(event) {
        let position = getMousePosition(event);
        ctx.beginPath();
        ctx.rect(startPosition.x, startPosition.y, position.x - startPosition.x, position.y - startPosition.y);
        clearPaintArea();
        if (fillingType === "stroke")
            ctx.stroke();
        else
            ctx.fill();
    }

    function triangle(event) {
        let position = getMousePosition(event);
        ctx.beginPath();
        ctx.moveTo(startPosition.x, startPosition.y);
        ctx.lineTo(startPosition.x, position.y);
        ctx.lineTo(position.x, position.y);
        ctx.lineTo(startPosition.x, startPosition.y);
        clearPaintArea();
        if (fillingType === "stroke")
            ctx.stroke();
        else
            ctx.fill();
    }

    function star(event) {
        let position = getMousePosition(event);
        let outer = Math.abs(startPosition.y - position.y);
        let inner = outer / 2;
        const points = 5;
        ctx.beginPath();
        ctx.moveTo(startPosition.x, startPosition.y + inner);
        for (let i = 0; i < (2 * points + 1); i++) {
            let r = (i % 2 == 0) ? inner : outer;
            let a = Math.PI * i / points;
            ctx.lineTo(startPosition.x + r * Math.sin(a), startPosition.y + r * Math.cos(a));
        };
        ctx.closePath();
        clearPaintArea();
        if (fillingType === "stroke")
            ctx.stroke();
        else
            ctx.fill();
    }

    function cloud(event) {
        let position = getMousePosition(event);
        let length = Math.abs(startPosition.x - position.x);
        ctx.beginPath();
        ctx.arc(startPosition.x, startPosition.y, length / 3, Math.PI * 0.5, Math.PI * 1.5);
        ctx.arc(startPosition.x + length / 3, startPosition.y - length / 3, length / 3.5, Math.PI * 1, Math.PI * 1.76);
        ctx.arc(startPosition.x + length, startPosition.y - length / 3, length / 2, Math.PI * 1.14, Math.PI * 2);
        ctx.arc(startPosition.x + length / 0.65, startPosition.y, length / 3, Math.PI * 1.47, Math.PI * 0.5);
        ctx.moveTo(startPosition.x + length / 0.65, startPosition.y + length / 3);
        ctx.lineTo(startPosition.x, startPosition.y + length / 3);
        clearPaintArea();
        if (fillingType === "stroke")
            ctx.stroke();
        else
            ctx.fill();
    }

    function paintFigure(event) {
        if (!painting) return;
        if (figure === drawingModes[0] || figure === drawingModes[7])
            pencil(event);
        else if (figure === drawingModes[1])
            line(event);
        else if (figure === drawingModes[2])
            circle(event);
        else if (figure === drawingModes[3])
            rectangle(event);
        else if (figure === drawingModes[4])
            triangle(event);
        else if (figure === drawingModes[5])
            star(event)
        else if (figure === drawingModes[6])
            cloud(event);
    }

    [...document.querySelectorAll(".color")].forEach((element) => element.addEventListener("click", pickColor));
    [...document.querySelectorAll(".color")].forEach((element) => element.addEventListener("contextmenu", pickEraserColor));
    [...document.querySelectorAll(".figure")].forEach((element) => element.addEventListener("click", pickFigure));
    [...document.querySelectorAll(".size")].forEach((element) => element.addEventListener("click", pickSize));
    [...document.querySelectorAll(".filling")].forEach((element) => element.addEventListener("click", pickFilling));
    document.querySelector("#clear-canvas").addEventListener("click", clearPaintArea);
    document.querySelector("#save-drawing").addEventListener("click", savePaintArea);

    paintArea.addEventListener("mousedown", startDrawing);
    paintArea.addEventListener("mouseup", finishDrawing);
    paintArea.addEventListener("mousemove", paintFigure);
});