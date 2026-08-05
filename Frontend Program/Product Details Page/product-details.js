console.log("Product Details JS Loaded");


// =====================================================
// API
// =====================================================

const productApi =
    "http://localhost:8080/product";

const cartApi =
    "http://localhost:8080/cart";


// =====================================================
// GLOBAL VARIABLES
// =====================================================

let currentProductId = null;

let quantity = 1;


// =====================================================
// PAGE LOAD
// =====================================================

document.addEventListener("DOMContentLoaded", function () {

    console.log("Product Details Page Loaded");


    // Navbar
    setupNavbar();


    // Product
    loadProduct();


    // Quantity
    setupQuantity();


    // Add To Cart
    setupAddToCart();


    // Buy Now
    setupBuyNow();


    // Related Products
    loadRelatedProducts();

});


// =====================================================
// GET LOGGED IN CUSTOMER
// =====================================================

function getLoggedInCustomer() {

    return JSON.parse(
        localStorage.getItem("loggedInCustomer")
    );

}


// =====================================================
// NAVBAR
// =====================================================

function setupNavbar() {

    const customer =
        getLoggedInCustomer();


    const loginButton =
        document.querySelector(".login-btn");


    const signUpButton =
        document.querySelector(".signup-btn");


    const cartButton =
        document.querySelector(".cart");


    // =================================================
    // GUEST USER
    // =================================================

    if (!customer) {

        console.log("Guest User");


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

    }


    // =================================================
    // LOGGED IN USER
    // =================================================

    else {

        console.log(
            "Logged In Customer:",
            customer
        );


        if (loginButton) {

            loginButton.textContent =
                customer.firstName ||
                customer.email ||
                "Profile";


            loginButton.onclick = function () {

                window.location.href =
                    "../Profile Page/profile.html";

            };

        }


        if (signUpButton) {

            signUpButton.textContent =
                "Logout";


            signUpButton.onclick = function () {

                localStorage.removeItem(
                    "loggedInCustomer"
                );


                window.location.reload();

            };

        }

    }


    // =================================================
    // CART NAVBAR
    // =================================================

    if (cartButton) {

        cartButton.onclick = function () {

            const currentCustomer =
                getLoggedInCustomer();


            // Guest
            if (!currentCustomer) {

                window.location.href =
                    "../Login Page/login.html";

                return;

            }


            // Logged in user
            window.location.href =
                "../Cart Page/cart.html";

        };

    }

}


// =====================================================
// LOAD CURRENT PRODUCT
// =====================================================

function loadProduct() {

    const params =
        new URLSearchParams(
            window.location.search
        );


    const productId =
        params.get("id");


    console.log(
        "Product ID:",
        productId
    );


    if (!productId) {

        console.error(
            "Product ID not found"
        );

        return;

    }


    currentProductId =
        productId;


    fetch(
        productApi +
        "/get/" +
        productId
    )

        .then(response => {

            console.log(
                "Product API Status:",
                response.status
            );


            if (!response.ok) {

                throw new Error(
                    "Product not found"
                );

            }


            return response.json();

        })

        .then(product => {

            console.log(
                "Current Product:",
                product
            );


            displayProduct(product);

        })

        .catch(error => {

            console.error(
                "Product Error:",
                error
            );

        });

}


// =====================================================
// DISPLAY PRODUCT
// =====================================================

function displayProduct(product) {

    const productName =
        document.getElementById(
            "productName"
        );


    const productPrice =
        document.getElementById(
            "productPrice"
        );


    const productDescription =
        document.getElementById(
            "productDescription"
        );


    const mainImage =
        document.getElementById(
            "mainImage"
        );


    if (productName) {

        productName.textContent =
            product.productName;

    }


    if (productPrice) {

        productPrice.textContent =
            "₹" + product.price;

    }


    if (productDescription) {

        productDescription.textContent =
            product.description ||
            "Premium handcrafted sofa designed for luxury living.";

    }


    if (mainImage) {

        mainImage.src =
            "http://localhost:8080/uploads/" +
            product.imageUrl;


        mainImage.alt =
            product.productName;

    }

}


