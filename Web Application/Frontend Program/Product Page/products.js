console.log("User Products JS Loaded");


const productApi = "http://localhost:8080/product";

let allProducts = [];


// ==========================
// Page Load
// ==========================

window.onload = function () {

    console.log("Products Page Loaded");

    loadProducts();

};


// ==========================
// Load Products
// ==========================

function loadProducts() {

    console.log("Loading Products...");

    fetch(productApi + "/getAll")

        .then(response => {

            console.log("Status :", response.status);

            if (!response.ok) {

                throw new Error("Failed to load products");

            }

            return response.json();

        })

        .then(products => {

            console.log("Products :", products);

            allProducts = products;

            displayProducts(allProducts);

            loadCategories();

        })

        .catch(error => {

            console.error("Product Error :", error);

        });

}


// ==========================
// Display Products
// ==========================

function displayProducts(products) {

    const productGrid = document.getElementById("productGrid");


    productGrid.innerHTML = "";


    if (products.length === 0) {

        productGrid.innerHTML = `
            
            <p class="no-products">
                No products found.
            </p>

        `;

        return;

    }


    products.forEach(product => {

        productGrid.innerHTML += `

            <div class="product-card">

                <button
                    class="wishlist" onclick="addToWishlist(${product.productId})">❤
                </button>


                <a class="image-link" href="../Product Details Page/product-details.html?id=${product.productId}">

                    <img src="http://localhost:8080/uploads/${product.imageUrl}" alt="${product.productName}">

                </a>


                <h3>

                    <a href="../Product Details Page/product-details.html?id=${product.productId}" class="product-title">
                        ${product.productName}
                    </a>
                </h3>


                <div class="category-name">

                    ${product.category.categoryName}

                </div>


                <div class="rating">

                    ⭐⭐⭐⭐⭐

                </div>


                <div class="price">

                    <span class="new-price">

                        ₹${product.price}

                    </span>

                </div>


                <button class="cart-btn" onclick="addToCart(${product.productId})">Add To Cart

                </button>

            </div>

        `;

    });

}


// ==========================
// Load Categories
// ==========================

function loadCategories() {

    const categoryFilter =
        document.getElementById("categoryFilter");


    const categories = [];


    allProducts.forEach(product => {

        const categoryName =
            product.category.categoryName;


        if (!categories.includes(categoryName)) {

            categories.push(categoryName);

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


// ==========================
// Search
// ==========================

const searchInput =
    document.getElementById("searchInput");


searchInput.addEventListener("input", function () {

    const searchValue =
        this.value.toLowerCase().trim();


    const filteredProducts =
        allProducts.filter(product =>

            product.productName
                .toLowerCase()
                .includes(searchValue)

        );


    displayProducts(filteredProducts);

});


// ==========================
// Category Filter
// ==========================

const categoryFilter =
    document.getElementById("categoryFilter");


categoryFilter.addEventListener("change", function () {

    const selectedCategory =
        this.value;


    if (selectedCategory === "all") {

        displayProducts(allProducts);

        return;

    }


    const filteredProducts =
        allProducts.filter(product =>

            product.category.categoryName ===
            selectedCategory

        );


    displayProducts(filteredProducts);

});


// ==========================
// Wishlist
// ==========================

function addToWishlist(productId) {

    console.log("Wishlist Product ID :", productId);

}


// ==========================
// Cart
// ==========================

function addToCart(productId) {

    console.log("Cart Product ID :", productId);

}