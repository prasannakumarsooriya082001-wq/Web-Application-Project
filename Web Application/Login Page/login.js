const password = document.getElementById("password");
const toggle = document.getElementById("togglePassword");

toggle.addEventListener("click", () => {

    if (password.type === "password") {

        password.type = "text";
        toggle.classList.replace("fa-eye", "fa-eye-slash");

    } else {

        password.type = "password";
        toggle.classList.replace("fa-eye-slash", "fa-eye");

    }

    password.focus();

});


const form = document.getElementById("loginForm");

form.addEventListener("submit", function(e){

    e.preventDefault();

    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;

    if(email === "" || password === ""){

        alert("Please fill all fields");

        return;

    }

    alert("Login Successful");

    window.location.href="/Main Page/index.html";

});