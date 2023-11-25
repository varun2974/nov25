document.addEventListener("DOMContentLoaded", function () {
    const app = document.getElementById("app");

    // Check if the user is logged in
    const isLoggedIn = localStorage.getItem("accessToken") !== null;

    const isSignupPage = window.location.pathname.includes("signup.html");
    const isProfilePage = window.location.pathname.includes("profile.html");

    if (!isLoggedIn && isProfilePage) {
        // Redirect to Signup page if not logged in and trying to access Profile page
        redirectToSignup("You need to log in to access the Profile page.", "error");
    } else if (isLoggedIn && isSignupPage) {
        // Redirect to Profile page if logged in and trying to access Signup page
        redirectToProfile("You are already logged in. Redirecting to Profile page...", "info");
    } else if (isLoggedIn) {
        // Render Profile page if logged in
        renderProfilePage();
    } else {
        // Render Signup page if not logged in
        redirectToSignup();
    }




    function redirectToSignup(message = "", messageType = "") {
        app.innerHTML = `
            <div class="container">
            <img src="./asset/Welcome back! 👋welcome.png">
                <h4>Sign up to your account</h4>
                <form id="signupForm">
                    <label for="username" class="inputclass">Your name</label><br>

                    <input type="text" id="username" class="inputclass" required><br>

                    <label for="useremail" class="inputclass">Your email</label><br>

                    <input type="email" id="useremail" class="inputclass" required><br>

                    <label for="password" class="inputclass">Password</label><br>

                    <input type="password" id="password" class="inputclass" required><br>

                    <label for="password" class="inputclass">Confirm Password</label><br>

                    <input type="password" id="confirmpassword" class="inputclass" required><br>

                    <button type="submit" class="inputclass" id="signupbutton">Signup</button>
                </form>
                <p id="signupMessage" class="${messageType}">${message}</p>

            </div>
        `;

        const signupForm = document.getElementById("signupForm");
        const signupMessage = document.getElementById("signupMessage");

        signupForm.addEventListener("submit", function (event) {
            event.preventDefault();

            const username = document.getElementById("username").value;
            const useremail = document.getElementById("useremail").value;
            const password = document.getElementById("password").value;
            const confirmpassword = document.getElementById("confirmpassword").value;
            
            // Generate a random 16-byte access token
            const accessToken = generateAccessToken();

            // Store user details in local storage
            localStorage.setItem("username", username);
            localStorage.setItem("useremail", useremail);
            localStorage.setItem("password", password); 
            localStorage.setItem("accessToken", accessToken);

            // Display success message and redirect to Profile page
            signupMessage.textContent = "Signup successful!";
            signupMessage.className = "success";
            setTimeout(() => {
                redirectToProfile("Signup successful! Redirecting to Profile page...", "success");

                renderProfilePage();
            }, 1000);
        });
    }

    function renderProfilePage() {
        const username = localStorage.getItem("username");
        const useremail = localStorage.getItem("useremail");
        const password = localStorage.getItem("password");
        app.innerHTML = `
           <h2 id="text">Signup Successfull</h2>
            <div class="container">

                <h2 class="center">Profile</h2>
                <div class="image-container">
                <img src="./asset/Vectorcircle.png" alt="my pic">
                <img src="./asset/Vectorvector.png" alt="my pic">
                </div>
                <p class="center">Full Name: ${username}</p>
                <p class="center">Email:${useremail}</p>
                <p class="center">Password: ${password}</p> 
                <button id="logoutBtn">Logout</button>
                
            </div>
        `;

        const logoutBtn = document.getElementById("logoutBtn");

        logoutBtn.addEventListener("click", function () {
            // Clear local storage on logout
            localStorage.clear();
            // Redirect to Signup page after logout
            redirectToSignup();
        });
    }
     
    function redirectToProfile(message = "", messageType = "") {
        app.innerHTML = `
            <div class="container">
                <h2 id="text">${message}</h2>
                <h2 class="center">Profile</h2>
                <div class="image-container">
                <img src="./asset/Vectorcircle.png" alt="my pic">
                <img src="./asset/Vectorvector.png" alt="my pic">
                </div>
                <p class="center">Full Name: ${username}</p>
                <p class="center">Email:${useremail}</p>
                <p class="center">Password: ${password}</p> 
                <button id="logoutBtn">Logout</button>
            </div>
        `;

        const logoutBtn = document.getElementById("logoutBtn");

        logoutBtn.addEventListener("click", function () {
            // Clear local storage on logout
            localStorage.clear();
            // Redirect to Signup page after logout
            redirectToSignup();
        });
    }

    function generateAccessToken() {
        // A simple function to generate a random 16-byte string
        const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
        let accessToken = "";
        for (let i = 0; i < 16; i++) {
            const randomIndex = Math.floor(Math.random() * charset.length);
            accessToken += charset[randomIndex];
        }
        return accessToken;
    }
});
