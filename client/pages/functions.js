document.getElementById('userLoginForm').addEventListener('submit', userLogin);

function userLogin(event) {
    event.preventDefault();

    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;

    fetch('http://localhost:4000/api/user/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Failed to login');
        }
        return response.json();
    })
    .then(data => {
        console.log('Login successful:', data);
        // window.location.href = '../index.html';
    })
    .catch(error => {
        showError(error.message)
    });
}

// document.getElementById('userCreationForm').addEventListener('submit', userCreation);

function userCreation(event) {
    event.preventDefault();

    const name = document.getElementById('names').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('passwordval').value;

    // if (password !== passwordval) {
    //     showError("Passwords do not match");
    //     return;
    // }

    fetch('http://localhost:4000/api/user/create', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, email, phone, password, confirmPassword })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Failed to create account');
        }
        return response.json();
    })
    .then(data => {
        // console.log('Account created successfully:', data);
        // window.location.href = './login.html';
        if (data.error) {
            throw new Error(data.error);
        }
    })
    .catch(error => {
        showError(error.message);
    });
}

function showError(message, duration = 4000) {
    const errorParagraph = errorElement.querySelector("p");
    errorParagraph.textContent = message;
    errorElement.style.display = "block";
    setTimeout(function() {
        errorElement.style.display = "none";
    }, duration);
}


function showError(message, duration = 4000) {
    var errorParagraph = errorElement.querySelector("p");
    errorParagraph.textContent = message;
    errorElement.style.display = "block";
    setTimeout(function() {
        errorElement.style.display = "none";
    }, duration);
}