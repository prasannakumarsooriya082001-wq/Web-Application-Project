


// ==========================
// Profile Image Hover
// ==========================

const profileImage = document.querySelector(".profile-image");

if (profileImage) {

    profileImage.addEventListener("mouseover", function () {

        profileImage.style.transform = "scale(1.08)";

        profileImage.style.transition = ".3s";

    });

    profileImage.addEventListener("mouseout", function () {

        profileImage.style.transform = "scale(1)";

    });

}


// ==========================
// Cards Animation
// ==========================

const cards = document.querySelectorAll(".card");

cards.forEach((card, index) => {

    card.style.opacity = "0";

    card.style.transform = "translateY(30px)";

    setTimeout(() => {

        card.style.transition = ".5s";

        card.style.opacity = "1";

        card.style.transform = "translateY(0)";

    }, index * 200);

});


// ==========================
// Table Row Animation
// ==========================

const rows = document.querySelectorAll("tbody tr");

rows.forEach((row, index) => {

    row.style.opacity = "0";

    row.style.transform = "translateX(-20px)";

    setTimeout(() => {

        row.style.transition = ".4s";

        row.style.opacity = "1";

        row.style.transform = "translateX(0)";

    }, index * 150);

});




// ==========================
// Copy Email
// ==========================

const email = document.querySelector(".details-grid p");

if (email) {

    email.style.cursor = "pointer";

    email.title = "Click to Copy";

    email.addEventListener("click", function () {

        navigator.clipboard.writeText(email.innerText);

        alert("Email Copied Successfully!");

    });

}
