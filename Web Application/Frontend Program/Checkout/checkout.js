console.log("Checkout JS Loaded");

window.onload = function () {

    console.log("Checkout Page Loaded");

    loadCheckoutItems();

};


function loadCheckoutItems() {

    let cart =
        JSON.parse(localStorage.getItem("cart")) || [];

    const checkoutItems =
        document.getElementById("checkoutItems");

    checkoutItems.innerHTML = "";

    if (cart.length === 0) {

        checkoutItems.innerHTML =
            "<p>Your cart is empty.</p>";

        return;
    }


    let subtotal = 0;


    cart.forEach(item => {

        const itemTotal =
            item.price * item.quantity;

        subtotal += itemTotal;


        const div =
            document.createElement("div");

        div.classList.add("summary-item");


        div.innerHTML = `

            <img src="${item.image}" alt="${item.productName}">

            <div>

                <h4>${item.productName}</h4>

                <p>Qty : ${item.quantity}</p>

            </div>

            <span>₹${itemTotal.toFixed(2)}</span>

        `;


        checkoutItems.appendChild(div);

    });


    const shipping = 0;

    const discount = 0;

    const tax = subtotal * 0.05;

    const total =
        subtotal + shipping + tax - discount;


    document.getElementById("checkoutSubtotal")
        .textContent =
        "₹" + subtotal.toFixed(2);


    document.getElementById("checkoutShipping")
        .textContent =
        shipping === 0 ? "Free" : "₹" + shipping;


    document.getElementById("checkoutDiscount")
        .textContent =
        "₹" + discount.toFixed(2);


    document.getElementById("checkoutTotal")
        .textContent =
        "₹" + total.toFixed(2);

    document.getElementById("checkoutTax")
        .textContent =
        "₹" + tax.toFixed(2);

}