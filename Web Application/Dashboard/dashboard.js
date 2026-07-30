// ===============================
// Active Sidebar Menu
// ===============================

const menuItems = document.querySelectorAll(".sidebar-menu li");

menuItems.forEach((item) => {

    item.addEventListener("click", () => {

        menuItems.forEach((menu) => {
            menu.classList.remove("active");
        });

        item.classList.add("active");

    });

});


// ===============================
// Logout Confirmation
// ===============================

const logoutBtn = document.querySelector(
    ".sidebar-menu li:last-child a"
);

logoutBtn.addEventListener("click", (e) => {

    const confirmLogout = confirm(
        "Are you sure you want to logout?"
    );

    if (!confirmLogout) {

        e.preventDefault();

    }

});


// ===============================
// Today's Date
// ===============================

const dateElement = document.querySelector(".header-right span");

const today = new Date();

const options = {

    day: "numeric",
    month: "long",
    year: "numeric"

};

dateElement.textContent =
today.toLocaleDateString("en-IN", options);


// ===============================
// Dashboard Card Animation
// ===============================

const cards = document.querySelectorAll(".card");

cards.forEach((card, index) => {

    card.style.opacity = "0";

    card.style.transform = "translateY(30px)";

    setTimeout(() => {

        card.style.transition = "0.5s";

        card.style.opacity = "1";

        card.style.transform = "translateY(0)";

    }, index * 200);

});