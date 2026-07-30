// ==========================
// Search Category
// ==========================

const searchInput = document.getElementById("search");

searchInput.addEventListener("keyup", function () {

    const filter = searchInput.value.toLowerCase();

    const rows = document.querySelectorAll("tbody tr");

    rows.forEach(row => {

        const text = row.innerText.toLowerCase();

        if (text.includes(filter)) {

            row.style.display = "";

        }

        else {

            row.style.display = "none";

        }

    });

});


// ==========================
// Add Category
// ==========================

const addCategoryBtn = document.getElementById("add-category");

addCategoryBtn.addEventListener("click", function () {

    window.location.href = "/Add-Categories/add-categories.html";

});


// ==========================
// Edit Category
// ==========================

const editButtons = document.querySelectorAll(".edit-btn");

editButtons.forEach(button => {

    button.addEventListener("click", function () {

        console.log("Opening Edit Category");

    });

});


// ==========================
// Delete Category
// ==========================

const deleteButtons = document.querySelectorAll(".delete-btn");

deleteButtons.forEach(button => {

    button.addEventListener("click", function () {

        const row = this.closest("tr");

        if (confirm("Delete this Category?")) {

            row.remove();

            alert("Category Deleted Successfully!");

        }

    });

});


// ==========================
// Table Animation
// ==========================

const rows = document.querySelectorAll("tbody tr");

rows.forEach((row, index) => {

    row.style.opacity = "0";

    row.style.transform = "translateY(20px)";

    setTimeout(() => {

        row.style.transition = ".4s";

        row.style.opacity = "1";

        row.style.transform = "translateY(0)";

    }, index * 150);

});


// ==========================
// Button Hover Animation
// ==========================

const buttons = document.querySelectorAll(".edit-btn,.delete-btn");

buttons.forEach(button => {

    button.addEventListener("mouseenter", function () {

        this.style.transform = "scale(1.1)";

    });

    button.addEventListener("mouseleave", function () {

        this.style.transform = "scale(1)";

    });

});
