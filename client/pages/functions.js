const API_URL = 'http://localhost:4000';

// document.getElementById('userLoginForm').addEventListener('submit', userLogin);

function userLogin(event) {
    event.preventDefault();
    
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;

    fetch(`${API_URL}/api/user/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
    })
    .then(response => {
    return response.json()
    })
    .then(data => {
        if (data.error) {
            showError(data.error);
        } else {
            
            const { token } = data;
            const expiryDate = new Date(Date.now() + 1 * 24 * 60 * 60 * 1000);
            document.cookie = `jwt=${token}; Path=/; Expires=${expiryDate};`;

            localStorage.setItem('jwtToken', token);

            showError(data.message, '#10E956', 3000)
            setTimeout(function() {
                // window.location.href = './articles.html';
            }, 3000);
        }
    })
    .catch(error => {
        showError(error.message);
    });
}

function userCreation(event) {
    event.preventDefault();

    const name = document.getElementById('names').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('passwordval').value;

    fetch(`${API_URL}/api/user/create`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        
        body: JSON.stringify({ name, email, phone, password, confirmPassword })
    })
    .then(response => response.json())
    .then(data => {
        if (data.error) {
            showError(data.error);
        } else {
            showError(data.message, '#10E956', 3000);
            setTimeout(function() {
                window.location.href = './login.html';
            }, 3000);
        }
    })
    .catch(error => {
        showError(error.message);
    });
}

function userLogout(event){
    event.preventDefault();

    localStorage.removeItem('jwtToken');
    fetch(`${API_URL}/api/user/logout`, {
        method: 'GET',
        credentials: 'include'
    })
    .then(response => response.json())
    .then(data => {
        if (data.error) {
            // showError(data.error);
            console.log(data.error);
        } else {
            // showError(data.message, '#10E956', 3000);
            console.log(data.message);
        }
    })
    .catch(error => {
        // showError(error.message);
        console.error(error);
    });
}

function showError(message, color, duration = 5000) {
    const errorParagraph = errorElement.querySelector("p");
    errorParagraph.textContent = message;
    errorElement.style.display = "block";
    errorElement.style.borderColor = color;
    setTimeout(function() {
        errorElement.style.display = "none";
    }, duration);
}

function showMessage(message, color, duration = 5000) {
    const msgbox = document.getElementById('msgbox');
    const messageParagraph = msgbox.querySelector('p');
    
    msgbox.style.display = 'block';
    msgbox.style.right = '-100%';
    msgbox.style.animation = 'none';
    msgbox.style.backgroundColor = 'rgb(145, 0, 0)';

    messageParagraph.textContent = message;
    msgbox.style.backgroundColor = color;

    msgbox.offsetHeight;
    msgbox.style.animation = 'slideInFromRight 1s ease-in-out forwards';

    setTimeout(function() {
        msgbox.style.display = 'block';
        msgbox.style.animation = 'slideOutToRight 3s ease-in-out 0s forwards';
    }, duration);
        
}
