const form = document.getElementById('form');
const name = document.getElementById('name');
const email = document.getElementById('email');
const subject = document.getElementById('subject');
// CHANGED: id of textarea so now it has nicer name after processing by getFieldName()
const message = document.getElementById('message');


// Show input error message
function showError(input, message) {
    const formControl = input.parentElement;
    formControl.className = 'form-control error';
    const small = formControl.querySelector('small');
    small.innerText = message;
}

// Show success outline
function showSuccess(input) {
    const formControl = input.parentElement;
    formControl.className = 'form-control success';
}

// Check email is valid
function checkEmail(input) {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if(re.test(input.value.trim())) {
            showSuccess(input);
        } else {
            showError(input, 'Email is not valid')
        }
}

// Check required fields
function checkRequired(inputArr) {
    inputArr.forEach(function(input) {
            if(input.value.trim() === '') {
                showError(input, `${getFieldName(input)} is required`);
            } else {
                showSuccess(input);
            }
    });
}

// Check input lengths
// CHANGED: added infinity as max so we don't need to pass any value there is max length is not specified
function checkLength(input, min, max = Infinity) {
    if(input.value.length < min) {
        showError(input, `${getFieldName(input)} must be at least ${min} characters `)
    } else if(input.value.length > max) {
        showError(input, `${getFieldName(input)} must be less than ${max} characters`)
    } else {
        showSuccess(input);
    }
}

// Get fieldname
function getFieldName(input) {
    return input.id.charAt(0).toUpperCase() + input.id.slice(1);
};

// Event Listeners
form.addEventListener('submit', function(e) {
    e.preventDefault();

    // CHANGED: Added 'message' to array of things to validate
    checkRequired([name, email, subject, message]);
    checkLength(name, 2, 40);
    checkLength(subject, 5, 25);
    checkLength(message, 20); // CHANGED: added check of length
    checkEmail(email);
});

