var ticketId = document.getElementById("ticket-id");

document.querySelectorAll(".ticket").forEach(ticket => {
    ticket.addEventListener("click", openDeleteTicket);
})

document.getElementById("close-delete-btn").addEventListener("click", closeDeleteTicket);

function openDeleteTicket(e) {
    e.preventDefault();
    var ticket = e.target.closest(".ticket");
    ticketId.setAttribute("value", ticket.getAttribute("data-id"));
    document.body.classList.add("overlayed");
}

function closeDeleteTicket() {
    document.body.classList.remove("overlayed");
    ticketId.setAttribute("value", "");
}