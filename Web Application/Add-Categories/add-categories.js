// ==========================
// Form Elements
// ==========================

const categoryForm = document.getElementById("categoryForm");

const categoryName = document.getElementById("categoryName");

const categoryId = document.getElementById("categoryId");

const description = document.getElementById("description");

const totalProducts = document.getElementById("totalProducts");

const status = document.getElementById("status");

const cancelBtn = document.querySelector(".cancel-btn");


// ==========================
// Auto Generate Category ID
// ==========================

window.addEventListener("load", function () {

    const randomId = Math.floor(Math.random() * 900 + 100);

    categoryId.value = "CAT" + randomId;

});


// ==========================
// Save Category
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

    alert("Category Added Successfully!");

    window.location.href = "/Categories/categories.html";

});


// ==========================
// Cancel Button
// ==========================

cancelBtn.addEventListener("click", function () {

    const confirmCancel = confirm("Discard Changes?");

    if (confirmCancel) {

        window.location.href = "/Categories/categories.html";

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
// Focus Effect
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
// Form Animation
// ==========================

const card = document.querySelector(".card");

card.style.opacity = "0";

card.style.transform = "translateY(30px)";

setTimeout(() => {

    card.style.transition = ".5s";

    card.style.opacity = "1";

    card.style.transform = "translateY(0)";

}, 200);
