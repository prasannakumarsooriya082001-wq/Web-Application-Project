// ==========================
// Search Orders
// ==========================

const searchInput = document.getElementById("search");

searchInput.addEventListener("keyup", function () {

    const filter = searchInput.value.toLowerCase();

    const rows = document.querySelectorAll("tbody tr");

    rows.forEach(row => {

        const text = row.innerText.toLowerCase();

        if (text.includes(filter)) {

            row.style.display = "";

        } else {

            row.style.display = "none";

        }

    });

});


// ==========================
// Filter Orders
// ==========================

const category = document.getElementById("category");

category.addEventListener("change", function () {

    const value = category.value.toLowerCase();

    const rows = document.querySelectorAll("tbody tr");

    rows.forEach(row => {

        const status = row.querySelector(".status").innerText.toLowerCase();

        if (value === "all orders") {

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


// ==========================
// View Button
// ==========================

const viewButtons = document.querySelectorAll(".view-btn");

viewButtons.forEach(button => {

    button.addEventListener("click", function (e) {

        e.preventDefault();

        alert("Opening Order Details...");
        window.location.href="/Admin-Orders-Details/admin-orders-details.html";

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