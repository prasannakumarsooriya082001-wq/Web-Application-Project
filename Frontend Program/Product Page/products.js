console.log("User Products JS Loaded");


// =====================================================
// PRODUCT API
// =====================================================

const productApi = "http://localhost:8080/product";


// =====================================================
// LOGGED IN CUSTOMER
// =====================================================

const loggedInCustomer =
    JSON.parse(localStorage.getItem("loggedInCustomer"));


// =====================================================
// GLOBAL PRODUCTS
// =====================================================

let allProducts = [];


// =====================================================
// NAVBAR ELEMENTS
// =====================================================

const loginButton = document.getElementById("login-btn");

const signUpButton = document.getElementById("signup-btn");

const cartButton = document.getElementById("cart-btn");

const cartBadge = document.getElementById("cartBadge");


// =====================================================
// PAGE LOAD
// =====================================================

document.addEventListener("DOMContentLoaded", function () {

    console.log("Products Page Loaded");


    // Navbar
    setupNavbar();


    // Products
    loadProducts();


    // Search
    setupSearch();


    // Category
    setupCategoryFilter();


    // Search icon
    setupSearchButton();

}
);


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
        // Login
        // -----------------------------

        if (loginButton) {

            loginButton.textContent = "Login";


            loginButton.onclick = function () {

                window.location.href = "../Login Page/login.html";

            };

        }


        // -----------------------------
        // Sign Up
        // -----------------------------

        if (signUpButton) {

            signUpButton.textContent = "Sign Up";


            signUpButton.onclick = function () {

                window.location.href = "../Register Page/register.html";

            };

        }


        // -----------------------------
        // Cart
        // -----------------------------

        if (cartButton) {

            cartButton.onclick =
                function () {

                    window.location.href = "../Login Page/login.html";

                };

        }


        return;

    }


    // =================================================
    // LOGGED IN USER
    // =================================================

    console.log("Logged In Customer:", loggedInCustomer);


    // =================================================
    // PROFILE BUTTON
    // =================================================

    if (loginButton) {

        loginButton.textContent = loggedInCustomer.firstName || loggedInCustomer.email || "Profile";


        loginButton.onclick =
            function () {

                window.location.href = "../Profile Page/profile.html";

            };

    }


    // =================================================
    // LOGOUT BUTTON
    // =================================================

    if (signUpButton) {

        signUpButton.textContent =
            "Logout";


        signUpButton.onclick =
            function () {

                localStorage.removeItem("loggedInCustomer");


                window.location.href = "../Main Page/index.html";

            };

    }


    // =================================================
    // CART BUTTON
    // =================================================

    if (cartButton) {

        cartButton.onclick =
            function () {

                window.location.href = "../Cart Page/cart.html";

            };

    }


    // =================================================
    // VERIFY JWT
    // =================================================

    verifyCustomer();

}


// =====================================================
// VERIFY CUSTOMER
// =====================================================

function verifyCustomer() {

    if (
        !loggedInCustomer ||
        !loggedInCustomer.token
    ) {

        return;

    }


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

            if (!response.ok) {

                throw new Error(
                    "Unauthorized"
                );

            }


            return response.text();

        })

        .then(profile => {

            console.log(
                "Verified Profile:",
                profile
            );

        })

        .catch(error => {

            console.error("Profile Verification Error:", error);


            localStorage.removeItem("loggedInCustomer");


            // Guest mode

            if (loginButton) {

                loginButton.textContent = "Login";

                loginButton.onclick =
                    function () {

                        window.location.href = "../Login Page/login.html";

                    };

            }


            if (signUpButton) {

                signUpButton.textContent = "Sign Up";

                signUpButton.onclick =
                    function () {

                        window.location.href = "../Register Page/register.html";

                    };

            }

        });

}


// =====================================================
// LOAD PRODUCTS
// =====================================================

