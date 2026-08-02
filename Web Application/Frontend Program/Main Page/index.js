// ================= GET LOGGED IN CUSTOMER =================

const loggedInCustomer = JSON.parse(localStorage.getItem("loggedInCustomer"));


// ================= NAVBAR =================

const loginButton = document.getElementById("login-btn");

const signUpButton = document.getElementById("signup-btn");


// ================= USER NOT LOGGED IN =================

if (!loggedInCustomer) {

    console.log("Guest User");

}


// ================= USER LOGGED IN =================

else {

    console.log("Logged In User:", loggedInCustomer);


    // Verify JWT

    fetch("http://localhost:8080/customer/profile", {

        method: "GET",

        headers: {

            "Authorization":"Bearer " + loggedInCustomer.token
        }

    })
        .then(response => {

            if (!response.ok) {

                throw new Error("Unauthorized");

            }

            return response.text();

        })
        .then(profile => {

            console.log("Profile:", profile);

        })
        .catch(error => {

            console.error("Profile Error:", error);

            localStorage.removeItem("loggedInCustomer");

            // Don't redirect to login page.
            // User can continue as guest.

        });


    // ================= NAVBAR AFTER LOGIN =================

    if (loginButton) {

        loginButton.textContent = loggedInCustomer.firstName || loggedInCustomer.email;

        loginButton.addEventListener("click", function () {

            // Later → Profile page

            window.location.href ="../Profile Page/profile.html";

        });

    }


    if (signUpButton) {

        signUpButton.textContent = "Logout";

        signUpButton.addEventListener("click", function () {

            localStorage.removeItem("loggedInCustomer");

            window.location.reload();

        });

    }

}



// ================= LOGIN REQUIRED FUNCTION =================

function requireLogin(action) {

    if (!loggedInCustomer) {

        // User is not logged in
        window.location.href ="../Login Page/login.html";

        return;

    }

    // User is logged in
    action();

}



if (!loggedInCustomer) {

    console.log("Guest User");

    if (loginButton) {

        loginButton.addEventListener("click", function () {

            window.location.href ="../Login Page/login.html";

        });

    }

}



if (signUpButton) {

    signUpButton.addEventListener("click", function () {

        window.location.href ="../Register Page/register.html";

    });

}


// ================= ADD TO CART =================

const cartButtons = document.querySelectorAll(".cart-btn");

cartButtons.forEach(function (button) {

    button.addEventListener("click", function () {

        requireLogin(function () {

            window.location.href ="../Cart Page/cart.html";

        });

    });

});



// ================= WISHLIST =================

const wishlistButtons = document.querySelectorAll(".wishlist");

wishlistButtons.forEach(function (button) {

    button.addEventListener("click", function () {

        requireLogin(function () {

            window.location.href ="../Wishlist Page/wishlist.html";

        });

    });

});


const shopButton = document.getElementById("shop-btn");

if (shopButton) {

    shopButton.addEventListener("click", function () {

        window.location.href ="../Product Page/products.html";

    });

}


const exploreButton = document.getElementById("explore-btn");

if (exploreButton) {

    exploreButton.addEventListener("click", function () {

        window.location.href = "../Product Page/products.html";

    });

}