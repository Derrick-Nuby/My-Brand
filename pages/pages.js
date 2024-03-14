let errorElement = document.getElementById("errorElement");


document.getElementById("userCreationForm").addEventListener("submit", userCreation);


function userCreation(event) {
    event.preventDefault(); 
    var names = document.getElementById("names").value;
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;
    var passwordval = document.getElementById("passwordval").value;
    
    if(names.trim() === '' || email.trim() === '' || password.trim() === '' || passwordval.trim() === '') {
        showError("Your forgot to fill some fields | All fields are required!");
        return;
    }

    var hasUpperCase = /[A-Z]/.test(password);
    var hasLowerCase = /[a-z]/.test(password);
    var hasNumbers = /\d/.test(password);
    var hasSpecialChars = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    if (password.length < 8 || !hasUpperCase || !hasLowerCase || !hasNumbers || !hasSpecialChars) {
        showError("Password must be at least 8 characters long and contain uppercase letters, lowercase letters, numbers, and special characters.");
            return;
    }

    if(password !== passwordval) {
        showError("Ooops :( Passwords do not match!");
        return;
    }
    var users = JSON.parse(localStorage.getItem('users')) || {};
    for (var userId in users) {
        if (users.hasOwnProperty(userId)) {
            var user = users[userId];
            if (user.email === email) {
                showError("A user with that email already exists. | if that is you Please login or reset your password");
                return;
            }
        }
    }

    var userId = Math.floor(10000 + Math.random() * 90000);

    var user = {
        id: userId,
        names: names,
        email: email,
        password: password
    };

    var users = JSON.parse(localStorage.getItem('users')) || {};
    

    users[userId] = user;

    localStorage.setItem('users', JSON.stringify(users));
    
    alert("User created successfully with ID: " + userId);

    document.getElementById("userForm").reset();
};

function showError(message, duration = 4000) {
    var errorParagraph = errorElement.querySelector("p");
    errorParagraph.textContent = message;
    errorElement.style.display = "block";
    setTimeout(function() {
        errorElement.style.display = "none";
    }, duration);
}
