//Bottom container toggler
var bottomContainer = document.getElementById("bottom-container");
var bottomToggler = document.getElementById("bottom-toggler");
var timeout;

if(bottomContainer && bottomToggler) 
    closeContainer();

function openContainer() {
    bottomContainer.classList.remove("closed");
    timeout = setTimeout(() => {
        bottomContainer.classList.add("overflow");
    }, 350);
    bottomToggler.removeEventListener("click", openContainer);
    bottomToggler.addEventListener("click", closeContainer);
}

function closeContainer() {
    bottomContainer.classList.add("closed");
    clearTimeout(timeout);
    bottomContainer.classList.remove("overflow");
    bottomToggler.removeEventListener("click", closeContainer);
    bottomToggler.addEventListener("click", openContainer);
}

//Disabled button message
document.querySelectorAll(".btn.disable").forEach(btn => {
    btn.addEventListener("click", showMessage);
});

function showMessage(e) {
    var message = e.target.getAttribute("data-msg");
    if(message)
        M.toast({html: message, displayLength: (30 * 1000)});
}