function loadProducts() {

    console.log("Loading Products...");


    fetch(productApi + "/getAll")

        .then(response => {

            console.log("Product API Status:", response.status);


            if (!response.ok) {

                throw new Error(
                    "Failed to load products"
                );

            }


            return response.json();

        })

        .then(products => {

            console.log(
                "Products:",
                products
            );


            allProducts = products;


            // Display products

            displayProducts(allProducts);


            // Load categories

            loadCategories();

        })

        .catch(error => {

            console.error(
                "Product Error:",
                error
            );


            const productGrid =
                document.getElementById(
                    "productGrid"
                );


            if (productGrid) {

                productGrid.innerHTML = `

                    <p class="no-products">

                        Unable to load products.

                    </p>

                `;

            }

        });

}


// =====================================================
// DISPLAY PRODUCTS
// =====================================================

function displayProducts(products) {

    const productGrid = document.getElementById("productGrid");


    if (!productGrid) {

        return;

    }


    productGrid.innerHTML = "";


    // =================================================
    // NO PRODUCTS
    // =================================================

    if (products.length === 0) {

        productGrid.innerHTML = `

            <p class="no-products">

                No products found.

            </p>

        `;

        return;

    }


    // =================================================
    // PRODUCT CARDS
    // =================================================

    products.forEach(product => {


        // Category safety

        const categoryName =
            product.category
                ? product.category.categoryName
                : "Uncategorized";


        productGrid.innerHTML += `

            <div class="product-card">


                <!-- ================= WISHLIST ================= -->

                <button

                    class="wishlist"

                    onclick="addToWishlist(${product.productId})
                    ">

                    ❤

                </button>


                <!-- ================= IMAGE ================= -->

                <a

                    class="image-link"

                    href="../Product Details Page/product-details.html?id=${product.productId}">

                    <img src="http://localhost:8080/uploads/${product.imageUrl.trim()}" alt="${product.productName}" onerror="this.onerror=null; this.src='/images/sofa1.jpg';">

                </a>


                <!-- ================= NAME ================= -->

                <h3>

                    <a href="../Product Details Page/product-details.html?id=${product.productId}" class="product-title"> ${product.productName}</a>

                </h3>


                <!-- ================= CATEGORY ================= -->

                <div class="category-name">

                    ${categoryName}

                </div>


                <!-- ================= RATING ================= -->

                <div class="rating">

                    ⭐⭐⭐⭐⭐

                </div>


                <!-- ================= PRICE ================= -->

                <div class="price">

                    <span class="new-price">

                        ₹${product.price}

                    </span>

                </div>


                <!-- ================= CART ================= -->

                <button

                    class="cart-btn"

                    onclick="
                        addToCart(
                            ${product.productId}
                        )
                    ">

                    Add To Cart

                </button>


            </div>

        `;

    });

}


// =====================================================
// LOAD CATEGORIES
// =====================================================

function loadCategories() {

    const categoryFilter =
        document.getElementById(
            "categoryFilter"
        );


    if (!categoryFilter) {

        return;

    }


    const categories = [];


    allProducts.forEach(product => {

        if (!product.category) {

            return;

        }


        const categoryName =
            product.category.categoryName;


        if (
            !categories.includes(
                categoryName
            )
        ) {

            categories.push(
                categoryName
            );

        }

    });


    categoryFilter.innerHTML = `

        <option value="all">

            All Categories

        </option>

    `;


    categories.forEach(category => {

        categoryFilter.innerHTML += `

            <option value="${category}">

                ${category}

            </option>

        `;

    });

}


// =====================================================
// SEARCH
// =====================================================

function setupSearch() {

    const searchInput =
        document.getElementById(
            "searchInput"
        );


    if (!searchInput) {

        return;

    }


    searchInput.addEventListener(
        "input",
        function () {

            applyFilters();

        }
    );

}


// =====================================================
// CATEGORY FILTER
// =====================================================

function setupCategoryFilter() {

    const categoryFilter =
        document.getElementById(
            "categoryFilter"
        );


    if (!categoryFilter) {

        return;

    }


    categoryFilter.addEventListener(
        "change",
        function () {

            applyFilters();

        }
    );

}


// =====================================================
// APPLY SEARCH + CATEGORY
// =====================================================

