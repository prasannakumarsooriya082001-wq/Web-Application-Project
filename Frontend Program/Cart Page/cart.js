console.log("Cart JS Loaded");


window.onload = function () {

    loadCart();

};


function loadCart() {

    const loggedInCustomer =
        JSON.parse(localStorage.getItem("loggedInCustomer"));

    if (!loggedInCustomer) {

        window.location.href =
            "../Login Page/login.html";

        return;
    }


    fetch("http://localhost:8080/cart", {

        method: "GET",

        headers: {

            "Authorization":"Bearer " + loggedInCustomer.token
        }

    })

        .then(response => {

            if (!response.ok) {

                throw new Error("Failed to load cart");

            }

            return response.json();

        })

        .then(cart => {

            console.log("Cart:", cart);

            displayCart(cart);

        })

        .catch(error => {

            console.error("Cart Error:", error);

        });

}




function displayCart(cart) {

    const cartItems = document.getElementById("cartItems");

    cartItems.innerHTML = "";

    if (cart.length === 0) {

        cartItems.innerHTML = `
            <div class="empty-cart">
                <h2>Your Cart is Empty</h2>
                <p>Add some products to your cart.</p>
            </div>
        `;

        updateSummary(cart);

        return;
    }

    cart.forEach(item => {

        cartItems.innerHTML += `

        <div class="cart-item">

            <img src="http://localhost:8080/uploads/${item.imageUrl}">

            <div class="item-details">

                <h3>${item.productName}</h3>

                <span class="price">
                    ₹${item.price}
                </span>

            </div>

            <div class="quantity">

                <button onclick="decreaseQuantity(${item.cartId}, ${item.quantity})">
                    -
                </button>

                <span>${item.quantity}</span>

                <button onclick="increaseQuantity(${item.cartId}, ${item.quantity})">
                    +
                </button>

            </div>

            <div class="total-price">

                ₹${item.price * item.quantity}

            </div>

            <button
                class="remove-btn"
                onclick="removeItem(${item.cartId})">

                🗑

            </button>

        </div>

        `;

    });

    updateSummary(cart);

}



function updateSummary(cart) {

    let subtotal = 0;

    cart.forEach(item => {
        subtotal += item.price * item.quantity;

    });

    let tax = subtotal * 0.05;

    let total = subtotal + tax;

    document.getElementById("subtotal").textContent =
        "₹" + subtotal.toFixed(2);

    document.getElementById("tax").textContent =
        "₹" + tax.toFixed(2);

    document.getElementById("total").textContent =
        "₹" + total.toFixed(2);

}



function increaseQuantity(cartId, currentQuantity) {

    const loggedInCustomer =
        JSON.parse(localStorage.getItem("loggedInCustomer"));

    const newQuantity = currentQuantity + 1;

    fetch(
        "http://localhost:8080/cart/update/"
        + cartId
        + "?quantity="
        + newQuantity,
        {

            method: "PUT",

            headers: {

                "Authorization":
                    "Bearer " + loggedInCustomer.token

            }

        }
    )

        .then(response => {

            if (!response.ok) {

                throw new Error("Quantity update failed");

            }

            return response.json();

        })

        .then(() => {

            loadCart();

        })

        .catch(error => {

            console.error("Quantity Error:", error);

        });

}



function decreaseQuantity(cartId, currentQuantity) {

    if (currentQuantity <= 1) {

        return;

    }

    const loggedInCustomer =
        JSON.parse(localStorage.getItem("loggedInCustomer"));

    const newQuantity = currentQuantity - 1;

    fetch(
        "http://localhost:8080/cart/update/"
        + cartId
        + "?quantity="
        + newQuantity,
        {

            method: "PUT",

            headers: {

                "Authorization":
                    "Bearer " + loggedInCustomer.token

            }

        }
    )

        .then(response => {

            if (!response.ok) {

                throw new Error("Quantity update failed");

            }

            return response.json();

        })

        .then(() => {

            loadCart();

        })

        .catch(error => {

            console.error("Quantity Error:", error);

        });

}



function removeItem(cartId) {

    const loggedInCustomer =
        JSON.parse(localStorage.getItem("loggedInCustomer"));

    fetch(
        "http://localhost:8080/cart/remove/"
        + cartId,
        {

            method: "DELETE",

            headers: {

                "Authorization":
                    "Bearer " + loggedInCustomer.token

            }

        }
    )

        .then(response => {

            if (!response.ok) {

                throw new Error("Remove failed");

            }

            return response.text();

        })

        .then(message => {

            console.log(message);

            loadCart();

        })

        .catch(error => {

            console.error("Remove Error:", error);

        });

}


// ================= PROCEED TO CHECKOUT =================

const checkoutBtn =
    document.getElementById("checkoutBtn");


checkoutBtn.addEventListener("click", function () {

    const loggedInCustomer =
        JSON.parse(localStorage.getItem("loggedInCustomer"));


    // Login check

    if (!loggedInCustomer) {

        window.location.href =
            "../Login Page/login.html";

        return;

    }


    // Check whether cart has items

    fetch("http://localhost:8080/cart", {

        method: "GET",

        headers: {

            "Authorization":
                "Bearer " + loggedInCustomer.token

        }

    })

    .then(response => {

        if (!response.ok) {

            throw new Error("Unable to check cart");

        }

        return response.json();

    })

    .then(cart => {

        if (cart.length === 0) {

            alert("Your cart is empty!");

            return;

        }


        // Cart has products

        window.location.href =
            "../Checkout/checkout.html";

    })

    .catch(error => {

        console.error(
            "Checkout Error:",
            error
        );

        alert(
            "Unable to proceed to checkout"
        );

    });

});