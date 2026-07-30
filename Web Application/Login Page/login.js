
// ================= PASSWORD TOGGLE =================

const password = document.getElementById("password");
const togglePassword = document.getElementById("togglePassword");

togglePassword.addEventListener("click", () => {

    if (password.type === "password") {

        password.type = "text";

        togglePassword.classList.remove("fa-eye");
        togglePassword.classList.add("fa-eye-slash");

    } else {

        password.type = "password";

        togglePassword.classList.remove("fa-eye-slash");
        togglePassword.classList.add("fa-eye");

    }

});


// ================= LOGIN TABS =================

const userTab = document.getElementById("userTab");
const adminTab = document.getElementById("adminTab");

const loginTitle = document.getElementById("loginTitle");
const loginDescription = document.getElementById("loginDescription");

const registerLink = document.getElementById("registerLink");
const forgotPasswordLink = document.getElementById("forgotPasswordLink");


// ---------- USER TAB ----------

userTab.addEventListener("click", () => {

    userTab.classList.add("active");
    adminTab.classList.remove("active");

    loginTitle.textContent = "Welcome Back";

    loginDescription.textContent =
        "Login to continue shopping.";

    registerLink.style.display = "block";

    forgotPasswordLink.style.display = "inline";

});


// ---------- ADMIN TAB ----------

adminTab.addEventListener("click", () => {

    adminTab.classList.add("active");
    userTab.classList.remove("active");

    loginTitle.textContent = "Administrator Login";

    loginDescription.textContent =
        "Login to manage products, orders and customers.";

    registerLink.style.display = "none";

    forgotPasswordLink.style.display = "none";

});


// ================= LOGIN FORM =================

const loginForm = document.getElementById("loginForm");

loginForm.addEventListener("submit", (e) => {

    e.preventDefault();

    if (userTab.classList.contains("active")) {

        alert("User Login");

        // Later:
        // window.location.href = "/Home/home.html";

    } else {

        alert("Admin Login");

        // Later:
        // window.location.href = "/Admin/dashboard.html";

    }

});