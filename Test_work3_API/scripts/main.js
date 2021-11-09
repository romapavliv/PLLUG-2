function addMarker(map, placeData) {
    const marker = new L.marker([placeData["lat"], placeData["lng"]]);
    marker.bindPopup(`<b>${placeData["name"]}</b>`).openPopup();
    marker.addTo(map);
}

function setMap(requestData, responseData) {
    const mapOptions = {
        center: [requestData["lat"], requestData["lng"]],
        zoom: 10
    }

    const map = new L.map("map", mapOptions);
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

async function sendData(requestData, responceType) {
    const url = responceType === "map" ? "http://198.199.125.240:8888/search" : "http://198.199.125.240:8888/csv";
    try {
        const response = await fetch(url, {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestData)
        });
        if (responceType === "map") {
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

function userLocation(requestData, responceType) {
    function success(position) {
        const status = document.querySelector('#map');
        status.textContent = 'Ваше місцезнаходження успішно визначено.';
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        requestData["lat"] = latitude;
        requestData["lng"] = longitude;
        sendData(requestData, responceType);
    }

    function error() {
        alert("Неможливо отримати Ваше місцезнаходження.");
    }

    if (!navigator.geolocation) {
        alert("Geolocation не підтримується вашим браузером.");
    }
    else {
        const status = document.querySelector('#map');
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

    const responceTypesContainer = document.querySelector("#responce-types");
    const chosenResponceType = getChosenValue(responceTypesContainer);
    if (chosenResponceType === "") {
        alert("Будь ласка, оберіть тип відповіді.")
        return;
    }

    const mapContainer = L.DomUtil.get("map");
    if (mapContainer != null) {
        mapContainer._leaflet_id = null;
    }

    const requestData = new Object();
    requestData["query"] = chosenPlace;
    requestData["radius"] = chosenDistance;

    userLocation(requestData, chosenResponceType);
}