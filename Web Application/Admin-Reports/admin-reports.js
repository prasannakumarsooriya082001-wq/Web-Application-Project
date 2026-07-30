// =====================================
// Revenue Trend Chart
// =====================================

const revenueChart = document.getElementById("revenueChart");

new Chart(revenueChart, {

    type: "line",

    data: {

        labels: ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug"],

        datasets: [

            {

                label: "Revenue",

                data: [180000,240000,220000,310000,390000,470000,520000,610000],

                borderColor: "#A6572E",

                backgroundColor: "rgba(166,87,46,.15)",

                borderWidth: 3,

                fill: true,

                tension: .4,

                pointRadius: 5,

                pointBackgroundColor: "#A6572E",

                pointHoverRadius: 8

            }

        ]

    },

    options: {

        responsive: true,

        plugins: {

            legend: {

                display: true,

                position: "top"

            }

        },

        scales: {

            y: {

                beginAtZero: true
            }

        }

    }

});


// =====================================
// Sales by Category Chart
// =====================================

const categoryChart = document.getElementById("categoryChart");

new Chart(categoryChart, {

    type: "bar",

    data: {

        labels: ["Luxury Sofa","Wooden Sofa","Recliner","Office Sofa"],

        datasets: [

            {

                label: "Products Sold",

                data: [120,85,65,40],

                backgroundColor: ["#A6572E","#D4A373","#6D4C41","#8D6E63"],

                borderRadius: 8,

                borderSkipped: false

            }

        ]

    },

    options: {

        responsive: true,

        plugins: {

            legend: {

                display: false

            }

        },

        scales: {

            y: {

                beginAtZero: true

            }

        }

    }

});


// =====================================
// Order Status Chart
// =====================================

const statusChart = document.getElementById("statusChart");

new Chart(statusChart, {

    type: "doughnut",

    data: {

        labels: ["Delivered","Processing","Pending","Cancelled"],

        datasets: [

            {

                data: [180,40,20,10],

                backgroundColor: ["#28A745","#17A2B8","#FFC107","#DC3545"],

                borderColor: "#FFFFFF",borderWidth: 3,hoverOffset: 12

            }

        ]

    },

    options: {

        responsive: true,

        plugins: {

            legend: {

                position: "bottom"

            }

        },

        cutout: "65%"

    }

});


// =====================================
// Counter Animation
// =====================================

const counters = document.querySelectorAll(".card h2");

counters.forEach(counter => {

    const text = counter.innerText.replace(/[₹,]/g, "");

    const target = parseInt(text);

    if (isNaN(target)) return;

    let count = 0;

    const increment = Math.ceil(target / 100);

    const updateCounter = () => {

        if (count < target) {

            count += increment;

            if (count > target) {

                count = target;

            }

            if (counter.innerText.includes("₹")) {

                counter.innerText = "₹" + count.toLocaleString();

            }

            else {

                counter.innerText = count;

            }

            requestAnimationFrame(updateCounter);

        }

    };

    updateCounter();

});


// =====================================
// Statistics Cards Animation
// =====================================

const cards = document.querySelectorAll(".statistics .card");

cards.forEach((card, index) => {

    card.style.opacity = "0";

    card.style.transform = "translateY(25px)";

    setTimeout(() => {

        card.style.transition = ".5s";

        card.style.opacity = "1";

        card.style.transform = "translateY(0)";

    }, index * 150);

});


// =====================================
// Chart Cards Animation
// =====================================

const chartCards = document.querySelectorAll(".chart-card");

chartCards.forEach((chart, index) => {

    chart.style.opacity = "0";

    chart.style.transform = "translateY(30px)";

    setTimeout(() => {

        chart.style.transition = ".6s";

        chart.style.opacity = "1";

        chart.style.transform = "translateY(0)";

    }, 500 + (index * 200));

});


// =====================================
// Sales Table Animation
// =====================================

const rows = document.querySelectorAll("tbody tr");

rows.forEach((row, index) => {

    row.style.opacity = "0";

    row.style.transform = "translateX(-25px)";

    setTimeout(() => {

        row.style.transition = ".4s";

        row.style.opacity = "1";

        row.style.transform = "translateX(0)";

    }, 900 + (index * 120));

});