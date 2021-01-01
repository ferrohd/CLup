document.querySelectorAll(".store").forEach(store => {
    store.addEventListener("click", (e) => {
        window.location.href = "/store?id=" + store.getAttribute("data-id");
    });
});    

document.getElementById("fix-pos-btn").addEventListener("click", getCoordinates);

function getCoordinates() {
    if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(sendPosition, catchError);
    } else {
        displayError("Geolocation is not supported by this browser.");
    }
}

function sendPosition(position) {
    window.location.href = "/explore?lat=" + position.coords.latitude + "&lng=" + position.coords.longitude;
}

function catchError(error) {
    switch(error.code) {
        case error.PERMISSION_DENIED:
            displayError("User denied the request for Geolocation");
            break;
        case error.POSITION_UNAVAILABLE:
            displayError("Location information is unavailable.");
            break;
        case error.TIMEOUT:
            displayError("The request to get user location timed out.");
            break;
        case error.UNKNOWN_ERROR:
            displayError("An unknown error occurred.");
            break;
    }
}

function displayError(errorString) {
    var button = document.getElementById("position-btn");
    button.removeEventListener("click", getCoordinates);
    button.firstChild.innerHTML = "gps_off";
    M.Toast.dismissAll();
    M.toast({html: errorString, displayLength: (30 * 1000)});
}