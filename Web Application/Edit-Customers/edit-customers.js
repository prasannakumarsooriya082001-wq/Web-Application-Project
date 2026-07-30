// ==========================
// Dummy Customer Data
// ==========================

document.addEventListener("DOMContentLoaded", function () {

    document.getElementById("customerName").value = "Prasanna Kumar";

    document.getElementById("email").value = "prasanna@gmail.com";

    document.getElementById("phone").value = "9876543210";

    document.getElementById("status").value = "Active";

    document.getElementById("address").value =
        "12, Anna Nagar,\nMadurai,\nTamil Nadu - 625020";

});


// ==========================
// Update Customer
// ==========================

const customerForm = document.getElementById("customerForm");

customerForm.addEventListener("submit", function (e) {

    e.preventDefault();

    alert("✅ Customer Updated Successfully!");

    window.location.href = "/Admin-Customers/admin-customers.html";

});


// ==========================
// Cancel Button
// ==========================

const cancelBtn = document.querySelector(".cancel-btn");

cancelBtn.addEventListener("click", function () {

    if (confirm("Discard Changes?")) {

        window.location.href = "/Admin-Customers/admin-customers.html";

    }

});


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

formCard.style.opacity = "0";

formCard.style.transform = "translateY(30px)";

setTimeout(() => {

    formCard.style.transition = ".5s";

    formCard.style.opacity = "1";

    formCard.style.transform = "translateY(0)";

}, 200);
