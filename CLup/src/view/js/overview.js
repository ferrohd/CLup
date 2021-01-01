document.getElementById("scan-btn").addEventListener("click", scanTicket);

function scanTicket() {
    //TODO scan ticket
    var ticket = 1;
    document.getElementById("ticket").setAttribute("value", ticket);
    document.getElementById("form").submit();
}

document.getElementById("update-btn").addEventListener("click", showUpdate);

function showUpdate() {
    document.body.classList.add("overlayed");
}

document.getElementById("close-update-btn").addEventListener("click", hideUpdate);

function hideUpdate() {
    document.body.classList.remove("overlayed");
}