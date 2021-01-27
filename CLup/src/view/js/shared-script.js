//Disabled button message
document.querySelectorAll(".btn.disable").forEach(btn => {
    btn.addEventListener("click", showMessage);
});

function showMessage(e) {
    var message = e.target.getAttribute("data-msg");
    if(message)
        M.toast({html: message, displayLength: (30 * 1000)});
}