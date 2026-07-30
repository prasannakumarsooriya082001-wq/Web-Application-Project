// ==========================
// Form Elements
// ==========================

const categoryForm = document.getElementById("categoryForm");

const categoryName = document.getElementById("categoryName");

const categoryId = document.getElementById("categoryId");

const description = document.getElementById("description");

const totalProducts = document.getElementById("totalProducts");

const status = document.getElementById("status");

const updateBtn = document.querySelector(".update-btn");

const cancelBtn = document.querySelector(".cancel-btn");



// ==========================
// Update Category
// ==========================

categoryForm.addEventListener("submit", function (e) {

    e.preventDefault();

    if (

        categoryName.value.trim() === "" ||

        description.value.trim() === ""

    ) {

        alert("Please Fill All Required Fields!");

        return;

    }

    if (confirm("Update this Category?")) {

        alert("✅ Category Updated Successfully!");

        window.location.href = "/Admin-Categories/admin-categories.html";

    }

});


// ==========================
// Cancel Button
// ==========================

cancelBtn.addEventListener("click", function () {

    if (confirm("Discard Changes?")) {

        window.location.href = "/Admin-Categories/admin-categories.html";

    }

});


// ==========================
// Live Character Counter
// ==========================

description.addEventListener("input", function () {

    console.log(

        "Description Length :",

        description.value.length

    );

});


// ==========================
// Input Focus Effect
// ==========================

const inputs = document.querySelectorAll(

    "input, textarea, select"

);

inputs.forEach(input => {

    input.addEventListener("focus", function () {

        this.style.boxShadow =

        "0 0 8px rgba(166,87,46,.3)";

    });

    input.addEventListener("blur", function () {

        this.style.boxShadow = "none";

    });

});


// ==========================
// Card Animation
// ==========================

const card = document.querySelector(".card");

card.style.opacity = "0";

card.style.transform = "translateY(30px)";

setTimeout(() => {

    card.style.transition = ".5s";

    card.style.opacity = "1";

    card.style.transform = "translateY(0)";

}, 200);