console.log("Main Page JS Loaded");


// =====================================================
// LOGGED IN CUSTOMER
// =====================================================

let loggedInCustomer =
    JSON.parse(localStorage.getItem("loggedInCustomer"));


// =====================================================
// NAVBAR ELEMENTS
// =====================================================

const loginButton =
    document.getElementById("login-btn");

const signUpButton =
    document.getElementById("signup-btn");

const cartButton =
    document.getElementById("cart-btn");


// =====================================================
// PRODUCT API
// =====================================================

const productApi =
    "http://localhost:8080/product";


// =====================================================
// PAGE LOAD
// =====================================================

document.addEventListener("DOMContentLoaded", function () {

    console.log("Main Page Loaded");

    setupNavbar();

    loadFeaturedProducts();

    setupButtons();

});


// =====================================================
// NAVBAR
// =====================================================

function setupNavbar() {

    // =================================================
    // GUEST USER
    // =================================================

    if (!loggedInCustomer) {

        console.log("Guest User");

        // -----------------------------
        // Login Button
        // -----------------------------

        if (loginButton) {

            loginButton.textContent = "Login";

            loginButton.onclick = function () {

                window.location.href =
                    "../Login Page/login.html";

            };

        }


        // -----------------------------
        // Sign Up Button
        // -----------------------------

        if (signUpButton) {

            signUpButton.textContent = "Sign Up";

            signUpButton.onclick = function () {

                window.location.href =
                    "../Register Page/register.html";

            };

        }

        return;
    }


    // =================================================
    // LOGGED IN USER
    // =================================================

    console.log(
        "Logged In Customer:",
        loggedInCustomer
    );


    console.log(
        "Customer First Name:",
        loggedInCustomer.firstName
    );


    console.log(
        "Customer Email:",
        loggedInCustomer.email
    );


    // =================================================
    // PROFILE / NAME BUTTON
    // =================================================

    if (loginButton) {

        loginButton.textContent =
            loggedInCustomer.firstName ||
            loggedInCustomer.email ||
            "Profile";


        loginButton.onclick = function () {

            window.location.href =
                "../Profile Page/profile.html";

        };

    }


    // =================================================
    // LOGOUT BUTTON
    // =================================================

    if (signUpButton) {

        signUpButton.textContent = "Logout";


        signUpButton.onclick = function () {

            localStorage.removeItem(
                "loggedInCustomer"
            );


            window.location.href =
                "../Main Page/index.html";

        };

    }


    // =================================================
    // VERIFY JWT
    // =================================================

    verifyCustomer();

}


// =====================================================
// VERIFY CUSTOMER JWT
// =====================================================

function verifyCustomer() {

    if (
        !loggedInCustomer ||
        !loggedInCustomer.token
    ) {

        console.log(
            "No JWT token found"
        );

        return;

    }


    console.log(
        "Verifying JWT..."
    );


    fetch(
        "http://localhost:8080/customer/profile",
        {

            method: "GET",

            headers: {

                "Authorization":
                    "Bearer " +
                    loggedInCustomer.token

            }

        }

    )

        .then(response => {

            console.log(
                "Profile API Status:",
                response.status
            );


            if (!response.ok) {

                throw new Error(
                    "Unauthorized"
                );

            }


            /*
             * IMPORTANT:
             *
             * Your backend /customer/profile
             * returns String, not JSON.
             *
             * Backend:
             *
             * return "Email: " + email
             *        + ", Role: " + role;
             *
             * Therefore use response.text()
             */

            return response.text();

        })


        .then(profile => {

            console.log(
                "Verified Profile:",
                profile
            );

        })


        .catch(error => {

            console.error(
                "Profile Verification Error:",
                error
            );


            // Remove invalid login

            localStorage.removeItem(
                "loggedInCustomer"
            );


            loggedInCustomer = null;


            // Change navbar to guest mode

            if (loginButton) {

                loginButton.textContent =
                    "Login";


                loginButton.onclick = function () {

                    window.location.href =
                        "../Login Page/login.html";

                };

            }


            if (signUpButton) {

                signUpButton.textContent =
                    "Sign Up";


                signUpButton.onclick = function () {

                    window.location.href =
                        "../Register Page/register.html";

                };

            }

        });

}


// =====================================================
// LOAD FEATURED PRODUCTS
// =====================================================

function loadFeaturedProducts() {

    console.log(
        "Loading Featured Products..."
    );


    fetch(
        productApi + "/getAll"
    )

        .then(response => {

            console.log(
                "Product API Status:",
                response.status
            );


            if (!response.ok) {

                throw new Error(
                    "Failed to load products"
                );

            }


            return response.json();

        })


        .then(products => {

            console.log(
                "All Products:",
                products
            );


            // First 4 products

            const featuredProducts =
                products.slice(0, 4);


            displayFeaturedProducts(
                featuredProducts
            );

        })


        .catch(error => {

            console.error(
                "Featured Product Error:",
                error
            );


            const productGrid =
                document.getElementById(
                    "productGrid"
                );


            if (productGrid) {

                productGrid.innerHTML = `

                <p>
                    Unable to load products.
                </p>

            `;

            }

        });

}


