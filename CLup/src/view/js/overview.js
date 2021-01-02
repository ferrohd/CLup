document.getElementById("scan-btn").addEventListener("click", scanTicket);

function scanTicket() {
    //TODO scan ticket
    var ticket = "e582875f22878cd567ad2d069ffa10e3dd9c8b35f5aef";
    document.getElementById("ticket").setAttribute("value", ticket);
    document.getElementById("form").submit();
}

document.getElementById("update-btn").addEventListener("click", showUpdate);

function showUpdate(e) {
    e.preventDefault();
    document.body.classList.add("overlayed");
}

document.getElementById("close-update-btn").addEventListener("click", hideUpdate);

function hideUpdate() {
    document.body.classList.remove("overlayed");
    document.getElementById("capacity").setAttribute("value", "");
}