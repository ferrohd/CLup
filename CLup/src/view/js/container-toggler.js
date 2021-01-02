var bottomContainer = document.getElementById("bottom-container");
var bottomToggler = document.getElementById("bottom-toggler");

if(bottomContainer && bottomToggler)
    bottomToggler.addEventListener("click", () => {
        bottomContainer.classList.toggle("closed");
    });