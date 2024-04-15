const API_URL = 'http://localhost:4000';

function fetchUsers() {
fetch(`${API_URL}/api/user/all`)
.then(response => response.json())
.then(data => {
    if (data) {
        populateUsers(data.users);
        // console.log(data.comments);
    } else {
        console.error('No users found');
    }
})
.catch(error => {
    console.error('Error fetching users');
});

}

function populateUsers(users) {
    const usersContainer = document.querySelector('.realcomments');

    usersContainer.innerHTML = '';

    users.forEach(user => {
        const userElement = document.createElement('div');
        userElement.classList.add('comment');
    
        const userHeader = document.createElement('div');
        userHeader.classList.add('cmnthd', 'code', 'scolor');
    
        // const headerP = document.createElement('p');
        // headerP.textContent = `${user.name}`;
        // userHeader.appendChild(headerP);
    
        const optionsP = document.createElement('p');
        const deleteSpan = document.createElement('span');
        deleteSpan.id = 'deleteUser';
        deleteSpan.textContent = 'Delete';
        deleteSpan.setAttribute('data-id', user._id);
        optionsP.appendChild(deleteSpan);
        userHeader.appendChild(optionsP);
        userElement.appendChild(userHeader);
    
        const userName = document.createElement('p');
        userName.textContent = `Name: ${user.name}`;
        userElement.appendChild(userName);

        const userEmail = document.createElement('p');
        userEmail.textContent = `Email: ${user.email}`;
        userElement.appendChild(userEmail);

        const userPhone = document.createElement('p');
        userPhone.textContent = `Phone: ${user.phone}`;
        userElement.appendChild(userPhone);

        const userIsAdmin = document.createElement('p');
        userIsAdmin.textContent = `Is Admin: ${user.isAdmin}`;
        userElement.appendChild(userIsAdmin);
        
        const userId = document.createElement('p');
        userId.textContent = `User ID: ${user._id}`;
        userElement.appendChild(userId);

        usersContainer.appendChild(userElement);
    });
}



document.addEventListener('DOMContentLoaded', () => {
    fetchUsers();
});


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