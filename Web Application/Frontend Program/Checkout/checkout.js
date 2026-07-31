const checkoutForm = document.getElementById("checkoutForm");
const placeOrder = document.querySelector(".place-order");

placeOrder.addEventListener("click", function (e) {

    e.preventDefault();

    // Get all required fields
    const inputs = checkoutForm.querySelectorAll("input[required]");

    let isValid = true;

    inputs.forEach(input => {

        if (input.value.trim() === "") {

            input.style.borderColor = "red";

            isValid = false;

        } else {

            input.style.borderColor = "#ddd";

        }

    });

    if (!isValid) {

        alert("Please fill all required fields.");

        return;

    }

    // Payment Selected

    const payment = document.querySelector("input[name='payment']:checked");

    if (!payment) {

        alert("Please select a payment method.");

        return;

    }

    alert("Order Placed Successfully!");

    // Temporary Redirect

    window.location.href = "/Order-Success/Order-Success.html";

});