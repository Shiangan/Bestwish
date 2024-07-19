document.addEventListener('DOMContentLoaded', function () {
    const addButtons = document.querySelectorAll('.add');
    const subtractButtons = document.querySelectorAll('.subtract');
    const quantities = document.querySelectorAll('.quantity');
    const prices = document.querySelectorAll('.price');
    const totalPriceElement = document.getElementById('total-price');
    const invoiceCheckbox = document.getElementById('invoice-checkbox');
    const invoiceSection = document.getElementById('invoice-section');

    let totalPrice = 0;

    function updateTotalPrice() {
        totalPrice = 0;
        quantities.forEach((quantity, index) => {
            const count = parseInt(quantity.innerText);
            const price = parseFloat(prices[index].innerText.replace('$', ''));
            totalPrice += count * price;
        });

        if (invoiceCheckbox.checked) {
            totalPrice *= 1.05; // 增加5%發票費用
        }

        totalPriceElement.innerText = `$${totalPrice.toFixed(2)}`;
    }

    addButtons.forEach((button, index) => {
        button.addEventListener('click', function () {
            let quantity = parseInt(quantities[index].innerText);
            quantities[index].innerText = ++quantity;
            updateTotalPrice();
        });
    });

    subtractButtons.forEach((button, index) => {
        button.addEventListener('click', function () {
            let quantity = parseInt(quantities[index].innerText);
            if (quantity > 0) {
                quantities[index].innerText = --quantity;
                updateTotalPrice();
            }
        });
    });

    invoiceCheckbox.addEventListener('change', function () {
        if (invoiceCheckbox.checked) {
            invoiceSection.style.display = 'block';
        } else {
            invoiceSection.style.display = 'none';
        }
        updateTotalPrice();
    });

    // 表單提交
    const orderForm = document.getElementById('order-form');
    orderForm.addEventListener('submit', function (event) {
        event.preventDefault();

        const formData = new FormData(orderForm);
        const data = {};
        formData.forEach((value, key) => {
            data[key] = value;
        });

        // 獲取選擇的花籃數量和價格
        data.flowers = [];
        quantities.forEach((quantity, index) => {
            const count = parseInt(quantity.innerText);
            if (count > 0) {
                const flower = {
                    name: quantities[index].dataset.flowerName,
                    quantity: count,
                    price: parseFloat(prices[index].innerText.replace('$', ''))
                };
                data.flowers.push(flower);
            }
        });

        data.totalPrice = totalPrice;

        // 保存到本地存儲
        localStorage.setItem('flowerOrder', JSON.stringify(data));

        // 跳轉到訂單狀態頁面
        window.location.href = 'flower-order-states.html';
    });
});
