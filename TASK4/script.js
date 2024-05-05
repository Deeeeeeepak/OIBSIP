var users = []; // Array to store registered users

function showLogin() {
    var loginContainer = document.getElementById("loginContainer");
    var forgotPasswordContainer = document.getElementById("forgotPasswordContainer");
    var registrationContainer = document.getElementById("registrationContainer");
    loginContainer.style.display = "block";
    forgotPasswordContainer.style.display = "none";
    registrationContainer.style.display = "none";
}

function showForgotPassword() {
    var loginContainer = document.getElementById("loginContainer");
    var forgotPasswordContainer = document.getElementById("forgotPasswordContainer");
    var registrationContainer = document.getElementById("registrationContainer");
    loginContainer.style.display = "none";
    forgotPasswordContainer.style.display = "block";
    registrationContainer.style.display = "none";
}

function showRegistration() {
    var loginContainer = document.getElementById("loginContainer");
    var forgotPasswordContainer = document.getElementById("forgotPasswordContainer");
    var registrationContainer = document.getElementById("registrationContainer");
    loginContainer.style.display = "none";
    forgotPasswordContainer.style.display = "none";
    registrationContainer.style.display = "block";
}

function clearFields() {
    document.getElementById("username").value = "";
    document.getElementById("password").value = "";
}

function validatePassword(password) {
    // Password must be at least 8 characters long and contain at least one digit, one lowercase letter, one uppercase letter, and one special character
    var passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+]).{8,}$/;
    return passwordRegex.test(password);
}

document.getElementById("loginForm").addEventListener("submit", function(event) {
    event.preventDefault();
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;

    // Find the user in the array based on the username or email
    var user = users.find(function(user) {
        return user.username === username || user.email === username;
    });

    if (!user) {
        document.getElementById("errorMessage").innerText = "User not found.";
        clearFields();
        return;
    }

    // Simulate backend authentication by comparing password hashes
    if (user.password === hashPassword(password)) {
        // Store user's name in sessionStorage
        sessionStorage.setItem('userName', user.fullname); // Ensure 'fullname' is correct property to use
        // Redirect to welcome.html after successful login
        window.location.href = "welcome.html";
    } else {
        document.getElementById("errorMessage").innerText = "Incorrect password.";
        clearFields();
    }
});


document.getElementById("registrationForm").addEventListener("submit", function(event) {
    event.preventDefault();
    var fullname = document.getElementById("fullname").value;
    var email = document.getElementById("email").value;
    var password = document.getElementById("regPassword").value;

    // Validate registration form fields
    if (fullname.trim() === "" || email.trim() === "" || password.trim() === "") {
        document.getElementById("registrationErrorMessage").innerText = "All fields are required.";
        return;
    }

    // Check if the email is already registered
    if (users.some(function(user) { return user.email === email; })) {
        document.getElementById("registrationErrorMessage").innerText = "Email already registered.";
        return;
    }

    // Validate password strength
    if (!validatePassword(password)) {
        document.getElementById("registrationErrorMessage").innerText = "Password must be at least 8 characters long and contain at least one digit, one lowercase letter, one uppercase letter, and one special character.";
        return;
    }

    // Add the user to the array
    users.push({ fullname: fullname, email: email, password: hashPassword(password) });
    // Reset registration form
    document.getElementById("registrationForm").reset();

    // Display success message
    document.getElementById("registrationErrorMessage").innerText = "Registration successful. Please login.";
});

document.getElementById("forgotPasswordForm").addEventListener("submit", function(event) {
    event.preventDefault();
    var email = document.getElementById("forgotPasswordEmail").value;

    // Simulate sending reset password email (replace with actual backend logic)
    // For demonstration purposes, just display a message
    document.getElementById("forgotPasswordMessage").innerText = "Password reset instructions have been sent to your email.";
});

function hashPassword(password) {
    // Replace this with actual password hashing algorithm (e.g., bcrypt)
    // For demonstration purposes, just return the password
    return password;
}
