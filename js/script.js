const products = {
    'ОДЯГ': [
        { name: 'ВЕРХНІЙ ОДЯГ', image: './images/1.jpg', description: 'Інформація про товар', price: 3500},
        { name: 'СВІТШОТ', image: './images/2.jpg', description: 'Інформація про товар' , price: 1000},
        { name: 'ТОЛСТОВКА', image: './images/3.jpg', description: 'Інформація про товар' , price: 800},
        { name: 'ШТАНИ', image: './images/4.jpg', description: 'Інформація про товар' , price: 2100},
        { name: 'СПОРТИВНИЙ КОСТЮМ', image: './images/5.jpg', description: 'Інформація про товар' , price: 2700},
        { name: 'ФУТБОЛКА', image: './images/6.jpg', description: 'Інформація про товар', price: 500 },
        { name: 'ШОРТИ', image: './images/7.jpg', description: 'Інформація про товар' , price: 700}
    ],
    'ВЗУТТЯ': [
        { name: 'ЗИМОВЕ ВЗУТТЯ', image: './images/8.jpg', description: 'Інформація про товар', price: 2200},
        { name: 'КРОСІВКИ', image: './images/9.jpg', description: 'Інформація про товар', price: 2500 },
        { name: 'КЕДИ', image: './images/10.jpg', description: 'Інформація про товар', price: 1800 }
        ],
    'РЮКЗАКИ ТА СУМКИ': [
        { name: 'РЮКЗАК', image: './images/11.jpg', description: 'Інформація про товар' , price: 900},
        { name: 'СУМКА НА ПОЯС', image: './images/12.jpg', description: 'Інформація про товар', price: 700 },
        { name: 'СУМКА ЧЕРЕЗ ПЛЕЧЕ', image: './images/13.jpg', description: 'Інформація про товар', price: 300 }
    ],
    'АКСЕСУАРИ': [
        { name: 'КЕПКА', image: './images/14.jpg', description: 'Інформація про товар' , price: 350},
        { name: 'ПАНАМА', image: './images/15.jpg', description: 'Інформація про товар' , price: 300},
        { name: 'ШАПКА', image: './images/16.jpg', description: 'Інформація про товар' , price: 600},
        { name: 'МАСКА', image: './images/17.jpg', description: 'Інформація про товар' , price: 150},
        { name: 'ШКАРПЕТКИ', image: './images/18.jpg', description: 'Інформація про товар' , price: 100},
        { name: 'РЕМІНЬ', image: './images/19.jpg', description: 'Інформація про товар' , price: 300},
        { name: 'ГАМАНЕЦЬ', image: './images/20.jpg', description: 'Інформація про товар' , price: 250}
    ]
};

