// 初始化购物车
let cart = {};

// 添加商品到购物车
function addToCart(name, price) {
    if (cart[name]) {
        cart[name].quantity += 1;
    } else {
        cart[name] = { price: price, quantity: 1 };
    }
    updateCart();
}

// 更新购物车显示
function updateCart() {
    let cartItems = document.getElementById('cartItems');
    let totalAmount = 0;
    let invoiceCharge = 0;

    cartItems.innerHTML = '';
    for (let item in cart) {
        let itemTotal = cart[item].price * cart[item].quantity;
        totalAmount += itemTotal;

        let li = document.createElement('li');
        li.innerHTML = `${item} - NT$${cart[item].price} x ${cart[item].quantity} 
                         <button onclick="changeQuantity('${item}', -1)">-</button> 
                         <button onclick="changeQuantity('${item}', 1)">+1</button>`;
        cartItems.appendChild(li);
    }

    let isInvoice = document.getElementById('invoice-checkbox').checked;
    if (isInvoice) {
        invoiceCharge = totalAmount * 0.05;
    }

    document.getElementById('totalPrice').innerText = `总金额（未税）: NT$${totalAmount.toFixed(2)}`;
    document.getElementById('invoice-charge').innerText = invoiceCharge.toFixed(2);
    document.getElementById('final-amount').innerText = (totalAmount + invoiceCharge).toFixed(2);
}

// 改变商品数量
function changeQuantity(item, change) {
    if (cart[item]) {
        cart[item].quantity += change;
        if (cart[item].quantity <= 0) {
            delete cart[item];
        }
        updateCart();
    }
}

// 切换发票详细信息显示
function toggleInvoiceDetails() {
    let invoiceDetails = document.getElementById('invoice-details');
    let receiptDetails = document.getElementById('receipt-details');
    let isInvoice = document.getElementById('invoice-checkbox').checked;

    if (isInvoice) {
        invoiceDetails.style.display = 'block';
        receiptDetails.style.display = 'none';
    } else {
        invoiceDetails.style.display = 'none';
        receiptDetails.style.display = 'block';
    }
}

// 确认订单
function confirmOrder() {
    let name = document.getElementById('name').value;
    let orderName = document.getElementById('order-name').value;
    let orderNumber = document.getElementById('order-number').value;
    let ordererNames = document.getElementById('orderer-names').value;
    let isInvoice = document.getElementById('invoice-checkbox').checked;
    let companyName = isInvoice ? document.getElementById('company-name').value : '';
    let recipientName = isInvoice ? document.getElementById('recipient-name').value : '';
    let recipientAddress = isInvoice ? document.getElementById('recipient-address').value : '';

    if (name && orderName && orderNumber && ordererNames && (!isInvoice || (companyName && recipientName && recipientAddress))) {
        // Redirect to flower-order-states.html
        window.location.href = 'flower-order-states.html';
    } else {
        alert('请填写所有必要的字段。');
    }
}

// 音乐控制
document.getElementById('play-music').addEventListener('click', function() {
    document.getElementById('background-music').play();
    this.style.display = 'none';
    document.getElementById('stop-music').style.display = 'block';
});

document.getElementById('stop-music').addEventListener('click', function() {
    document.getElementById('background-music').pause();
    this.style.display = 'none';
    document.getElementById('play-music').style.display = 'block';
});

// 页面加载完成后，初始化音乐控制
window.addEventListener('load', function() {
    document.getElementById('play-music').style.display = 'block';
    document.getElementById('stop-music').style.display = 'none';
});

// 更新总金额、发票附加费和最终金额
function updateTotals() {
    let cartItems = document.getElementById('cartItems').getElementsByTagName('li');
    let total = 0;

    for (let item of cartItems) {
        let price = parseFloat(item.dataset.price);
        let quantity = parseInt(item.querySelector('.quantity').innerText);
        total += price * quantity;
    }

    let invoiceCheckbox = document.getElementById('invoice-checkbox');
    let invoiceCharge = invoiceCheckbox.checked ? total * 0.05 : 0;
    let finalAmount = total + invoiceCharge;

    document.getElementById('totalPrice').innerText = `总金额（未税）: NT$${total.toFixed(2)}`;
    document.getElementById('invoice-charge').innerText = invoiceCharge.toFixed(2);
    document.getElementById('final-amount').innerText = finalAmount.toFixed(2);
}

// 添加到购物车功能
function addToCart(name, price) {
    let cartItems = document.getElementById('cartItems');
    let item = Array.from(cartItems.getElementsByTagName('li')).find(item => item.dataset.name === name);

    if (item) {
        let quantityElement = item.querySelector('.quantity');
        quantityElement.innerText = parseInt(quantityElement.innerText) + 1;
    } else {
        let li = document.createElement('li');
        li.dataset.name = name;
        li.dataset.price = price;
        li.innerHTML = `
            ${name} - NT$${price} <span class="quantity">1</span>
            <button onclick="removeFromCart(this)">移除</button>
        `;
        cartItems.appendChild(li);
    }

    updateTotals();
}

// 移除购物车中的项目
function removeFromCart(button) {
    button.parentElement.remove();
    updateTotals();
}