// =====================================================
// DISPLAY FEATURED PRODUCTS
// =====================================================

function displayFeaturedProducts(products) {

    const productGrid =
        document.getElementById(
            "productGrid"
        );


    if (!productGrid) {

        console.log(
            "productGrid element not found"
        );

        return;

    }


    productGrid.innerHTML = "";


    if (products.length === 0) {

        productGrid.innerHTML = `

            <p>
                No products available.
            </p>

        `;

        return;

    }


    products.forEach(product => {

        productGrid.innerHTML += `

            <div class="product-card">

                <!-- Wishlist -->

                <button
                    class="wishlist"
                    onclick="openWishlist(${product.productId})">

                    ❤

                </button>


                <!-- Product Image -->

                <a
                    href="../Product Details Page/product-details.html?id=${product.productId}">

                    <img
                        src="http://localhost:8080/uploads/${product.imageUrl}"
                        alt="${product.productName}">

                </a>


                <!-- Product Name -->

                <h3>

                    <a
                        href="../Product Details Page/product-details.html?id=${product.productId}">

                        ${product.productName}

                    </a>

                </h3>


                <!-- Rating -->

                <div class="rating">

                    ⭐⭐⭐⭐⭐

                </div>


                <!-- Price -->

                <div class="price">

                    <span class="new-price">

                        ₹${product.price}

                    </span>

                </div>


                <!-- Add To Cart -->

                <button
                    class="cart-btn"
                    onclick="addProductToCart(${product.productId})">

                    Add To Cart

                </button>

            </div>

        `;

    });

}


// =====================================================
// ADD PRODUCT TO CART
// =====================================================

function addProductToCart(productId) {

    const customer =
        JSON.parse(
            localStorage.getItem(
                "loggedInCustomer"
            )
        );


    // =================================================
    // USER NOT LOGGED IN
    // =================================================

    if (!customer) {

        window.location.href =
            "../Login Page/login.html";

        return;

    }


    console.log(
        "Adding Product To Cart:",
        productId
    );


    fetch(
        "http://localhost:8080/cart/add?productId="
        + productId
        + "&quantity=1",
        {

            method: "POST",

            headers: {

                "Authorization":
                    "Bearer " +
                    customer.token

            }

        }

    )


        .then(response => {

            console.log(
                "Cart API Status:",
                response.status
            );


            if (!response.ok) {

                throw new Error(
                    "Failed to add product"
                );

            }


            return response.json();

        })


        .then(cartItem => {

            console.log(
                "Cart Item:",
                cartItem
            );


            alert(
                "Product added to cart successfully!"
            );

        })


        .catch(error => {

            console.error(
                "Cart Error:",
                error
            );


            alert(
                "Unable to add product to cart"
            );

        });

}


// =====================================================
// WISHLIST
// =====================================================

function openWishlist(productId) {

    const customer =
        JSON.parse(
            localStorage.getItem(
                "loggedInCustomer"
            )
        );


    // =================================================
    // NOT LOGGED IN
    // =================================================

    if (!customer) {

        window.location.href =
            "../Login Page/login.html";

        return;

    }


    console.log(
        "Wishlist Product:",
        productId
    );


    window.location.href =
        "../Wishlist Page/wishlist.html";

}


// =====================================================
// HERO BUTTONS
// =====================================================

function setupButtons() {

    const shopButton =
        document.getElementById(
            "shop-btn"
        );


    const exploreButton =
        document.getElementById(
            "explore-btn"
        );


    const viewAllButton =
        document.getElementById(
            "viewAllBtn"
        );


    // =================================================
    // SHOP NOW
    // =================================================

    if (shopButton) {

        shopButton.onclick = function () {

            window.location.href =
                "../Product Page/products.html";

        };

    }


    // =================================================
    // EXPLORE COLLECTION
    // =================================================

    if (exploreButton) {

        exploreButton.onclick = function () {

            window.location.href =
                "../Product Page/products.html";

        };

    }


    // =================================================
    // VIEW ALL PRODUCTS
    // =================================================

    if (viewAllButton) {

        viewAllButton.onclick = function () {

            window.location.href =
                "../Product Page/products.html";

        };

    }


    // =================================================
    // CART BUTTON
    // =================================================

    if (cartButton) {

        cartButton.onclick = function () {

            const customer =
                JSON.parse(
                    localStorage.getItem(
                        "loggedInCustomer"
                    )
                );


            // -----------------------------
            // Not logged in
            // -----------------------------

            if (!customer) {

                window.location.href =
                    "../Login Page/login.html";

                return;

            }


            // -----------------------------
            // Logged in
            // -----------------------------

            window.location.href =
                "../Cart Page/cart.html";

        };

    }

}