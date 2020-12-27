/**
 * AJAX call management
 */

function submitForm(id = "form") {
	var form = document.getElementById(id);

	if(!form.checkValidity()) {
		form.reportValidity();
		return;
	}

	var src = form.getAttribute("data-src");
	var target = form.getAttribute("data-target");

	makeCall("POST", form.getAttribute("data-src"), form, req => {
		if(req.readyState == XMLHttpRequest.DONE) {
			if(req.status == 200) {
				window.location.href = target;
			} else {
				M.toast({html: req.responseText, displayLength: (60 * 60 * 1000)});
			}
		}
	});
}

function makeCall(method, url, formElement, cback, reset = true) {
	var req = new XMLHttpRequest(); // visible by closure
	req.onreadystatechange = function() {
		cback(req)
	}; // closure
	req.open(method, url);
	if (formElement == null) {
		req.send();
	} else {
		const formData = new FormData(formElement)
		// formData sembra vuoto WTF
		req.send(formData);
	}
	if (formElement !== null && reset === true) {
		formElement.reset();
	}
}
