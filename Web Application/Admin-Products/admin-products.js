// ================================
// Search Product
// ================================

const searchInput = document.getElementById("search");

searchInput.addEventListener("keyup", function () {

    const filter = searchInput.value.toLowerCase();

    const rows = document.querySelectorAll("tbody tr");

    rows.forEach(function (row) {

        const productName = row.children[1].textContent.toLowerCase();

        if (productName.includes(filter)) {

            row.style.display = "";

        } else {

            row.style.display = "none";

        }

    });

});


// ================================
// Category Filter
// ================================

const categoryFilter = document.getElementById("category");

categoryFilter.addEventListener("change", function () {

    const value = this.value.toLowerCase();

    const rows = document.querySelectorAll("tbody tr");

    rows.forEach(function (row) {

        const category = row.children[2].textContent.toLowerCase();

        if (value === "all" || category.includes(value)) {

            row.style.display = "";

        } else {

            row.style.display = "none";

        }

    });

});


// ================================
// Add Product Button
// ================================

const addBtn = document.getElementById("add-product");

addBtn.addEventListener("click", function () {

    window.location.href = "/Add-Products/add-products.html";

});


// ================================
// Edit Product
// ================================

const editButtons = document.querySelectorAll(".edit-btn");

editButtons.forEach(function (button) {

    button.addEventListener("click", function () {

        alert("Edit Product Page");

        // Backend connect pannumbodhu
        // window.location.href="edit-product.html?id=1";

    });

});


// ================================
// Delete Product
// ================================

const deleteButtons = document.querySelectorAll(".delete-btn");

deleteButtons.forEach(function (button) {

    button.addEventListener("click", function () {

        const confirmDelete = confirm("Are you sure you want to delete this product?");

        if (confirmDelete) {

            button.closest("tr").remove();

            alert("Product Deleted Successfully");

        }

    });

});


// ================================
// Card Animation
// ================================

const table = document.querySelector(".table-wrapper");

table.style.opacity = "0";
table.style.transform = "translateY(30px)";

setTimeout(function () {

    table.style.transition = ".5s";

    table.style.opacity = "1";

    table.style.transform = "translateY(0)";

}, 200);