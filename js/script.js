const products = {
    'ОДЯГ': [
        { name: 'ВЕРХНІЙ ОДЯГ', image: './images/1.jpg', description: 'Інформація про товар' },
        { name: 'СВІТШОТ', image: './images/2.jpg', description: 'Інформація про товар' },
        { name: 'ТОЛСТОВКА', image: './images/3.jpg', description: 'Інформація про товар' },
        { name: 'ШТАНИ', image: './images/4.jpg', description: 'Інформація про товар' },
        { name: 'СПОРТИВНИЙ КОСТЮМ', image: './images/5.jpg', description: 'Інформація про товар' },
        { name: 'ФУТБОЛКА', image: './images/6.jpg', description: 'Інформація про товар' },
        { name: 'ШОРТИ', image: './images/7.jpg', description: 'Інформація про товар' }
    ],
    'ВЗУТТЯ': [
        { name: 'ЗИМОВЕ ВЗУТТЯ', image: './images/8.jpg', description: 'Інформація про товар' },
        { name: 'КРОСІВКИ', image: './images/9.jpg', description: 'Інформація про товар' },
        { name: 'КЕДИ', image: './images/10.jpg', description: 'Інформація про товар' }
        ],
    'РЮКЗАКИ ТА СУМКИ': [
        { name: 'РЮКЗАК', image: './images/11.jpg', description: 'Інформація про товар' },
        { name: 'СУМКА НА ПОЯС', image: './images/12.jpg', description: 'Інформація про товар' },
        { name: 'СУМКА ЧЕРЕЗ ПЛЕЧЕ', image: './images/13.jpg', description: 'Інформація про товар' }
    ],
    'АКСЕСУАРИ': [
        { name: 'КЕПКА', image: './images/14.jpg', description: 'Інформація про товар' },
        { name: 'ПАНАМА', image: './images/15.jpg', description: 'Інформація про товар' },
        { name: 'ШАПКА', image: './images/16.jpg', description: 'Інформація про товар' },
        { name: 'МАСКА', image: './images/17.jpg', description: 'Інформація про товар' },
        { name: 'ШКАРПЕТКИ', image: './images/18.jpg', description: 'Інформація про товар' },
        { name: 'РЕМІНЬ', image: './images/19.jpg', description: 'Інформація про товар' },
        { name: 'ГАМАНЕЦЬ', image: './images/20.jpg', description: 'Інформація про товар' }
    ]
};


document.addEventListener("DOMContentLoaded", function () {
    const categories = document.querySelectorAll(".category");
    const productsContainer = document.getElementById("products");
    const productInfoContainer = document.getElementById("productInfo");

    categories.forEach(category => {
        category.addEventListener("click", function () {
            const selectedCategory = category.getAttribute("data-category");
            const productsForCategory = getProductsByCategory(selectedCategory);
            displayProducts(productsForCategory);
        });
    });

    function getProductsByCategory(category) {
        return products[category] || [];
    }

    function displayProducts(products) {
        productsContainer.innerHTML = "";
        products.forEach(product => {
            const productElement = document.createElement("div");
            productElement.classList.add("product");
            productElement.innerText = product.name;
            productElement.addEventListener("click", function () {
                displayProductInfo(product);
            });
            productsContainer.appendChild(productElement);
        });
    }


    const orderForm = document.getElementById("orderForm");
    const confirmOrderButton = document.getElementById("confirmOrder");
    const orderInfo = document.getElementById("orderInfo");
    const orderDetails = document.getElementById("orderDetails");
    const okButton = document.getElementById("okButton");

    function displayProductInfo(product) {
        productInfoContainer.innerHTML = `
            <div class="information">
                <h2 class="product-name">${product.name}</h2>
                <img src="${product.image}" alt="${product.name}" class="product-photo">
                <p class="product-info">${product.description}</p>
                <button id="buyButton">КУПИТИ</button>
            </div> 
        `;

        const buyButton = document.getElementById("buyButton");

        buyButton.addEventListener("click", function () {
            orderForm.style.display = "block";
            orderInfo.style.display = "none";
            okButton.style.display = "none";
        });

        confirmOrderButton.addEventListener("click", function (event) {
            event.preventDefault();

            const fullName = document.getElementById("fullName").value;
            const city = document.getElementById("city").value;
            const delivery = document.getElementById("delivery").value;
            const selectedPaymentOption = document.querySelector('input[name="payment"]:checked');
            const payment = selectedPaymentOption ? selectedPaymentOption.value : "";
            const quantity = document.getElementById("quantity").value;
            const comment = document.getElementById("comment").value;

            if (!fullName || !city || !delivery || !payment || !quantity) {
            alert("Будь ласка, заповніть всі обов'язкові поля.");
            } else {
                
                orderForm.style.display = "none";
                orderInfo.style.display = "block";
                
                const orderInfoItems = [
                `ПІБ покупця: ${fullName}`,
                `Місто: ${city}`,
                `Відділення Нової пошти: ${delivery}`,
                `Спосіб оплати: ${payment}`,
                `Товар: ${product.name}`,
                `Кількість товару: ${quantity}`,
                `Коментар: ${comment}`
                ];
                orderDetails.innerHTML = "";
                
                orderInfoItems.forEach(item => {
                const paragraph = document.createElement("p");
                paragraph.textContent = item;
                orderDetails.appendChild(paragraph);
        });
            }
            okButton.style.display = "block";
        });
        okButton.addEventListener("click", function () {
            orderForm.style.display = "none";
            orderInfo.style.display = "none";
            okButton.style.display = "none";
            productInfoContainer.innerHTML = ""; 
            displayProducts([]);
        });
    } 
});