// =====================================================
// QUANTITY
// =====================================================

function setupQuantity() {

    const quantityDisplay =
        document.getElementById(
            "quantity"
        );


    const increaseBtn =
        document.getElementById(
            "increaseBtn"
        );


    const decreaseBtn =
        document.getElementById(
            "decreaseBtn"
        );


    if (!quantityDisplay ||
        !increaseBtn ||
        !decreaseBtn) {

        return;

    }


    quantity =
        1;


    quantityDisplay.textContent =
        quantity;


    // Increase

    increaseBtn.addEventListener(
        "click",
        function () {

            quantity++;


            quantityDisplay.textContent =
                quantity;

        }
    );


    // Decrease

    decreaseBtn.addEventListener(
        "click",
        function () {

            if (quantity > 1) {

                quantity--;

            }


            quantityDisplay.textContent =
                quantity;

        }
    );

}


// =====================================================
// ADD TO CART
// =====================================================

function setupAddToCart() {

    const addToCartBtn =
        document.getElementById(
            "addToCartBtn"
        );


    if (!addToCartBtn) {

        return;

    }


    addToCartBtn.addEventListener(
        "click",
        function () {

            addCurrentProductToCart(
                quantity
            );

        }
    );

}


// =====================================================
// ADD CURRENT PRODUCT TO CART
// =====================================================

function addCurrentProductToCart(
    selectedQuantity
) {

    const customer =
        getLoggedInCustomer();


    // =================================================
    // LOGIN CHECK
    // =================================================

    if (!customer) {

        alert(
            "Please login to add products to cart."
        );


        window.location.href =
            "../Login Page/login.html";


        return;

    }


    if (!currentProductId) {

        alert(
            "Product ID not found."
        );


        return;

    }


    console.log(
        "Adding Product:",
        currentProductId
    );


    console.log(
        "Quantity:",
        selectedQuantity
    );


    // =================================================
    // CART API
    // =================================================

    fetch(
        cartApi +
        "/add?productId=" +
        currentProductId +
        "&quantity=" +
        selectedQuantity,
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
                    "Failed to add product to cart"
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
                "Unable to add product to cart."
            );

        });

}


// =====================================================
// BUY NOW
// =====================================================

function setupBuyNow() {

    const buyNowBtn =
        document.getElementById(
            "buyNowBtn"
        );


    if (!buyNowBtn) {

        return;

    }


    buyNowBtn.addEventListener(
        "click",
        function () {

            const customer =
                getLoggedInCustomer();


            // Login check

            if (!customer) {

                alert(
                    "Please login to continue."
                );


                window.location.href =
                    "../Login Page/login.html";


                return;

            }


            // Add product to cart first

            if (!currentProductId) {

                alert(
                    "Product not found."
                );


                return;

            }


            fetch(
                cartApi +
                "/add?productId=" +
                currentProductId +
                "&quantity=" +
                quantity,
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

                    if (!response.ok) {

                        throw new Error(
                            "Unable to add product"
                        );

                    }


                    return response.json();

                })

                .then(() => {

                    // Go to cart

                    window.location.href =
                        "../Cart Page/cart.html";

                })

                .catch(error => {

                    console.error(
                        "Buy Now Error:",
                        error
                    );


                    alert(
                        "Unable to continue to checkout."
                    );

                });

        }
    );

}


// =====================================================
// LOAD RELATED PRODUCTS
// =====================================================

function loadRelatedProducts() {

    console.log(
        "Loading You May Also Like..."
    );


    fetch(
        productApi +
        "/getAll"
    )

        .then(response => {

            if (!response.ok) {

                throw new Error(
                    "Failed to load related products"
                );

            }


            return response.json();

        })

        .then(products => {

            console.log(
                "All Products:",
                products
            );


            // Remove current product

            const relatedProducts =
                products.filter(
                    product =>
                        String(product.productId) !==
                        String(currentProductId)
                );


            // First 4 products

            const limitedProducts =
                relatedProducts.slice(
                    0,
                    4
                );


            displayRelatedProducts(
                limitedProducts
            );

        })

        .catch(error => {

            console.error(
                "Related Product Error:",
                error
            );

        });

}


