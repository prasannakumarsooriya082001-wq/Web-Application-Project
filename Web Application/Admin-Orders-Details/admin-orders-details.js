
// ==========================
// Status Update
// ==========================

const updateBtn = document.getElementById("updateBtn");

const statusSelect = document.getElementById("orderStatus");

const badge = document.querySelector(".status-badge");

if (updateBtn && statusSelect && badge) {

    updateBtn.addEventListener("click", function (e) {

        e.preventDefault();

        const status = statusSelect.value;

        if (confirm("Are you sure you want to update the order status?")) {

            badge.innerText = status;

            badge.className = "status-badge";

            if (status === "Pending") {

                badge.classList.add("pending");

            }

            else if (status === "Processing") {

                badge.classList.add("processing");

            }

            else if (status === "Delivered") {

                badge.classList.add("delivered");

            }

            else {

                badge.classList.add("cancelled");

            }

            alert("✅ Order Status Updated Successfully!");

        }

    });

}


// ==========================
// Live Badge Color Change
// ==========================

if (statusSelect && badge) {

    statusSelect.addEventListener("change", function () {

        const status = this.value;

        badge.innerText = status;

        badge.className = "status-badge";

        if (status === "Pending") {

            badge.classList.add("pending");

        }

        else if (status === "Processing") {

            badge.classList.add("processing");

        }

        else if (status === "Delivered") {

            badge.classList.add("delivered");

        }

        else {

            badge.classList.add("cancelled");

        }

    });

}

// ==========================
// Cards Animation
// ==========================

const cards = document.querySelectorAll(".card");

cards.forEach((card, index) => {

    card.style.opacity = "0";

    card.style.transform = "translateY(25px)";

    setTimeout(() => {

        card.style.transition = ".5s";

        card.style.opacity = "1";

        card.style.transform = "translateY(0)";

    }, index * 150);

});


// ==========================
// Product Image Hover
// ==========================

const productImage = document.querySelector(".product-image");

if (productImage) {

    productImage.addEventListener("mouseover", function () {

        productImage.style.transform = "scale(1.08)";

        productImage.style.transition = ".3s";

    });

    productImage.addEventListener("mouseout", function () {

        productImage.style.transform = "scale(1)";

    });

}

