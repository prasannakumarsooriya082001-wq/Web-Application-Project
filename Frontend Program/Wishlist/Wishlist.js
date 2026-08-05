// =============================
// View Details
// =============================

const viewButtons = document.querySelectorAll(".view-btn");

viewButtons.forEach(button => {

    button.addEventListener("click", function () {

        window.location.href = "/Product Details Page/product-details.html";

    });

});

// =============================
// Add To Cart
// =============================

const cartButtons = document.querySelectorAll(".cart-btn");

cartButtons.forEach(button => {

    button.addEventListener("click", function () {

        alert("Product added to cart.");

        window.location.href = "/Cart Page/cart.html";

    });

});

// =============================
// Remove Wishlist Item
// =============================

const removeButtons = document.querySelectorAll(".remove-btn");

removeButtons.forEach(button => {

    button.addEventListener("click", function () {

        const card = this.closest(".wishlist-card");

        card.remove();

    });

});