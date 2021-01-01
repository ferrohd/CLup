document.getElementById("close-btn").addEventListener("click", avoidClose);

document.getElementById("print-btn").addEventListener("click", printTicket);

function avoidClose() {
    M.Toast.dismissAll();
    M.toast({html: "You must first print the ticket.", displayLength: (30 * 1000)});
}

function allowClose() {
    var closeBtn = document.getElementById("close-btn");
    closeBtn.removeEventListener("click", avoidClose);
    closeBtn.addEventListener("click", closePage);
}

function closePage() {
    window.location.href="/overview";
}

function printTicket() {
    window.onafterprint = allowClose;
    window.print();
}