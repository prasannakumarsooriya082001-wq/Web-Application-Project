// ==========================
// Save Customer
// ==========================

const customerForm = document.getElementById("customerForm");

if (customerForm) {

    customerForm.addEventListener("submit", function (e) {

        e.preventDefault();

        const customerName = document.getElementById("customerName").value.trim();

        const email = document.getElementById("email").value.trim();

        const phone = document.getElementById("phone").value.trim();

        const address = document.getElementById("address").value.trim();

        if (customerName === "" || email === "" || phone === "" || address === "") {

            alert("Please fill all fields.");

            return;

        }

        alert("✅ Customer Added Successfully!");

        window.location.href = "/Admin-Customers/admin-customers.html";

    });

}


// ==========================
// Cancel Button
// ==========================

const cancelBtn = document.querySelector(".cancel-btn");

if (cancelBtn) {

    cancelBtn.addEventListener("click", function () {

        if (confirm("Discard changes?")) {

            window.location.href = "/Admin-Customers/admin-customers.html";

        }

    });

}


// ==========================
// Input Animation
// ==========================

const inputs = document.querySelectorAll("input, textarea, select");

inputs.forEach(input => {

    input.addEventListener("focus", function () {

        this.style.transition = ".3s";

        this.style.transform = "scale(1.02)";

    });

    input.addEventListener("blur", function () {

        this.style.transform = "scale(1)";

    });

});


// ==========================
// Form Animation
// ==========================

const formCard = document.querySelector(".form-card");

if (formCard) {

    formCard.style.opacity = "0";

    formCard.style.transform = "translateY(30px)";

    setTimeout(() => {

        formCard.style.transition = ".5s";

        formCard.style.opacity = "1";

        formCard.style.transform = "translateY(0)";

    }, 200);

}
