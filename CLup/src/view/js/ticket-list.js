document.querySelectorAll(".ticket-icon").forEach(ticket => {
    ticket.addEventListener("click", () => {
        alert("click");
        document.getElementById("ticket-id").setAttribute("value", ticket.getAttribute("data-id"));
        document.getElementById("form").submit();
    })
})