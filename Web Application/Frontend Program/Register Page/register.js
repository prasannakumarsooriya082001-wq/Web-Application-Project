const password = document.getElementById("password");
const togglePassword = document.getElementById("togglePassword");

togglePassword.addEventListener("click", () => {

    if(password.type === "password"){

        password.type = "text";
        togglePassword.classList.replace("fa-eye","fa-eye-slash");

    }
    else{

        password.type = "password";
        togglePassword.classList.replace("fa-eye-slash","fa-eye");

    }

});

const confirmPassword = document.getElementById("confirmPassword");
const toggleConfirm = document.getElementById("toggleConfirmPassword");

toggleConfirm.addEventListener("click", () => {

    if(confirmPassword.type === "password"){

        confirmPassword.type = "text";
        toggleConfirm.classList.replace("fa-eye","fa-eye-slash");

    }
    else{

        confirmPassword.type = "password";
        toggleConfirm.classList.replace("fa-eye-slash","fa-eye");

    }

});

const form = document.getElementById("registerForm");

form.addEventListener("submit",function(e){

    e.preventDefault();

    const firstName=document.getElementById("firstName").value.trim();
    const lastName=document.getElementById("lastName").value.trim();
    const email=document.getElementById("email").value.trim();
    const phone=document.getElementById("phone").value.trim();
    const password=document.getElementById("password").value;
    const confirmPassword=document.getElementById("confirmPassword").value;

    if(firstName==="" || lastName==="" || email==="" || phone==="" || password==="" || confirmPassword===""){

        alert("Please fill all fields.");
        return;

    }

    if(password !== confirmPassword){

        alert("Passwords do not match.");
        return;

    }

    alert("Registration Successful!");

});