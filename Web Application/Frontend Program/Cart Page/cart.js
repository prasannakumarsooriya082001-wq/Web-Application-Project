console.log("Cart JS Loaded");


window.onload = function () {

    loadCart();

};


function loadCart() {

    let cart =
        JSON.parse(localStorage.getItem("cart")) || [];

    const cartItems =
        document.getElementById("cartItems");


    cartItems.innerHTML = "";


    if (cart.length === 0) {

        cartItems.innerHTML = `
            <div class="empty-cart">
                <h2>Your Cart is Empty</h2>
                <p>Add some products to your cart.</p>
            </div>
        `;

        updateSummary();

        return;
    }


    cart.forEach((item, index) => {

        const cartItem =
            document.createElement("div");

        cartItem.className = "cart-item";


        cartItem.innerHTML = `

            <img src="${item.image}" 
                 alt="${item.productName}">

            <div class="item-details">

                <h3>${item.productName}</h3>

                <p>Premium Sofa</p>

                <span class="price">
                    ₹${item.price}
                </span>

            </div>


            <div class="quantity">

                <button onclick="decreaseQuantity(${index})">
                    -
                </button>

                <span>
                    ${item.quantity}
                </span>

                <button onclick="increaseQuantity(${index})">
                    +
                </button>

            </div>


            <div class="total-price">

                ₹${item.price * item.quantity}

            </div>


            <button class="remove-btn"
                    onclick="removeItem(${index})">

                <i class="fa-solid fa-trash"></i>

            </button>

        `;


        cartItems.appendChild(cartItem);

    });


    updateSummary();

}



function increaseQuantity(index) {

    let cart =
        JSON.parse(localStorage.getItem("cart")) || [];


    cart[index].quantity++;


    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );


    loadCart();

}


function decreaseQuantity(index) {

    let cart =
        JSON.parse(localStorage.getItem("cart")) || [];


    if (cart[index].quantity > 1) {

        cart[index].quantity--;

    }


    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );


    loadCart();

}



function removeItem(index) {

    let cart =
        JSON.parse(localStorage.getItem("cart")) || [];


    cart.splice(index, 1);


    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );


    loadCart();

}



function updateSummary() {

    let cart =
        JSON.parse(localStorage.getItem("cart")) || [];


    let subtotal = 0;


    cart.forEach(item => {

        subtotal +=
            item.price * item.quantity;

    });


    let tax = subtotal * 0.05;


    document.getElementById("subtotal").textContent =
        "₹" + subtotal.toFixed(2);


    document.getElementById("tax").textContent =
        "₹" + tax.toFixed(2);


    let total = subtotal + tax;


    document.getElementById("total").textContent =
        "₹" + total.toFixed(2);

}



const checkoutBtn = document.getElementById("checkoutBtn");

checkoutBtn.addEventListener("click", function () {

    let cart =
        JSON.parse(localStorage.getItem("cart")) || [];

    if (cart.length === 0) {

        alert("Your cart is empty!");

        return;
    }

    window.location.href =
        "/Frontend Program/Checkout/checkout.html";

});