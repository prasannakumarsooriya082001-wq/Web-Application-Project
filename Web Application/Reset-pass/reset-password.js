const newPassword = document.getElementById("newPassword");
const confirmPassword = document.getElementById("confirmPassword");

const toggleNew = document.getElementById("toggleNewPassword");
const toggleConfirm = document.getElementById("toggleConfirmPassword");

const form = document.getElementById("resetForm");
const message = document.getElementById("matchMessage");


// =========================
// Show / Hide Password
// =========================

function togglePassword(input, icon){

    if(input.type === "password"){

        input.type = "text";

        icon.classList.remove("fa-eye");
        icon.classList.add("fa-eye-slash");

    }
    else{

        input.type = "password";

        icon.classList.remove("fa-eye-slash");
        icon.classList.add("fa-eye");

    }

}

toggleNew.addEventListener("click", () => {
    togglePassword(newPassword, toggleNew);
});

toggleConfirm.addEventListener("click", () => {
    togglePassword(confirmPassword, toggleConfirm);
});


// =========================
// Live Password Match
// =========================

function checkPassword(){

    if(confirmPassword.value === ""){

        message.textContent = "";
        return;

    }

    if(newPassword.value === confirmPassword.value){

        message.textContent = "✔ Passwords Match";
        message.style.color = "green";

    }
    else{

        message.textContent = "✖ Passwords Do Not Match";
        message.style.color = "red";

    }

}

newPassword.addEventListener("keyup", checkPassword);
confirmPassword.addEventListener("keyup", checkPassword);


// =========================
// Form Submit
// =========================

form.addEventListener("submit", function(e){

    e.preventDefault();

    if(newPassword.value.length < 8){

        alert("Password must contain at least 8 characters.");
        return;

    }

    if(newPassword.value !== confirmPassword.value){

        alert("Passwords do not match.");
        return;

    }

    alert("Password Updated Successfully!");

    // Backend connect pannumbodhu API call varum

    window.location.href="/Login Page/login.html";

});