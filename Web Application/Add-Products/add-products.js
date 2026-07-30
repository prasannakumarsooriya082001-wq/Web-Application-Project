// =========================
// Image Preview
// =========================

const productImage = document.getElementById("productImage");
const previewImage = document.getElementById("previewImage");

productImage.addEventListener("change", function () {

    const file = this.files[0];

    if (file) {

        const reader = new FileReader();

        reader.onload = function (e) {

            previewImage.src = e.target.result;

        }

        reader.readAsDataURL(file);

    }

});


// =========================
// Form Validation
// =========================

const form = document.getElementById("productForm");

form.addEventListener("submit", function (e) {

    e.preventDefault();

    const productName = document.getElementById("productName").value.trim();
    const price = document.getElementById("price").value;
    const stock = document.getElementById("stock").value;
    const brand = document.getElementById("brand").value.trim();
    const material = document.getElementById("material").value.trim();
    const color = document.getElementById("color").value.trim();
    const description = document.getElementById("description").value.trim();

    if (
        productName === "" ||
        price === "" ||
        stock === "" ||
        brand === "" ||
        material === "" ||
        color === "" ||
        description === ""
    ) {

        alert("Please fill all fields.");

        return;

    }

    if (price <= 0) {

        alert("Enter a valid price.");

        return;

    }

    if (stock < 0) {

        alert("Stock cannot be negative.");

        return;

    }

    alert("✅ Product Added Successfully");

    form.reset();

    previewImage.src = "/images/upload-placeholder.png";

});


// =========================
// Cancel Button
// =========================

const cancelBtn = document.querySelector(".cancel-btn");

cancelBtn.addEventListener("click", function () {

    const confirmCancel = confirm("Are you sure you want to cancel?");

    if (confirmCancel) {

        window.location.href = "/Admin-Products/admin-products.html";

    }

});