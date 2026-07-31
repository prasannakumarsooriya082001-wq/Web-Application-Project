// =====================================
// Save Profile
// =====================================

const profileForm = document.getElementById("profileForm");

if(profileForm){

    profileForm.addEventListener("submit", function(e){

        e.preventDefault();

        const name = document.getElementById("name").value.trim();

        const email = document.getElementById("email").value.trim();

        const phone = document.getElementById("phone").value.trim();

        if(name === "" || email === "" || phone === ""){

            alert("Please fill all profile details.");

            return;

        }

        alert("✅ Profile Updated Successfully!");

    });

}



// =====================================
// Show / Hide Password
// =====================================

const togglePassword = document.querySelectorAll(".toggle-password");

togglePassword.forEach(icon => {

    icon.addEventListener("click", function(){

        const input = this.previousElementSibling;

        if(input.type === "password"){

            input.type = "text";

            this.classList.remove("fa-eye");

            this.classList.add("fa-eye-slash");

        }

        else{

            input.type = "password";

            this.classList.remove("fa-eye-slash");

            this.classList.add("fa-eye");

        }

    });

});


// =====================================
// Update Password
// =====================================

const passwordForm = document.getElementById("passwordForm");

if(passwordForm){

    passwordForm.addEventListener("submit", function(e){

        e.preventDefault();

        const currentPassword = document.getElementById("currentPassword").value.trim();

        const newPassword = document.getElementById("newPassword").value.trim();

        const confirmPassword = document.getElementById("confirmPassword").value.trim();

        // Empty Validation

        if(currentPassword === "" || newPassword === "" || confirmPassword === ""){

            alert("Please fill all password fields.");

            return;

        }

        // Password Length

        if(newPassword.length < 6){

            alert("New Password must contain at least 6 characters.");

            return;

        }

        // Password Match

        if(newPassword !== confirmPassword){

            alert("New Password and Confirm Password do not match.");

            return;

        }

        alert("✅ Password Updated Successfully!");

        passwordForm.reset();

    });

}





// =====================================
// Save All Settings
// =====================================

const saveSettingsBtn = document.getElementById("saveSettingsBtn");

if(saveSettingsBtn){

    saveSettingsBtn.addEventListener("click", function(){

        alert("✅ All Settings Saved Successfully!");

    });

}


// =====================================
// Cards Animation
// =====================================

const cards = document.querySelectorAll(".card");

cards.forEach((card,index)=>{

    card.style.opacity="0";

    card.style.transform="translateY(30px)";

    setTimeout(()=>{

        card.style.transition=".5s";

        card.style.opacity="1";

        card.style.transform="translateY(0)";

    },index*150);

});
