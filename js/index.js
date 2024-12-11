var userEmail = document.getElementById('userEmail');
var userPassword = document.getElementById('userPassword');
var incorrect = document.getElementById('incorrect')
var incorrectSignup = document.getElementById('incorrectSignup')
var newName = document.getElementById('newName')
var newEmail = document.getElementById('newEmail')
var newPassword = document.getElementById('newPassword')
var signUpBtn = document.querySelector('.signUpBtn')
var loginBtn = document.querySelector('.login-btn')
var userName = document.getElementById('username')
var logoutBtn = document.querySelector('.logout-btn')
var newusersList = []
function signUp() {
    newusersList = JSON.parse(localStorage.getItem('user')) || [];
    var isDuplicate = newusersList.some(user => user.uEmail === newEmail.value);
    if (isDuplicate) {
        incorrectSignup.innerHTML = "This Email already exists";
        return false;
    }
    if (validation(newEmail) || validation(newPassword) || validation(newName) || isSignupEmpty()) {
        var userObj = {
            uName: newName.value,
            uEmail: newEmail.value,
            uPassword: newPassword.value
        };
        newusersList.push(userObj);
        localStorage.setItem('user', JSON.stringify(newusersList));
        return true;
    } else {
        incorrectSignup.innerHTML = "All inputs are required";
        return false;
    }
}
function isSignupEmpty() {
    if (newEmail.value == "" || newPassword.value == "" || newName.value == "") {
        return false;
    }
    else {
        return true
    }
}
function goToLoginPage() {
    if (signUp()) {
        window.location.replace('index.html');
    }
}
function isLoginEmpty() {
    if (userEmail.value == "" || userPassword.value == "") {
        return false;
    }
    else {
        return true
    }
}
function validation(input) {
    var regex = {
        newName: /^[a-zA-z_]+$/,
        newEmail: /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[a-zA-Z]{2,}$/,
        newPassword: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
    }
    if (regex[input.id].test(input.value)) {
        input.nextElementSibling.classList.replace('d-block', 'd-none')
        input.classList.add('is-valid')
        input.classList.remove('is-invalid');
        return true;
    }
    else {
        input.nextElementSibling.classList.replace('d-none', 'd-block')
        input.classList.remove('is-valid');
        input.classList.add('is-invalid')

        return false
    }
}
function login() {
    newusersList = JSON.parse(localStorage.getItem('user'));
    var userByEmail = newusersList.find(user => user.uEmail === userEmail.value);
    if (!isLoginEmpty()) {
        incorrect.innerHTML = 'All inputs are required';
        return;
    }
    if (userByEmail) {
        if (userByEmail.uPassword === userPassword.value) {
            localStorage.setItem('loggedInUser', JSON.stringify(userByEmail));
            window.location.replace('home.html');
        } else {
            incorrect.innerHTML = "Incorrect password. Please try again.";
        }
    } else {
        incorrect.innerHTML = "Email not found. Please sign up first.";
    }
}

function logOut() {
    localStorage.removeItem('loggedInUser')
    window.location.replace('index.html');
}
document.addEventListener('DOMContentLoaded', function () {
    if (signUpBtn) {
        signUpBtn.addEventListener('click', goToLoginPage);
    }

    if (loginBtn) {
        loginBtn.addEventListener('click', login);
    }
    if (logoutBtn) {
        logoutBtn.addEventListener('click', logOut);
    }
    var loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
    if (userName && loggedInUser) {
        userName.innerHTML = `Welcome ${loggedInUser.uName}`;
    }
});