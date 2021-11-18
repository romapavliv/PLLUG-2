function removeCheckedClass(elementsList, checkedElementIndex) {
    let elementsArray = [...elementsList];
    elementsArray.splice(checkedElementIndex, 1);
    elementsArray.forEach((element) => {
        const parentElement = element.parentElement;
        if(parentElement.classList.contains("inline-div-checked")) {
            parentElement.classList.remove("inline-div-checked");
        }
    });
}

function addCheckedClass(elementsList) {
    [...elementsList].forEach((element, index) => {
        element.addEventListener("change", (event) => {
            const parentElement = event.currentTarget.parentElement;
            if(event.currentTarget.checked) {
                parentElement.classList.add("inline-div-checked");
                removeCheckedClass(elementsList, index);
            }
        });
    });
}

document.addEventListener("DOMContentLoaded", () => {
    const distanceInputs = document.querySelectorAll(".distance");
    const responseTypeInpits = document.querySelectorAll(".response-type");
    addCheckedClass(distanceInputs);
    addCheckedClass(responseTypeInpits);
});

function addMarker(map, placeData) {
    const marker = new L.marker([placeData["lat"], placeData["lng"]]);
    marker.bindPopup(`<b>${placeData["name"]}</b>`).openPopup();
    marker.addTo(map);
}

function setMap(requestData, responseData) {
    const mapContainer = L.DomUtil.get("show-map");
    if (mapContainer != null) {
        mapContainer.outerHTML = "<div id='show-map'></div>";
    }

    const mapOptions = {
        center: [requestData["lat"], requestData["lng"]],
        zoom: 10
    }

    const map = new L.map("show-map", mapOptions);
    const layer = new L.tileLayer("http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png");
    map.addLayer(layer);

    const marker = new L.marker(mapOptions.center);
    marker.bindPopup("<b>Ви знаходитесь тут</b>").openPopup();
    marker.addTo(map);
    marker._icon.classList.add("hue-change");

    for (placeIndex in responseData) {
        addMarker(map, responseData[placeIndex]);
    }
}

function setCsv(responseData) {
    const hiddenElement = document.createElement("a");
    hiddenElement.href = "data:text/csv;charset=utf-8,%EF%BB%BF" + encodeURI(responseData);
    hiddenElement.target = "_blank";
    hiddenElement.download = "places_nearby.csv";
    hiddenElement.click();
}

async function sendData(requestData, responseType) {
    const url = responseType === "map" ? "http://198.199.125.240:8888/search" : "http://198.199.125.240:8888/csv";
    try {
        const response = await fetch(url, {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestData)
        });
        if (responseType === "map") {
            const responseData = await response.json();
            setMap(requestData, responseData);
        }
        else {
            const responseData = await response.text();
            setCsv(responseData);
        }
    }
    catch (error) {
        console.error('Помилка:', error);
    }
}

function userLocation(requestData, responseType) {
    function success(position) {
        const status = document.querySelector('#show-map');
        status.textContent = 'Ваше місцезнаходження успішно визначено.';
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        requestData["lat"] = latitude;
        requestData["lng"] = longitude;
        sendData(requestData, responseType);
    }

    function error() {
        alert("Неможливо отримати Ваше місцезнаходження.");
    }

    if (!navigator.geolocation) {
        alert("Geolocation не підтримується вашим браузером.");
    }
    else {
        const status = document.querySelector('#show-map');
        status.textContent = 'Визначаємо місцезнаходження…';
        navigator.geolocation.getCurrentPosition(success, error);
    }
}

function getChosenValue(inputsContainer) {
    const inputsList = inputsContainer.getElementsByTagName("input");
    let chosenValue = "";
    [...inputsList].forEach(input => {
        if (input.checked) {
            chosenValue = input.value;
        }
    });
    return chosenValue;
}

function checkForm() {
    const placesList = document.querySelector("#places");
    const chosenPlace = placesList.value;
    if (chosenPlace === "hidden") {
        alert("Будь ласка, оберіть заклад.")
        return;
    }

    const distancesContainer = document.querySelector("#distances");
    const chosenDistance = getChosenValue(distancesContainer);
    if (chosenDistance === "") {
        alert("Будь ласка, оберіть відстань.")
        return;
    }

    const responseTypesContainer = document.querySelector("#response-types");
    const chosenResponseType = getChosenValue(responseTypesContainer);
    if (chosenResponseType === "") {
        alert("Будь ласка, оберіть тип відповіді.")
        return;
    }

    const requestData = new Object();
    requestData["query"] = chosenPlace;
    requestData["radius"] = chosenDistance;

    userLocation(requestData, chosenResponseType);
}

Завдання виконано