document.addEventListener("DOMContentLoaded", function () {
    const categories = document.querySelectorAll(".category");
    const productsContainer = document.getElementById("products");
    const productInfoContainer = document.getElementById("productInfo");
    const myOrdersButton = document.getElementById('myOrdersButton');
    const okButton = document.getElementById("okButton");

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

    function displayProductInfo(product) {
        productInfoContainer.innerHTML = `
            <div class="information">
                <h2 class="product-name">${product.name}</h2>
                <img src="${product.image}" alt="${product.name}" class="product-photo">
                <p class="product-price">${product.price} гривень</p>
                <p class="product-info">${product.description}</p>
                <button id="buyButton">КУПИТИ</button>
            </div> 
        `;

        const buyButton = document.getElementById("buyButton");

        buyButton.addEventListener("click", function () {
            orderForm.style.display = "block";
            orderInfo.style.display = "none";

            const orderFormPosition = orderForm.offsetTop;

            window.scrollTo({
                top: orderFormPosition,
                behavior: 'smooth' 
            });
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
                const selectedProduct = document.querySelector(".product-name").textContent;

                saveOrder({
                    name: selectedProduct,
                    price: parseFloat(document.querySelector(".product-price").textContent),
                    image: document.querySelector(".product-photo").src
                });

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
    }
    const ordersInfo = document.getElementById('ordersInfo');
    const orderList = document.getElementById('orderList');
    const myOrderInfo = document.getElementById('myOrderInfo');

    function saveOrder(product) { 
        const fullName = document.getElementById("fullName").value;
        const city = document.getElementById("city").value;
        const delivery = document.getElementById("delivery").value;
        const selectedPaymentOption = document.querySelector('input[name="payment"]:checked');
        const payment = selectedPaymentOption ? selectedPaymentOption.value : "";
        const quantity = document.getElementById("quantity").value;
        const comment = document.getElementById("comment").value;

        const date = new Date();

        function generateUniqueID() {
            const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
            let complexID = '';
            for (let i = 0; i < 15; i++) {
                const randomIndex = Math.floor(Math.random() * characters.length);
                complexID += characters[randomIndex];
            }
            return complexID;
        }

        const id = generateUniqueID();

        const order = {
            product: product.name,
            fullName: fullName,
            city: city,
            delivery: delivery,
            payment: payment,
            quantity: quantity,
            comment: comment,
            date: `${date.getDate()}.${date.getMonth()+1}.${date.getFullYear()}`, 
            price: product.price,
            id: id
        };

        const savedOrders = JSON.parse(localStorage.getItem('orders')) || [];
        savedOrders.push(order);
        localStorage.setItem('orders', JSON.stringify(savedOrders));

        console.log('Order saved:', order); 
    }
    
    function showOrders() {
        const savedOrders = JSON.parse(localStorage.getItem('orders')) || [];

        orderList.innerHTML = savedOrders.map((order, index) => `
            <li class="orderItem" data-index="${index}">Замовлення №${order.id}. Товар: ${order.product}, Дата: ${order.date}, Ціна: ${order.price*order.quantity}</li>
        `).join('');

        const orderItems = document.querySelectorAll('.orderItem');
        orderItems.forEach(item => {
            item.addEventListener('click', function () {
                const index =this.dataset.index;
                displayOrderDetails(savedOrders[index]);
            });
        });

        document.getElementById('categories').style.display = 'none';
        document.getElementById('products').style.display = 'none';
        document.getElementById('productInfo').style.display = 'none';
        ordersInfo.style.display = 'block';
    }

    function displayOrderDetails(order) {
        console.log(order);
        myOrderInfo.innerHTML = `
            <h2>ДЕТАЛІ ЗАМОВЛЕННЯ</h2>
            <div>Номер замовлення: ${order.id}</div>
            <div>Замовник: ${order.fullName}</div>
            <div>Товар: ${order.product}</div>
            <div>Ціна: ${order.price}</div>
            <div>Кількість товару: ${order.quantity}</div>
            <div>Дата: ${order.date}</div>
            <div>Загальна вартість замовлення: ${order.price*order.quantity}</div>
            <button id="deleteOrderButton">ВИДАЛИТИ ЗАМОВЛЕННЯ</button>
        `;

        const deleteOrderButton = document.getElementById('deleteOrderButton');
        deleteOrderButton.addEventListener('click', function () {
            deleteOrder(order.id);
            myOrderInfo.innerHTML = '';
        });
    }
    function deleteOrder(orderID) {
        const savedOrders = JSON.parse(localStorage.getItem('orders')) || [];
        const updatedOrders = savedOrders.filter(savedOrder => savedOrder.id !== orderID); 
        localStorage.setItem('orders', JSON.stringify(updatedOrders));
        showOrders();
    }

    myOrdersButton.addEventListener('click', function () {
        showOrders();
        myOrdersButton.style.display = "none";
        okButton.style.display = "block";
        orderForm.style.display = "none";
        orderInfo.style.display = "none";
    });


    okButton.addEventListener("click", function () {
        location.reload();
    });
});
