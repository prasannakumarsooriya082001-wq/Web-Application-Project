// ==========================
// Add Customer
// ==========================

const addCustomer = document.getElementById("addCustomer");

if (addCustomer) {

    addCustomer.addEventListener("click", function () {

        window.location.href = "/Add-Customers/add-customers.html";

    });

}


// ==========================
// Search Customers
// ==========================

const searchInput = document.getElementById("search");

if (searchInput) {

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

}


// ==========================
// Filter Customers
// ==========================

const statusFilter = document.getElementById("statusFilter");

if (statusFilter) {

    statusFilter.addEventListener("change", function () {

        const value = statusFilter.value.toLowerCase();

        const rows = document.querySelectorAll("tbody tr");

        rows.forEach(row => {

            const status = row.querySelector("span").innerText.toLowerCase();

            if (value === "all") {

                row.style.display = "";

            }

            else if (status === value) {

                row.style.display = "";

            }

            else {

                row.style.display = "none";

            }

        });

    });

}


// ==========================
// Delete Customer
// ==========================

const deleteButtons = document.querySelectorAll(".delete-btn");

deleteButtons.forEach(button => {

    button.addEventListener("click", function () {

        if (confirm("Are you sure you want to delete this customer?")) {

            this.closest("tr").remove();

            alert("✅ Customer Deleted Successfully!");

        }

    });

});


// ==========================
// View Customer
// ==========================

const viewButtons = document.querySelectorAll(".view-btn");

viewButtons.forEach(button => {

    button.addEventListener("click", function () {

        console.log("Opening Customer Details...");

    });

});


// ==========================
// Edit Customer
// ==========================

const editButtons = document.querySelectorAll(".edit-btn");

editButtons.forEach(button => {

    button.addEventListener("click", function () {

        console.log("Opening Edit Customer Page...");

    });

});


// ==========================
// Row Animation
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
// Page Loaded
// ==========================

window.addEventListener("load", function () {

    console.log("Customers Page Loaded Successfully");

});