function applyFilters() {

    const searchInput =
        document.getElementById(
            "searchInput"
        );


    const categoryFilter =
        document.getElementById(
            "categoryFilter"
        );


    const searchValue =
        searchInput
            ? searchInput.value
                .toLowerCase()
                .trim()
            : "";


    const selectedCategory =
        categoryFilter
            ? categoryFilter.value
            : "all";


    const filteredProducts =
        allProducts.filter(product => {


            // -----------------------------
            // Search
            // -----------------------------

            const productName =
                product.productName
                    .toLowerCase();


            const matchesSearch =
                productName.includes(
                    searchValue
                );


            // -----------------------------
            // Category
            // -----------------------------

            const categoryName =
                product.category
                    ? product.category.categoryName
                    : "";


            const matchesCategory =
                selectedCategory === "all" ||
                categoryName ===
                selectedCategory;


            return (
                matchesSearch &&
                matchesCategory
            );

        });


    displayProducts(
        filteredProducts
    );

}


// =====================================================
// SEARCH ICON
// =====================================================

function setupSearchButton() {

    const searchButton =
        document.getElementById(
            "searchButton"
        );


    if (!searchButton) {

        return;

    }


    searchButton.onclick =
        function () {

            const searchInput =
                document.getElementById(
                    "searchInput"
                );


            if (searchInput) {

                searchInput.focus();

            }

        };

}


// =====================================================
// ADD TO WISHLIST
// =====================================================

function addToWishlist(productId) {

    console.log(
        "Wishlist Product ID:",
        productId
    );


    // -----------------------------
    // Login Check
    // -----------------------------

    if (!loggedInCustomer) {

        window.location.href =
            "../Login Page/login.html";

        return;

    }


    console.log(
        "Logged-in user can add wishlist:",
        loggedInCustomer.email
    );


    // Wishlist API will be connected
    // when we implement Wishlist backend.

    window.location.href =
        "../Wishlist Page/wishlist.html";

}


// =====================================================
// ADD TO CART
// =====================================================

function addToCart(productId) {

    console.log(
        "Cart Product ID:",
        productId
    );


    // -----------------------------
    // Login Check
    // -----------------------------

    if (!loggedInCustomer) {

        window.location.href =
            "../Login Page/login.html";

        return;

    }


    // -----------------------------
    // Token Check
    // -----------------------------

    if (!loggedInCustomer.token) {

        alert(
            "Session expired. Please login again."
        );


        localStorage.removeItem(
            "loggedInCustomer"
        );


        window.location.href =
            "../Login Page/login.html";

        return;

    }


    console.log(
        "Adding product for:",
        loggedInCustomer.email
    );


    // -----------------------------
    // CART API
    // -----------------------------

    fetch(
        "http://localhost:8080/cart/add" +
        "?productId=" +
        productId +
        "&quantity=1",
        {

            method: "POST",

            headers: {

                "Authorization":
                    "Bearer " +
                    loggedInCustomer.token

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


            // Update cart badge

            loadCartCount();

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
// CART COUNT
// =====================================================

function loadCartCount() {

    if (!loggedInCustomer) {

        return;

    }


    if (!loggedInCustomer.token) {

        return;

    }


    fetch(
        "http://localhost:8080/cart/my-cart",
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

            if (!response.ok) {

                throw new Error(
                    "Cart API failed"
                );

            }


            return response.json();

        })

        .then(cart => {

            console.log(
                "My Cart:",
                cart
            );


            if (!cartBadge) {

                return;

            }


            // If backend returns array

            if (Array.isArray(cart)) {

                cartBadge.textContent =
                    cart.length;

                return;

            }


            // If backend returns object

            if (cart.items &&
                Array.isArray(cart.items)) {

                cartBadge.textContent =
                    cart.items.length;

                return;

            }


            cartBadge.textContent = "0";

        })

        .catch(error => {

            console.log(
                "Cart Count Error:",
                error
            );

        });

}


// =====================================================
// INITIAL CART COUNT
// =====================================================

if (loggedInCustomer) {

    loadCartCount();

}