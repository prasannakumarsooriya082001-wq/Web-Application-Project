
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


console.log("Login JS Loaded");

const loginForm = document.getElementById("loginForm");

loginForm.addEventListener("submit", function (event) {

    event.preventDefault();

    const email = document.getElementById("email").value;

    const password = document.getElementById("password").value;


    const loginData = {

        email: email,

        password: password

    };


    fetch("http://localhost:8080/customer/login", {

        method: "POST",

        headers: {

            "Content-Type": "application/json"

        },

        body: JSON.stringify(loginData)

    })

        .then(response => {

            if (!response.ok) {

                throw new Error("Invalid email or password");

            }

            return response.json();

        })

        .then(customer => {

            console.log("Login Success :", customer);

            localStorage.setItem("loggedInCustomer",JSON.stringify(customer));

            console.log("Saved Customer:",localStorage.getItem("loggedInCustomer"));

            console.log("Redirecting to Main Page...");

            window.location.replace("../Main Page/index.html");

        })

        .catch(error => {

            console.error("Login Error :", error);

            alert("Invalid email or password");

        });

});