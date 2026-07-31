const form = document.getElementById("forgotForm");

form.addEventListener("submit", function(e){

    e.preventDefault();

    const email = document.getElementById("email").value.trim();

    if(email === ""){

        alert("Please enter your email.");
        return;
    }

    // Temporary (Backend later)
    window.location.href = "/Verify-pass/verify-otp.html";

});