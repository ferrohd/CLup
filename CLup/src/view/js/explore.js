document.getElementById("pos-btn").addEventListener("click", getCoordinates);

function getCoordinates() {
    if(navigator.geolocation) {
        setPreloader();
        navigator.geolocation.getCurrentPosition(sendPosition, catchError);
    } else {
        displayError("Geolocation is not supported by this browser.");
    }
}

function setPreloader() {
    var preloader = `<div class="preloader-wrapper small active">
                        <div class="spinner-layer">
                        <div class="circle-clipper left">
                            <div class="circle"></div>
                        </div><div class="gap-patch">
                            <div class="circle"></div>
                        </div><div class="circle-clipper right">
                            <div class="circle"></div>
                        </div>
                        </div>
                    </div>`
    document.getElementById("pos-btn").innerHTML = preloader;
}

function sendPosition(position) {
    document.getElementById("lat").setAttribute("value", position.coords.latitude);
    document.getElementById("lng").setAttribute("value", position.coords.longitude);
    document.getElementById("form").submit();
}

function catchError(error) {
    switch(error.code) {
        case error.PERMISSION_DENIED:
            displayError("User denied the request for Geolocation.");
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
    var button = document.getElementById("pos-btn");
    button.removeEventListener("click", getCoordinates);
    button.innerHTML = "<i class='material-icons'>gps_off</i>";
    M.Toast.dismissAll();
    M.toast({html: errorString, displayLength: (30 * 1000)});
}