'use strict'

// Exercise 6
function validate(event) {

  event.preventDefault();
	

	// Get the input fields
	const fNameElement = document.getElementById("fName");
	const fEmailElement = document.getElementById("fEmail");
	const fLastNElement = document.getElementById("fLastN");
	const fPasswordElement = document.getElementById("fPassword");
  const fPhoneElement = document.getElementById("fPhone");
	const fAddressElement = document.getElementById("fAddress");

  const fName = fNameElement.value.trim();
  const fLastN = fLastNElement.value.trim();
  const fEmail = fEmailElement.value.trim();
  const fPassword = fPasswordElement.value.trim();
  const fPhone = fPhoneElement.value.trim();
  const fAddress = fAddressElement.value.trim();
	// Get the error elements
	//let errorName = document.getElementById("errorName");
	//let errorEmail = document.getElementById("errorEmail");
	//let errorLastN = document.getElementById("errorLastN");
	//let errorPassword = document.getElementById("errorPassword");
	//let errorPhone = document.getElementById("errorPhone");
	//let errorAddress = document.getElementById("errorAddress");

	let isValid = true;

	// Validate fields entered by the user: name, phone, password, and email
	if(fName.length < 3 || fName.match(/[0-9]/)){
		isValid = false;
    fNameElement.classList.add("is-invalid");
    
  } else {
    fNameElement.classList.remove("is-invalid");
    fNameElement.classList.add("is-valid");
  }


  if (fLastN.length < 3 || fLastN.match(/[0-9]/)) {
    isValid = false;
    fLastNElement.classList.add("is-invalid");
  } else {
    fLastNElement.classList.remove("is-invalid");
    fLastNElement.classList.add("is-valid");
  }

  
  if (fPassword.length < 4 || fPassword.length > 8 || !/[A-Za-z]/.test(fPassword) || !/[0-9]/.test(fPassword)) {
    isValid = false;
    fPasswordElement.classList.add("is-invalid");
  } else {
    fPasswordElement.classList.remove("is-invalid");
    fPasswordElement.classList.add("is-valid");
  }

  if (!fEmail.includes("@") || !fEmail.includes(".")) {
    isValid = false;
    fEmailElement.classList.add("is-invalid");
  } else {
    fEmailElement.classList.remove("is-invalid");
    fEmailElement.classList.add("is-valid")
  }

  if (fPhone.length != 9) {
    isValid = false;
    fPhoneElement.classList.add("is-invalid");
  } else {
    fPhoneElement.classList.remove("is-invalid");
    fPhoneElement.classList.add("is-valid");
  }

  if (fAddress.length < 3) {
    isValid = false;
    fAddressElement.classList.add("is-invalid");
  } else {
    fAddressElement.classList.remove("is-invalid");
    fAddressElement.classList.add("is-valid");
  }

	
  if (isValid) {
    alert("Formulario enviado exitosamente");
    document.querySelector(".form").submit();
}

}
	


