console.log("Checkout JS Loaded");


const loggedInCustomer = JSON.parse(localStorage.getItem("loggedInCustomer"));


// ================= LOGIN CHECK =================

if (!loggedInCustomer) {

    window.location.href = "../Login Page/login.html";

}


// ================= PAGE LOAD =================

window.onload = function () {

    console.log("Checkout Page Loaded");

    loadCheckoutCart();

};


// ================= LOAD CART FROM DATABASE =================

function loadCheckoutCart() {

    fetch("http://localhost:8080/cart", {

        method: "GET",

        headers: {

            "Authorization":
                "Bearer " + loggedInCustomer.token

        }



    })

        .then(response => {

            if (!response.ok) {

                throw new Error("Failed to load cart");

            }

            return response.json();

        })

        .then(cart => {

            console.log("Checkout Cart:", cart);

            displayCheckoutCart(cart);

        })

        .catch(error => {

            console.error("Checkout Cart Error:", error);

        });

}


// ================= DISPLAY CHECKOUT CART =================

function displayCheckoutCart(cart) {

    const checkoutItems = document.getElementById("checkoutItems");

    checkoutItems.innerHTML = "";


    if (cart.length === 0) {

        checkoutItems.innerHTML = `
        
            <p>Your cart is empty.</p>

        `;

        document.getElementById("checkoutSubtotal").textContent = "₹0.00";

        document.getElementById("checkoutTax").textContent = "₹0.00";

        document.getElementById("checkoutTotal").textContent = "₹0.00";

        return;

    }


    let subtotal = 0;


    cart.forEach(item => {

        const itemTotal = item.price * item.quantity;

        subtotal += itemTotal;

        const div = document.createElement("div");

        div.classList.add("summary-item");


        div.innerHTML = `

            <img
                src="http://localhost:8080/uploads/${item.imageUrl}"
                alt="${item.productName}"
            >

            <div>

                <h4>
                    ${item.productName}
                </h4>

                <p>
                    Qty : ${item.quantity}
                </p>

            </div>

            <span>
                ₹${itemTotal.toFixed(2)}
            </span>

        `;


        checkoutItems.appendChild(div);

    });


    // ================= CALCULATE TOTAL =================

    const shipping = 0;

    const discount = 0;

    const tax = subtotal * 0.05;

    const total = subtotal + shipping + tax - discount;


    // ================= DISPLAY =================

    document.getElementById("checkoutSubtotal")
        .textContent =
        "₹" + subtotal.toFixed(2);


    document.getElementById("checkoutShipping")
        .textContent =
        "Free";


    document.getElementById("checkoutTax")
        .textContent =
        "₹" + tax.toFixed(2);


    document.getElementById("checkoutDiscount")
        .textContent =
        "₹" + discount.toFixed(2);


    document.getElementById("checkoutTotal")
        .textContent =
        "₹" + total.toFixed(2);

}



// ================= PLACE ORDER =================

const placeOrderButton =  document.querySelector(".place-order");


placeOrderButton.addEventListener("click", function () {

    const loggedInCustomer = JSON.parse(localStorage.getItem("loggedInCustomer"));


    // ================= LOGIN CHECK =================

    if (!loggedInCustomer) {

        window.location.href =
            "../Login Page/login.html";

        return;

    }


    // ================= GET CUSTOMER DETAILS =================

    const firstName =
        document.getElementById("firstName").value;

    const lastName =
        document.getElementById("lastName").value;

    const email =
        document.getElementById("email").value;

    const phone =
        document.getElementById("phone").value;

    const streetAddress =
        document.getElementById("streetAddress").value;

    const city =
        document.getElementById("city").value;

    const state =
        document.getElementById("state").value;

    const zipCode =
        document.getElementById("zipCode").value;

    const country =
        document.getElementById("country").value;


    // ================= GET PAYMENT METHOD =================

    const paymentMethod =
        document.querySelector(
            'input[name="payment"]:checked'
        ).value;


    // ================= CREATE ORDER DATA =================

    const orderData = {

        firstName: firstName,

        lastName: lastName,

        email: email,

        phone: phone,

        streetAddress: streetAddress,

        city: city,

        state: state,

        zipCode: zipCode,

        country: country,

        paymentMethod: paymentMethod

    };


    console.log("Order Data:", orderData);


    // ================= PLACE ORDER API =================

    fetch("http://localhost:8080/order/place", {

        method: "POST",

        headers: {

            "Authorization":
                "Bearer " + loggedInCustomer.token,

            "Content-Type":
                "application/json"

        },

        body: JSON.stringify(orderData)

    })

        .then(response => {

            if (!response.ok) {

                throw new Error(
                    "Order placement failed"
                );

            }

            return response.json();

        })

        .then(order => {

            console.log(
                "Order Created:",
                order
            );


            alert(
                "Order placed successfully!"
            );


            // ================= SAVE ORDER ID =================

            localStorage.setItem(
                "lastOrderId",
                order.orderId
            );


            // ================= GO TO SUCCESS PAGE =================

            window.location.href =
                "../Order-Success/order-success.html";

        })

        .catch(error => {

            console.error(
                "Order Error:",
                error
            );

            alert(
                "Unable to place order."
            );

        });

});