console.log("Order Details JS Loaded");


// ================= PAGE LOAD =================

window.onload = function () {

    console.log("Order Details Page Loaded");

    loadOrderDetails();

};


// ================= LOAD ORDER DETAILS =================

function loadOrderDetails() {

    const loggedInCustomer =
        JSON.parse(
            localStorage.getItem("loggedInCustomer")
        );


    // ================= LOGIN CHECK =================

    if (!loggedInCustomer) {

        window.location.href =
            "../Login Page/login.html";

        return;

    }


    // ================= GET SELECTED ORDER ID =================

    const orderId =
        localStorage.getItem("selectedOrderId");


    if (!orderId) {

        console.error("Order ID not found");

        alert("Order not found");

        window.location.href =
            "../Orders Page/order.html";

        return;

    }


    console.log("Selected Order ID:", orderId);


    // ================= GET ORDER API =================

    fetch(
        "http://localhost:8080/order/" + orderId,
        {

            method: "GET",

            headers: {

                "Authorization":
                    "Bearer " + loggedInCustomer.token

            }

        }
    )

        .then(response => {

            console.log(
                "Order Details Status:",
                response.status
            );


            if (!response.ok) {

                throw new Error(
                    "Failed to load order details"
                );

            }


            return response.json();

        })

        .then(order => {

            console.log(
                "Order Details:",
                order
            );


            displayOrderDetails(order);

            loadOrderItems(order.orderId);

        })

        .catch(error => {

            console.error(
                "Order Details Error:",
                error
            );

        });

}


// ================= DISPLAY ORDER DETAILS =================

function displayOrderDetails(order) {


    // ================= ORDER INFORMATION =================

    document.getElementById("orderId")
        .textContent =
        "#" + order.orderId;


    document.getElementById("orderStatus")
        .textContent =
        order.status;


    // ================= CUSTOMER DETAILS =================

    document.getElementById("customerName")
        .textContent =
        order.firstName + " " + order.lastName;


    document.getElementById("customerEmail")
        .textContent =
        order.email;


    document.getElementById("customerPhone")
        .textContent =
        order.phone;


    // ================= SHIPPING ADDRESS =================

    document.getElementById("shippingAddress")
        .textContent =

        order.streetAddress
        + ", "
        + order.city
        + ", "
        + order.state
        + " - "
        + order.zipCode
        + ", "
        + order.country;


    // ================= PAYMENT =================

    document.getElementById("paymentMethod")
        .textContent =
        order.paymentMethod;


    // ================= ORDER SUMMARY =================

    document.getElementById("subtotal")
        .textContent =
        "₹" + order.subtotal.toFixed(2);


    document.getElementById("tax")
        .textContent =
        "₹" + order.tax.toFixed(2);


    document.getElementById("totalAmount")
        .textContent =
        "₹" + order.totalAmount.toFixed(2);

}


function loadOrderItems(orderId) {

    const loggedInCustomer =
        JSON.parse(localStorage.getItem("loggedInCustomer"));

    fetch(
        "http://localhost:8080/order/"
        + orderId
        + "/items",
        {
            method: "GET",

            headers: {
                "Authorization":
                    "Bearer " + loggedInCustomer.token
            }
        }
    )
        .then(response => {

            if (!response.ok) {
                throw new Error("Failed to load order items");
            }

            return response.json();

        })
        .then(items => {

            console.log("Order Items:", items);

            displayOrderItems(items);

        })
        .catch(error => {

            console.error("Order Items Error:", error);

        });
}


function displayOrderItems(items) {

    const container =
        document.getElementById("orderItems");

    container.innerHTML = "";

    if (items.length === 0) {

        container.innerHTML = `
        
            <p>No products found for this order.</p>

        `;

        return;
    }


    items.forEach(item => {

        container.innerHTML += `

            <div class="order-item">

                <img
                    src="http://localhost:8080/uploads/${item.imageUrl}"
                    alt="${item.productName}"
                >

                <div class="order-item-info">

                    <h3>
                        ${item.productName}
                    </h3>

                    <p>
                        Quantity: ${item.quantity}
                    </p>

                    <p>
                        Price: ₹${item.price.toFixed(2)}
                    </p>

                </div>

                <div class="order-item-total">

                    ₹${item.total.toFixed(2)}

                </div>

            </div>

        `;

    });

}