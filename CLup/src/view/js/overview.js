import QrScanner from './qr-scanner.min.js';
QrScanner.WROKER_PATH = './qr-scanner-worker.min.js';
const qrScanner = new QrScanner(document.getElementById("camera-feed"), stopScanner);

document.getElementById("scan-btn").addEventListener("click", startScanner);
document.getElementById("close-camera-btn").addEventListener("click", stopScanner);

function startScanner() {
    if(!QrScanner.hasCamera()) {
        M.toast({html: "No camera found. Please login from another device.", displayLength: (30 * 1000)});
        return;
    }
    qrScanner.start();
    document.body.classList.add("scanning");
}

function stopScanner(result) {
    document.body.classList.remove("scanning");
    qrScanner.stop()
    if(!result.target) {
        document.getElementById("ticket").setAttribute("value", result);
        document.getElementById("form").submit();
    }
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