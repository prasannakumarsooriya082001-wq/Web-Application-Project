console.log("Product Details JS Loaded");

const productApi = "http://localhost:8080/product";

window.onload = function () {

    console.log("Product Details Page Loaded");

    loadProduct();

};


function loadProduct() {

    const params =
        new URLSearchParams(window.location.search);

    const productId =
        params.get("id");

    console.log("Product ID :", productId);


    if (!productId) {

        console.error("Product ID not found");

        return;

    }


    fetch(productApi + "/get/" + productId)

        .then(response => {

            console.log("Status :", response.status);

            if (!response.ok) {

                throw new Error("Product not found");

            }

            return response.json();

        })

        .then(product => {

            console.log("Product :", product);

            displayProduct(product);

        })

        .catch(error => {

            console.error("Product Error :", error);

        });

}


function displayProduct(product) {

    document.getElementById("productName").textContent =
        product.productName;


    document.getElementById("productPrice").textContent =
        "₹" + product.price;


    document.getElementById("productDescription").textContent =
        product.description;


    document.getElementById("mainImage").src =
        "http://localhost:8080/uploads/" + product.imageUrl;


    document.getElementById("mainImage").alt =
        product.productName;


    // if (product.category) {

    //     document.getElementById("productCategory").textContent =
    //         product.category.categoryName;

    // }

}



let quantity = 1;

const quantityDisplay = document.getElementById("quantity");
const increaseBtn = document.getElementById("increaseBtn");
const decreaseBtn = document.getElementById("decreaseBtn");


increaseBtn.addEventListener("click", function () {

    quantity++;

    quantityDisplay.textContent = quantity;

});


decreaseBtn.addEventListener("click", function () {

    if (quantity > 1) {

        quantity--;

        quantityDisplay.textContent = quantity;

    }

});



const addToCartBtn = document.getElementById("addToCartBtn");


addToCartBtn.addEventListener("click", function () {

    const params = new URLSearchParams(window.location.search);

    const productId = params.get("id");

    const productName =
        document.getElementById("productName").textContent;

    const productPrice =
        parseFloat(
            document.getElementById("productPrice")
                .textContent
                .replace("₹", "")
        );

    const productImage =
        document.getElementById("mainImage").src;


    const cartItem = {

        productId: productId,

        productName: productName,

        price: productPrice,

        quantity: quantity,

        image: productImage

    };


    let cart =
        JSON.parse(localStorage.getItem("cart")) || [];


    const existingProduct =
        cart.find(item =>
            item.productId == productId
        );


    if (existingProduct) {

        existingProduct.quantity += quantity;

    } else {

        cart.push(cartItem);

    }


    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );


    alert("Product added to cart successfully!");

});