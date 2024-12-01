const nameInput = document.getElementById("name");
const otherJobRole = document.getElementById("other-job-role")
const jobTitleInput = document.getElementById("title");
const shirtColor = document.getElementById("color");
const shirtDesign = document.getElementById("design");
const selectedPayment = document.getElementById("payment");
const shirtColorOptions = document.querySelectorAll("[data-theme]");




// On load options
window.addEventListener("load", (event) => {
  nameInput.focus();
  otherJobRole.style.display = "none";
  shirtColor.disabled = true;
  selectedPayment.querySelector('[value="credit-card"]').selected = true;
  showSelectedPayment();
});


// Job title select change
jobTitleInput.addEventListener("change", () => {
  if (jobTitleInput.value === "other") {
    otherJobRole.style.display = "block";
  }
})


// SHIRT SECTION START
// Shirt design correlation 
shirtDesign.addEventListener("change", () => {
  var selectedDesign = shirtDesign.value;
  if (shirtDesign.value) {
    shirtColor.disabled = false;
    
    for (i = 0; shirtColorOptions.length > i; i++) {
      if (shirtColorOptions[i].dataset.theme !== selectedDesign) {
        shirtColorOptions[i].hidden = true;
      } else {
        shirtColorOptions[i].hidden = false;
      }
    }
  } else {
    shirtColor.disabled = true;
  }
})

// SHIRT SECTION END


// ACTIVITIES SECTION START
const activities = document.getElementById("activities");
const cost = document.getElementById('activities-cost');


// Total cost addition
activities.addEventListener("change", () => {
  const selectedActivities = activities.querySelectorAll('input:checked');
  var totalCost = 0;
  for (i = 0; selectedActivities.length > i; i++) {
    totalCost += parseInt(selectedActivities[i].dataset.cost); 
  } 

  cost.innerHTML = `Total: $${totalCost}`;
})

// ACTIVITIES SECTION END

// PAYMENT SECTION START
const paymentContainer = document.querySelector('.payment-methods');
const paymentMethods = document.querySelectorAll('.payment-methods > div');

function showSelectedPayment() {
  for (i = 0; i < paymentMethods.length; i++) {
    var selectedPaymentVal = selectedPayment.value;

    if (paymentMethods[i].classList.contains(selectedPaymentVal) || paymentMethods[i].classList.contains('payment-method-box')) {
      paymentMethods[i].style.display = "block";
    } else {
      paymentMethods[i].style.display = "none";
    }
  }
}

paymentContainer.addEventListener('change', () => {
  showSelectedPayment();
});

// PAYMENT SECTION END

// FORM VALIDATION START

const form = document.querySelector('form');
// name declared above
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const telephoneInput = document.getElementById("telephone");
const creditCard = document.getElementById("cc-num");
const zipCode = document.getElementById("zip");
const cvv = document.getElementById("cvv");

function hideHint(showHint, element) {
  // show element when showHint is false, hide when false
  if (!showHint) {
    // Show errors 
    element.style.display = "block";
    element.closest('fieldset').classList.add('not-valid');
    element.closest('fieldset').classList.remove('valid');
  } else {
    // Hide errors 
    element.style.display = "none";
    element.closest('fieldset').classList.add('valid');
    element.closest('fieldset').classList.remove('not-valid');
  }
}

function isValidText(text) {
  return /(.|\s)*\S(.|\s)*/.test(text);
}

// Must be a valid email address
function isValidEmail(email) {
  return /^[^@]+@[^@.]+\.[a-z]+$/i.test(email);
}

// Must be a valid creditcard
function isValidCreditCard(card) {
  return /^\d{13,16}$/i.test(card);
}

// Must be a valid zipcode
function isValidZip(zip) {
  return /^\d{5}$/i.test(zip);
}

// Must be a valid CVV
function isValidCvv(cvv) {
  return /^\d{3}$/i.test(cvv);
}

// Activities validation
function activitesSelected() {
  var selected = activities.querySelector('input:checked');
  const hint = activities.querySelector('.activities-hint');
  if (selected) {
    // Show errors 
    hideHint(true, hint);
    activities.classList.remove('not-valid');
    activities.classList.add('valid');
    return false;
  } else {
    // Hide errors 
    hideHint(false, hint);
    activities.classList.remove('valid');
    activities.classList.add('not-valid');
    return true;
  }
}

// function to select validator and element to check, wanted to shoot miself here
function formValidator(validator, element) {
  var text = element.value;
  const valid = validator(text);
  // if text is not empty and is valid
  const showHint = text !== "" && valid;
  const hint = element.nextElementSibling;
  hideHint(showHint, hint);
  return valid;
}

// Checkbox focus and blur
const checkboxes = document.querySelectorAll('input[type=checkbox]');
checkboxes.forEach(checkbox => {
  checkbox.addEventListener('focus', () => {
    checkbox.classList.add('focus');
    checkbox.parentElement.classList.add('focus');
  })
  
  checkbox.addEventListener('blur', () => {
    checkbox.classList.remove('focus');
    checkbox.parentElement.classList.remove('focus');
  })
});

// Validation function
function passValidation() {
  validationPass = [];
  validationPass.push(formValidator(isValidText, nameInput));
  validationPass.push(formValidator(isValidEmail, emailInput));
  validationPass.push(activitesSelected());
  
  if (selectedPayment.value === 'credit-card') {
    validationPass.push(formValidator(isValidCreditCard, creditCard));
    validationPass.push(formValidator(isValidZip, zip));
    validationPass.push(formValidator(isValidCvv, cvv));
  }

  return (validationPass.indexOf(false) === -1);
};

// FORM VALIDATION END
form.addEventListener('submit', (event) => {
    event.preventDefault();
  if (passValidation()) {
    form.submit()
  }
  // isValidEmail(email);
});

