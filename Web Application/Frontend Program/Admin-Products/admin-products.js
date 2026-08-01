console.log("Admin Products JS Loaded");

const productApi = "http://localhost:8080/product";

let allProducts = [];


// ================================
// Load Products
// ================================

window.onload = function () {

    console.log("Products Page Loaded");

    loadProducts();

};


function loadProducts() {

    fetch(productApi + "/getAll")

        .then(response => {

            console.log("Status :", response.status);

            return response.json();

        })

        .then(products => {

            console.log("Products :", products);

            allProducts = products;

            displayProducts(allProducts);

            loadCategoryFilter();

        })

        .catch(error => {

            console.error("Product Error :", error);

        });

}


// ================================
// Display Products
// ================================

function displayProducts(products) {

    const tbody =
        document.getElementById("productTableBody");

    tbody.innerHTML = "";


    products.forEach(product => {

        tbody.innerHTML += `

            <tr>

                <td>
                    <img
                        src="http://localhost:8080/uploads/${product.imageUrl}"
                        class="product-image"
                    >
                </td>

                <td>
                    ${product.productName}
                </td>

                <td>
                    ${product.category.categoryName}
                </td>

                <td>
                    ₹${product.price}
                </td>

                <td>
                    ${product.stockQuantity}
                </td>

                <td>
                    <span class="available">
                        ${product.status}
                    </span>
                </td>

                <td>

                    <button
                        class="edit-btn"
                        onclick="editProduct(${product.productId})">

                        <i class="fa-solid fa-pen"></i>

                    </button>

                    <button
                        class="delete-btn"
                        onclick="deleteProduct(${product.productId})">

                        <i class="fa-solid fa-trash"></i>

                    </button>

                </td>

            </tr>

        `;

    });

}


// ================================
// Search Product
// ================================

const searchInput =
    document.getElementById("search");


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


// ================================
// Category Filter
// ================================

const categoryFilter =
    document.getElementById("category");


function loadCategoryFilter() {

    const categories = [];


    allProducts.forEach(product => {

        const categoryName =
            product.category.categoryName;


        if (!categories.includes(categoryName)) {

            categories.push(categoryName);

        }

    });


    categoryFilter.innerHTML =
        `<option value="all">All Categories</option>`;


    categories.forEach(category => {

        categoryFilter.innerHTML += `

            <option value="${category}">
                ${category}
            </option>

        `;

    });

}


categoryFilter.addEventListener("change", function () {

    const selectedCategory =
        this.value;


    if (selectedCategory === "all") {

        displayProducts(allProducts);

        return;

    }


    const filteredProducts =
        allProducts.filter(product =>

            product.category.categoryName === selectedCategory

        );


    displayProducts(filteredProducts);

});




// ================================
// Delete Product
// ================================

function deleteProduct(productId) {

    const confirmDelete = confirm("Are you sure you want to delete this product?");

    if (!confirmDelete) {
        return;
    }

    fetch(productApi + "/delete/" + productId, {

        method: "DELETE"

    })

        .then(response => {

            console.log("Delete Status :", response.status);

            return response.text();

        })

        .then(message => {

            alert(message);

            loadProducts();

        })

        .catch(error => {

            console.error("Delete Error :", error);

        });

}



// ================================
// Edit Product
// ================================

function editProduct(productId) {

    console.log("Edit Product ID :", productId);

    window.location.href =
        "../Edit-Products/edit-product.html?id=" + productId;

}

const addProductBtn = document.getElementById("add-product");

addProductBtn.addEventListener("click", function () {
    window.location.href = "../Add-Products/add-products.html";
});