// =====================================================
// DISPLAY RELATED PRODUCTS
// =====================================================

function displayRelatedProducts(
    products
) {

    // Get You May Also Like section

    const sectionTitles =
        document.querySelectorAll(
            ".section-title h2"
        );


    let relatedGrid = null;


    sectionTitles.forEach(title => {

        if (
            title.textContent
                .trim()
                .toLowerCase()
                .includes("you may also like")
        ) {

            const section =
                title.closest(
                    ".products"
                );


            if (section) {

                relatedGrid =
                    section.querySelector(
                        ".product-grid"
                    );

            }

        }

    });


    // If not found

    if (!relatedGrid) {

        console.error(
            "Related product grid not found"
        );


        return;

    }


    relatedGrid.innerHTML = "";


    if (products.length === 0) {

        relatedGrid.innerHTML = `

            <p class="no-products">
                No related products available.
            </p>

        `;


        return;

    }


    products.forEach(product => {

        relatedGrid.innerHTML += `

            <div class="product-card">

                <button
                    class="wishlist"
                    onclick="addRelatedToWishlist(${product.productId})">

                    ❤

                </button>


                <a
                    href="../Product Details Page/product-details.html?id=${product.productId}">

                    <img
                        src="http://localhost:8080/uploads/${product.imageUrl}"
                        alt="${product.productName}">

                </a>


                <h3>

                    <a
                        href="../Product Details Page/product-details.html?id=${product.productId}">

                        ${product.productName}

                    </a>

                </h3>


                <div class="rating">

                    ⭐⭐⭐⭐⭐

                </div>


                <div class="price">

                    <span class="new-price">

                        ₹${product.price}

                    </span>

                </div>


                <button
                    class="cart-btn"
                    onclick="addRelatedToCart(${product.productId})">

                    Add To Cart

                </button>

            </div>

        `;

    });

}


// =====================================================
// RELATED PRODUCT → CART
// =====================================================

function addRelatedToCart(
    productId
) {

    const customer =
        getLoggedInCustomer();


    // Guest

    if (!customer) {

        alert(
            "Please login to add products to cart."
        );


        window.location.href =
            "../Login Page/login.html";


        return;

    }


    console.log(
        "Related Product ID:",
        productId
    );


    fetch(
        cartApi +
        "/add?productId=" +
        productId +
        "&quantity=1",
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

            if (!response.ok) {

                throw new Error(
                    "Failed to add product"
                );

            }


            return response.json();

        })

        .then(cartItem => {

            console.log(
                "Related Cart Item:",
                cartItem
            );


            alert(
                "Product added to cart successfully!"
            );

        })

        .catch(error => {

            console.error(
                "Related Cart Error:",
                error
            );


            alert(
                "Unable to add product to cart."
            );

        });

}


// =====================================================
// RELATED PRODUCT → WISHLIST
// =====================================================

function addRelatedToWishlist(
    productId
) {

    const customer =
        getLoggedInCustomer();


    if (!customer) {

        alert(
            "Please login to add products to wishlist."
        );


        window.location.href =
            "../Login Page/login.html";


        return;

    }


    console.log(
        "Wishlist Product ID:",
        productId
    );


    // Wishlist API இன்னும் create
    // செய்யவில்லை என்றால் temporarily page மட்டும் open

    window.location.href =
        "../Wishlist Page/wishlist.html";

}


// =====================================================
// MAIN NAV LINKS
// =====================================================

function setupNavigation() {

    const homeLinks =
        document.querySelectorAll(
            ".nav-links a"
        );


    if (homeLinks.length >= 1) {

        homeLinks[0].href =
            "../Main Page/index.html";

    }


    if (homeLinks.length >= 2) {

        homeLinks[1].href =
            "../Product Page/products.html";

    }

}


// =====================================================
// RUN NAVIGATION
// =====================================================

setupNavigation();